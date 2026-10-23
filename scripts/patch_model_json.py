"""
Patch model.json yang dihasilkan tensorflowjs agar kompatibel dengan TF.js browser.
Masalah: tensorflowjs menulis "batch_shape" di InputLayer config,
         tapi TF.js di browser mengharapkan "batchInputShape".
         Selain itu ada beberapa key Keras-spesifik yang tidak dikenali TF.js.
"""

import json
import os

MODEL_JSON_PATH = os.path.join(
    os.path.dirname(os.path.abspath(__file__)),
    '..', 'public', 'models', 'bisindo_model', 'model.json'
)
MODEL_JSON_PATH = os.path.normpath(MODEL_JSON_PATH)

print(f"Memproses: {MODEL_JSON_PATH}")

with open(MODEL_JSON_PATH, 'r', encoding='utf-8') as f:
    data = json.load(f)

def patch_config(obj):
    """Rekursif: perbaiki semua config yang tidak kompatibel dengan TF.js."""
    if isinstance(obj, dict):
        # Fix 1: batch_shape -> batchInputShape (untuk InputLayer)
        if 'batch_shape' in obj:
            obj['batchInputShape'] = obj.pop('batch_shape')

        # Fix 2: Hapus key yang tidak dikenali TF.js
        keys_to_remove = [
            'module',           # Keras 3.x specific
            'registered_name',  # Keras 3.x specific
            'optional',         # Keras 3.x InputLayer specific
            'shared_object_id', # Keras 3.x specific
        ]
        for key in keys_to_remove:
            obj.pop(key, None)

        # Fix 3: dtype dict -> string sederhana (TF.js tidak mengerti format baru)
        if 'dtype' in obj and isinstance(obj['dtype'], dict):
            dtype_config = obj['dtype'].get('config', {})
            obj['dtype'] = dtype_config.get('name', 'float32')

        # Rekursif ke semua value
        return {k: patch_config(v) for k, v in obj.items()}
    elif isinstance(obj, list):
        return [patch_config(item) for item in obj]
    return obj

patched = patch_config(data)

with open(MODEL_JSON_PATH, 'w', encoding='utf-8') as f:
    json.dump(patched, f, separators=(',', ':'))

print("✅ model.json berhasil di-patch!")
print("   - batch_shape     → batchInputShape")
print("   - dtype dict      → dtype string")
print("   - Hapus: module, registered_name, optional, shared_object_id")
