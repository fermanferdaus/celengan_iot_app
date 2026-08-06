from flask import Flask
from services.db import close_db_connection, init_db
from routes.ml_routes import ml_bp
from routes.api_routes import api_bp
from routes.web_routes import web_bp

# Inisialisasi Flask Application
app = Flask(__name__)

# Registrasi Teardown Database Context
app.teardown_appcontext(close_db_connection)

# Registrasi Modul Blueprints (Clean Architecture)
app.register_blueprint(web_bp)    # Halaman UI Website (Dashboard, Riwayat, Login)
app.register_blueprint(ml_bp)     # ML API Endpoints (/prediksi, /total_tabungan)
app.register_blueprint(api_bp)    # Dashboard Backend APIs (/api/...)

# Inisialisasi Skema Database (Safe Auto-Migration)
with app.app_context():
    init_db()

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000, debug=True)
