function confirmSubmit() {
  const quantity = document.getElementById("inputQuantity").value;

  if (quantity > 0) {
    // Kirim data via AJAX ke server
    $.ajax({
      url: "/api/proses_pengurangan", // Endpoint Flask untuk memproses pengurangan
      type: "POST",
      data: { jumlah: quantity },
      success: function (response) {
        // Menampilkan SweetAlert untuk konfirmasi sukses
        Swal.fire({
          icon: "success",
          title: "Pengurangan Berhasil!",
          text: "Tabungan telah dikurangi.",
          confirmButtonText: "OK",
          timer: 3000, // Alert akan hilang setelah 3 detik
          timerProgressBar: true,
          customClass: {
            confirmButton: "btn btn-primary", // Kelas CSS untuk tombol "OK"
          },
          buttonsStyling: false, // Nonaktifkan styling default agar class custom bekerja
        }).then(() => {
          location.reload(); // Refresh halaman setelah sukses
        });
      },
      error: function (xhr, status, error) {
        // Menampilkan SweetAlert untuk kesalahan
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Terjadi kesalahan saat mengurangi tabungan.",
          footer: "Silakan coba lagi nanti.",
          customClass: {
            confirmButton: "btn btn-primary", // Warna biru pada tombol error juga
          },
          buttonsStyling: false,
        });
      },
    });
  } else {
    // Alert jika jumlah tidak valid
    Swal.fire({
      icon: "warning",
      title: "Jumlah Tidak Valid!",
      text: "Masukkan jumlah yang lebih besar dari 0.",
      customClass: {
        confirmButton: "btn btn-primary", // Warna biru pada tombol peringatan
      },
      buttonsStyling: false,
    });
  }
}

function confirmWithdraw() {
  // Kirim request ke server untuk menghapus seluruh data tabungan
  $.ajax({
    url: "/api/ambil_semua_tabungan", // Endpoint Flask untuk proses ambil seluruh tabungan
    type: "POST",
    success: function (response) {
      // Menampilkan SweetAlert untuk konfirmasi sukses
      Swal.fire({
        icon: "success",
        title: "Seluruh Tabungan Diambil!",
        text: "Data tabungan telah dihapus.",
        confirmButtonText: "OK",
        timer: 3000, // Alert akan hilang setelah 3 detik
        timerProgressBar: true,
        customClass: {
          confirmButton: "btn btn-primary", // Warna biru pada tombol OK
        },
        buttonsStyling: false,
      }).then(() => {
        location.reload(); // Refresh halaman setelah sukses
      });
    },
    error: function (xhr, status, error) {
      // Menampilkan SweetAlert untuk kesalahan
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Terjadi kesalahan saat mengambil seluruh tabungan.",
        footer: "Silakan coba lagi nanti.",
        customClass: {
          confirmButton: "btn btn-primary", // Warna biru pada tombol error juga
        },
        buttonsStyling: false,
      });
    },
  });
}
