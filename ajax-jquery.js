// fungsi AJAX untuk mengambil semua data dari database
var ajaxGet = function() {
  // inisialisasikan AJAX-nya
  $.ajax({
    // set URL tujuan
    url: 'https://stub.ianmustafa.com/kulgram-tkk-ajax/',
    // set metode HTTP yang akan digunakan. secara teknis default-nya memang
    // 'GET', tapi saya tunjukkan sekalian disini sebagai contoh
    method: 'GET',
    // siapkan callback yang akan dijalankan ketika proses AJAX berhasil
    success: function(data) {
      // seleksi tabel datanya
      var tabelUser = $('#tabel-user');
      // kosongkan elemen <tbody> dalam tabel
      var tabelUserBody = tabelUser.find('tbody');
      tabelUserBody.empty();
      // lakukan loop terhadap data untuk membuat baris tabel, lalu isikan
      // barisnya ke <tbody> dalam tabelme
      data.forEach(function (row, i) {
        // buat DOM untuk barisnya
        var tr = $('<tr/>');
        // buat DOM untuk kolom-kolomnya dan isikan langsung dalam baris
        $('<td/>').text(++i).appendTo(tr);
        $('<td/>').text(row.nama).appendTo(tr);
        $('<td/>').text(row.alamat).appendTo(tr);
        // isikan barisnya ke tabel
        tr.appendTo(tabelUserBody);
      });
    },
  });
  // proses AJAX akan berjalan otomatis setelah diinisialisasi
};

// fungsi AJAX untuk menambahkan data baru. parameter data disini dipakai
// untuk mengambil data yang akan dikirim melalui AJAX
var ajaxTambah = function(data) {
  // inisialisasikan AJAX-nya
  $.ajax({
    // set URL tujuan
    url: 'https://stub.ianmustafa.com/kulgram-tkk-ajax/',
    // set metode HTTP yang akan digunakan
    method: 'POST',
    // set data yang akan dikirim dalam request
    data: data,
    // siapkan callback yang akan dijalankan ketika proses AJAX berhasil
    success: function () {
      // panggil ajaxGet()
      ajaxGet();

      // kosongkan form jika perlu
      var formTambah = $('#form-user');
      formTambah.find('input[name="nama"]').val('');
      formTambah.find('textarea[name="alamat"]').val('');
    },
  });
};

// buat event listener untuk mengisi tabel ketika halaman sudah siap
$(document).ready(function() {
  // panggil fungsi ajaxGet untuk mengisi tabel
  ajaxGet();
});

// buat event listener untuk form ketika proses submit data dijalankan
var formTambah = $('#form-user');
formTambah.on('submit', function(event) {
  // cegah form untuk melakukan submit seperti biasa
  event.preventDefault();
  // panggil ajaxTambah dengan data berupa data dalam form
  ajaxTambah(formTambah.serializeArray());
});
