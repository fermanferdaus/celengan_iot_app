function updateDataUangKeluar() {
    var xhr = new XMLHttpRequest();
    xhr.open('GET', '/api/ambil_uang_keluar', true);
    xhr.onload = function () {
        if (xhr.status === 200) {
            var response = JSON.parse(xhr.responseText);

            // Inisialisasi DataTable
            var dataTable = $('#dataTable').DataTable();

            // Kosongkan tabel sebelum diupdate
            dataTable.clear();

            // Tambahkan data baru ke tabel
            var index = 1;
            response.forEach(function (item) {
                dataTable.row.add([
                    index++,
                    item.tanggal,
                    item.waktu,
                    'Rp ' + Number(item.uang_keluar).toLocaleString('id-ID')
                ]).draw(false); // false agar tidak mengubah halaman
            });
        }
    };
    xhr.send();
}

// Fungsi untuk memperbarui semua data

updateDataUangKeluar();


// Memperbarui semua data setiap 5 detik (5000 ms)
setInterval(updateDataUangKeluar, 5000);
