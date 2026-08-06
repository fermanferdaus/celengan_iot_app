// Fungsi untuk memperbarui total uang masuk hari ini
function updateTotalUangMasuk() {
    var xhr = new XMLHttpRequest();
    var uangMasukElement = document.getElementById('total-uang-masuk');

    xhr.open('GET', '/api/uang_masuk_harian?t=' + new Date().getTime(), true);
    xhr.onload = function () {
        if (xhr.status === 200) {
            var data = JSON.parse(xhr.responseText);
            uangMasukElement.innerHTML = 
                'Rp ' + Number(data.total_uang_masuk).toLocaleString('id-ID');
        }
    };
    xhr.send();
}

// Fungsi untuk memperbarui total uang masuk bulanan
function updateTotalUangMasukBulanan() {
    var xhr = new XMLHttpRequest();
    var uangMasukBulananElement = document.getElementById('total-uang-masuk-bulanan');

    xhr.open('GET', '/api/uang_masuk_bulanan?t=' + new Date().getTime(), true);
    xhr.onload = function () {
        if (xhr.status === 200) {
            var data = JSON.parse(xhr.responseText);
            uangMasukBulananElement.innerHTML = 
                'Rp ' + Number(data.total_uang_masuk_bulanan).toLocaleString('id-ID');
        }
    };
    xhr.send();
}

// Fungsi untuk memperbarui total seluruh uang masuk
function updateTotalUangMasukSeluruh() {
    var xhr = new XMLHttpRequest();
    var uangMasukSeluruhElement = document.getElementById('total-uang-masuk-seluruh');

    xhr.open('GET', '/api/total_tabungan?t=' + new Date().getTime(), true);
    xhr.onload = function () {
        if (xhr.status === 200) {
            var data = JSON.parse(xhr.responseText);
            uangMasukSeluruhElement.innerHTML = 
                'Rp ' + Number(data.total_uang_masuk_seluruh).toLocaleString('id-ID');
        }
    };
    xhr.send();
}

// Fungsi untuk memperbarui semua data
function updateAllData() {
    updateTotalUangMasuk();
    updateTotalUangMasukBulanan();
    updateTotalUangMasukSeluruh();
}

// Panggil fungsi untuk memperbarui semua data saat halaman dimuat
updateAllData();

// Memperbarui semua data setiap 5 detik (5000 ms)
setInterval(updateAllData, 5000);
