"""
Fase 4: Konversi model_bisindo_mobilenetv2.keras ke TensorFlow.js format.

Cara pakai (dari root project):
    python310 scripts/convert_model.py

Strategi: edit config.json di dalam ZIP .keras untuk menghapus semua
key yang tidak kompatibel dengan versi Keras saat ini. Lebih robust
daripada monkey-patch per layer karena menyelesaikan semua layer sekaligus.
"""

import os
import sys
import json
import zipfile
import tempfile

os.environ['TF_CPP_MIN_LOG_LEVEL'] = '2'

MODEL_PATH = os.path.join(os.path.dirname(__file__), 'model_bisindo_mobilenetv2.keras')
OUTPUT_DIR = os.path.join(os.path.dirname(__file__), '..', 'public', 'models', 'bisindo_model')

print("=== Konversi Model BISINDO ke TensorFlow.js ===\n")

if not os.path.exists(MODEL_PATH):
    print(f"❌ File model tidak ditemukan: {MODEL_PATH}")
    print("   Pastikan file model ada di dalam folder scripts/")
    sys.exit(1)

import tensorflow as tf
print(f"TF    : {tf.__version__}")
print(f"Keras : {tf.keras.__version__}\n")

# ─────────────────────────────────────────────────────────────────
# Approach: Edit config.json di dalam .keras (ZIP) secara langsung.
# Lebih robust dari monkey-patch per-layer karena menghapus semua
# key bermasalah sekaligus dari seluruh config.
# ─────────────────────────────────────────────────────────────────

# Key yang ada di model (versi Keras tertentu) tapi TIDAK ada
# di Keras 3.12.3 yang terinstall sekarang.
KEYS_TO_REMOVE = {
    'input_axes',        # GlorotUniform (ditambah di Keras baru)
    'output_axes',       # GlorotUniform (ditambah di Keras baru)
    'renorm',            # BatchNormalization (dihapus di Keras 3.x)
    'renorm_clipping',   # BatchNormalization (dihapus di Keras 3.x)
    'renorm_momentum',   # BatchNormalization (dihapus di Keras 3.x)
    'quantization_config', # Dense/layers lain (belum ada di versi ini)
}

def strip_unknown_keys(obj):
    """Hapus key bermasalah secara rekursif dari seluruh config JSON."""
    if isinstance(obj, dict):
        # Hapus key bermasalah hanya dari dalam 'config' sub-dict
        if 'config' in obj and isinstance(obj['config'], dict):
            for key in KEYS_TO_REMOVE:
                obj['config'].pop(key, None)
        return {k: strip_unknown_keys(v) for k, v in obj.items()}
    elif isinstance(obj, list):
        return [strip_unknown_keys(item) for item in obj]
    return obj

print("[0/3] Membuat salinan model yang sudah diperbaiki...")
tmp_path = None
try:
    with tempfile.NamedTemporaryFile(suffix='.keras', delete=False) as tmp:
        tmp_path = tmp.name

    with zipfile.ZipFile(MODEL_PATH, 'r') as zin:
        with zipfile.ZipFile(tmp_path, 'w', zipfile.ZIP_DEFLATED) as zout:
            for item in zin.infolist():
                data = zin.read(item.filename)
                if item.filename == 'config.json':
                    config = json.loads(data.decode('utf-8'))
                    config = strip_unknown_keys(config)
                    data = json.dumps(config).encode('utf-8')
                    print(f"      ✅ config.json diperbaiki (key bermasalah dihapus)")
                zout.writestr(item, data)
    print(f"      ✅ File sementara: {tmp_path}")
except Exception as e:
    print(f"❌ Gagal memperbaiki config: {e}")
    sys.exit(1)

print("\n[1/3] Memuat model dari config yang sudah diperbaiki...")
try:
    model = tf.keras.models.load_model(tmp_path, compile=False)
    print(f"      ✅ Model berhasil dimuat!")
    print(f"      Input : {model.input_shape}")
    print(f"      Output: {model.output_shape}")
except Exception as e:
    print(f"❌ Gagal memuat model:\n{e}")
    if tmp_path and os.path.exists(tmp_path):
        os.unlink(tmp_path)
    sys.exit(1)
finally:
    # Bersihkan file sementara
    if tmp_path and os.path.exists(tmp_path):
        os.unlink(tmp_path)

print(f"\n[2/3] Menyiapkan output directory...")
os.makedirs(OUTPUT_DIR, exist_ok=True)
print(f"      ✅ {os.path.abspath(OUTPUT_DIR)}")

# ─────────────────────────────────────────────────────────────────
# Buat inference-only model:
# Skip layer data augmentation (RandomFlip, RandomZoom, dll.) karena:
#   1. Hanya dibutuhkan saat TRAINING, bukan inference
#   2. TF.js tidak support layer augmentation tersebut
# Hasilnya adalah model flat yang TF.js bisa baca.
# ─────────────────────────────────────────────────────────────────
print(f"\n[2.5/3] Membuat inference-only model (tanpa augmentation)...")
try:
    skip_types = (tf.keras.layers.InputLayer,)
    inference_layers = []
    for layer in model.layers:
        if isinstance(layer, skip_types):
            continue
        if 'data_augmentation' in layer.name:
            print(f"      ⏭  Melewati: {layer.name} (augmentation, tidak dibutuhkan)")
            continue
        inference_layers.append(layer)

    inp = tf.keras.Input(shape=(224, 224, 3), name="image_input")
    x = inp
    for layer in inference_layers:
        layer.trainable = False
        x = layer(x)

    inference_model = tf.keras.Model(inputs=inp, outputs=x, name="bisindo_inference")
    print(f"      ✅ Inference model siap")
    print(f"      Input : {inference_model.input_shape}")
    print(f"      Output: {inference_model.output_shape}")
except Exception as e:
    print(f"❌ Gagal membuat inference model:\n{e}")
    sys.exit(1)

print(f"\n[3/3] Mengonversi ke TF.js GraphModel format...")
try:
    import shutil
    import tensorflowjs as tfjs  # type: ignore

    # Simpan dulu sebagai TF SavedModel (frozen graph)
    saved_model_dir = os.path.join(os.path.dirname(__file__), 'bisindo_savedmodel_tmp')
    if os.path.exists(saved_model_dir):
        shutil.rmtree(saved_model_dir)

    print(f"      Menyimpan SavedModel sementara...")
    inference_model.export(saved_model_dir)
    print(f"      ✅ SavedModel tersimpan")

    # Convert SavedModel → tfjs_graph_model
    # Format ini jauh lebih kompatibel karena merupakan frozen computation graph,
    # tidak bergantung pada format JSON layer config yang berubah antar versi Keras.
    print(f"      Mengonversi ke tfjs_graph_model...")
    tfjs.converters.convert_tf_saved_model(
        saved_model_dir,
        OUTPUT_DIR,
    )

    # Bersihkan SavedModel sementara
    shutil.rmtree(saved_model_dir)
    print(f"      ✅ SavedModel sementara dihapus")

    print(f"\n✅ Konversi selesai! File output:")
    for fname in sorted(os.listdir(OUTPUT_DIR)):
        size = os.path.getsize(os.path.join(OUTPUT_DIR, fname))
        print(f"   - {fname}  ({size / 1024:.1f} KB)")

except Exception as e:
    print(f"❌ Konversi gagal:\n{e}")
    import traceback; traceback.print_exc()
    sys.exit(1)

print("\n=== Model siap digunakan di browser! ===")
print("   Di browser, gunakan: tf.loadGraphModel('/models/bisindo_model/model.json')")
