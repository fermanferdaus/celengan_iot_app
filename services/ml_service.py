import os
import joblib
import pandas as pd

# BASE_DIR menunjuk ke root folder app_render
BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))

# Load model, scaler, dan encoder dari folder model/
try:
    stacking_model = joblib.load(os.path.join(BASE_DIR, 'model/stacking_model.pkl'))
    label_encoder = joblib.load(os.path.join(BASE_DIR, 'model/label_encoder.pkl'))
    scaler = joblib.load(os.path.join(BASE_DIR, 'model/scaler.pkl'))
    print("[ML Service] Model Stacking Ensemble & preprocessors berhasil dimuat.")
except Exception as e:
    print(f"[ML Service Warning] Gagal memuat file model: {e}")
    stacking_model, label_encoder, scaler = None, None, None

def prediksi_nominal_stacking(red, green, blue):
    """Prediksi nominal berdasarkan nilai warna RGB menggunakan model Stacking Ensemble"""
    if stacking_model is None or label_encoder is None or scaler is None:
        raise ValueError("Model ML belum dimuat dengan benar.")

    nilai = pd.DataFrame([[red, green, blue]], columns=['Red', 'Green', 'Blue'])
    nilai['R_ratio'] = nilai['Red'] / (nilai['Red'] + nilai['Green'] + nilai['Blue'])
    nilai['G_ratio'] = nilai['Green'] / (nilai['Red'] + nilai['Green'] + nilai['Blue'])
    nilai['B_ratio'] = nilai['Blue'] / (nilai['Red'] + nilai['Green'] + nilai['Blue'])
    nilai['Intensity'] = nilai['Red'] + nilai['Green'] + nilai['Blue']
    nilai['Contrast'] = nilai[['Red', 'Green', 'Blue']].max(axis=1) - nilai[['Red', 'Green', 'Blue']].min(axis=1)

    nilai_scaled = scaler.transform(nilai)
    hasil = stacking_model.predict(nilai_scaled)
    predicted_nominal = label_encoder.inverse_transform(hasil)[0]
    return int(predicted_nominal)
