from flask import Blueprint, render_template, request, redirect, url_for
from services.db import get_db_connection

web_bp = Blueprint('web', __name__)

@web_bp.route('/')
def dashboard():
    """Halaman Dashboard Utama"""
    return render_template('index.html')

@web_bp.route('/riwayat_uang_masuk')
def riwayat_uang_masuk():
    """Halaman Riwayat Uang Masuk"""
    rows = []
    try:
        with get_db_connection().cursor() as cursor:
            cursor.execute("SELECT * FROM tb_tabungan ORDER BY id DESC")
            rows = cursor.fetchall()
    except Exception as e:
        print(f"[Web Route Warning] Gagal mengambil riwayat masuk: {e}")
    return render_template('riwayat_uang_masuk.html', data=rows)

@web_bp.route('/riwayat_uang_keluar')
def riwayat_uang_keluar():
    """Halaman Riwayat Uang Keluar"""
    rows = []
    try:
        with get_db_connection().cursor() as cursor:
            cursor.execute("SELECT * FROM tb_uang_keluar ORDER BY id DESC")
            rows = cursor.fetchall()
    except Exception as e:
        print(f"[Web Route Warning] Gagal mengambil riwayat keluar: {e}")
    return render_template('riwayat_uang_keluar.html', data=rows)

@web_bp.route('/login', methods=['GET', 'POST'])
def login():
    """Halaman & Proses Login Admin"""
    if request.method == 'POST':
        username = request.form.get('username')
        password = request.form.get('password')
        if username == 'admin' and password == 'admin':
            return redirect(url_for('web.dashboard'))
        else:
            return render_template('login.html', error='Username atau password salah!')
    return render_template('login.html')

@web_bp.route('/logout')
def logout():
    """Proses Logout"""
    return redirect(url_for('web.login'))
