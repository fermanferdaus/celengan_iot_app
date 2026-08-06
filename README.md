# Celengan IoT App

Aplikasi Web Dashboard dan REST API berbasis Python Flask untuk monitoring celengan IoT. Aplikasi ini menggunakan model Machine Learning (Stacking Ensemble) untuk memprediksi nominal uang berdasarkan input sensor warna RGB, serta terhubung dengan MySQL database (Aiven/Local).

## Fitur

- Dashboard monitoring uang masuk harian, bulanan, dan total tabungan.
- Grafik perkembangan tabungan bulanan.
- Riwayat transaksi uang masuk dan keluar.
- Fitur pencatatan pengambilan uang.
- API endpoint prediksi nominal berbasis warna RGB.

## Struktur Project

```text
app_render/
├── app.py              # Entry point utama Flask
├── services/           # Modul database & Machine Learning
│   ├── db.py
│   └── ml_service.py
├── routes/             # Route API & Web UI
│   ├── api_routes.py
│   ├── ml_routes.py
│   └── web_routes.py
├── model/              # File model ML (.pkl)
├── templates/          # Halaman HTML (Jinja2)
└── static/             # Assets CSS, JS, Gambar
```

## Cara Menjalankan di Lokal

1. Clone repository ini dan buat virtual environment:
   ```bash
   python -m venv venv
   .\venv\Scripts\Activate.ps1   # Untuk Windows PowerShell
   ```

2. Install dependencies:
   ```bash
   pip install -r requirements.txt
   ```

3. Buat file `.env` dari `.env.example` lalu sesuaikan konfigurasi database:
   ```env
   DB_HOST=your-db-host.com
   DB_PORT=3306
   DB_USER=your_db_user
   DB_PASSWORD=your_db_password
   DB_NAME=your_db_name
   DB_SSL=true
   ```

4. Jalankan aplikasi:
   ```bash
   python app.py
   ```
   Buka `http://localhost:5000` di browser.

## Deployment (Render.com)

1. Buat Web Service baru di Render.com dan hubungkan repo ini.
2. Konfigurasi Service:
   - **Root Directory:** `app_render`
   - **Build Command:** `pip install -r requirements.txt`
   - **Start Command:** `gunicorn app:app`
3. Masukkan Environment Variables (`DB_HOST`, `DB_PORT`, `DB_USER`, `DB_PASSWORD`, `DB_NAME`, `DB_SSL`) di dashboard Render.

## API Endpoints

### Prediksi ML
`POST /prediksi`
```json
{
  "red": 140,
  "green": 200,
  "blue": 90
}
```

### Dashboard API
- `GET /api/uang_masuk_harian` - Total uang masuk hari ini
- `GET /api/uang_masuk_bulanan` - Total uang masuk bulan ini
- `GET /api/total_tabungan` - Sisa total tabungan
- `POST /api/proses_pengurangan` - Input uang keluar
- `POST /api/ambil_semua_tabungan` - Reset data tabungan
- `GET /api/chart_data` - Data statistik grafik bulanan
