import os
os.environ['TF_CPP_MIN_LOG_LEVEL'] = '2'

import cv2
import numpy as np
import tensorflow as tf

# ==========================================
# 1. LOAD MODEL & CONFIGURATION
# ==========================================
# Path model relatif terhadap lokasi script ini (bukan dari mana script dijalankan)
MODEL_PATH = os.path.join(os.path.dirname(os.path.abspath(__file__)), "model_bisindo_mobilenetv2.keras")

print("=== Memuat Model MobileNetV2... ===")
try:
    model = tf.keras.models.load_model(MODEL_PATH)
    print("Model berhasil dimuat!")
except Exception as e:
    print(f"Gagal memuat model. Error: {e}")
    exit()

IMG_HEIGHT = 224
IMG_WIDTH = 224

CLASS_NAMES = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 
               'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 
               'U', 'V', 'W', 'X', 'Y', 'Z'] 

# ==========================================
# 2. INISIALISASI WEBCAM
# ==========================================
cap = cv2.VideoCapture(0)

print("\n=== Memulai Kamera ===")
print("Arahkan tangan kamu ke dalam KOTAK HIJAU di layar.")
print("Tekan tombol 'q' untuk keluar.")

while True:
    ret, frame = cap.read()
    if not ret:
        break

    frame = cv2.flip(frame, 1)
    h, w, _ = frame.shape

    # Area Region of Interest (ROI)
    box_size = 300
    x1 = int((w - box_size) / 2)
    y1 = int((h - box_size) / 2)
    x2 = x1 + box_size
    y2 = y1 + box_size

    roi = frame[y1:y2, x1:x2]

    # ==========================================
    # 3. PREPROCESSING GAMBAR ROI
    # ==========================================
    img_resized = cv2.resize(roi, (IMG_WIDTH, IMG_HEIGHT))
    img_rgb = cv2.cvtColor(img_resized, cv2.COLOR_BGR2RGB)
    
    img_array = tf.keras.utils.img_to_array(img_rgb)
    img_batch = np.expand_dims(img_array, axis=0)
    # Catatan: Kita tidak perlu fungsi preprocess_input() manual di sini 
    # karena kita sudah menanamkan layer `Rescaling` di dalam model training.

    # ==========================================
    # 4. PREDIKSI OLEH MODEL
    # ==========================================
    predictions = model.predict(img_batch, verbose=0)
    
    # PERBAIKAN: Hapus tf.nn.softmax karena output model sudah berupa probabilitas softmax!
    score = predictions[0] 
    
    class_idx = np.argmax(score)          
    predicted_class = CLASS_NAMES[class_idx]
    confidence = 100 * np.max(score)

    # ==========================================
    # 5. TAMPILKAN HASIL DI LAYAR
    # ==========================================
    cv2.rectangle(frame, (x1, y1), (x2, y2), (0, 255, 0), 2)

    # Tampilkan teks hanya jika confidence cukup tinggi (opsional)
    if confidence > 50.0:
        text = f"{predicted_class} ({confidence:.1f}%)"
        cv2.putText(frame, text, (x1, y1 - 10), cv2.FONT_HERSHEY_SIMPLEX, 0.9, (0, 255, 0), 2)
    else:
        cv2.putText(frame, "Tidak Dikenali", (x1, y1 - 10), cv2.FONT_HERSHEY_SIMPLEX, 0.9, (0, 0, 255), 2)

    cv2.imshow("Live BISINDO Recognition - MobileNetV2", frame)

    if cv2.waitKey(1) & 0xFF == ord('q'):
        break

cap.release()
cv2.destroyAllWindows()
print("Program selesai.")
