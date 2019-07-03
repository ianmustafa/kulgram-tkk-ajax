// fungsi AJAX untuk mengambil semua data dari database
var ajaxGet = function() {
  // inisialisasikan class XMLHttpRequest terlebih dulu
  var ajax = new XMLHttpRequest();
  // siapkan koneksi AJAX untuk tambah data baru
  ajax.open('GET', 'https://stub.ianmustafa.com/kulgram-tkk-ajax/', true);

  // event listener ini akan dijalankan ketika proses AJAX berhasil.
  // disini kita akan mengisi tabel dengan data dari response
  ajax.onload = function () {
    if (this.status >= 200 && this.status < 400) {
      // kita parse dulu datanya menjadi obyek JavaScript
      var data = JSON.parse(this.response);
      // seleksi tabel datanya
      var tabelUser = document.getElementById('tabel-user');
      // kosongkan elemen <tbody> dalam tabel
      var tabelUserBody = tabelUser.querySelector('tbody');
      tabelUserBody.innerHTML = '';
      // lakukan loop terhadap data untuk membuat baris tabel, lalu isikan
      // barisnya ke <tbody> dalam tabel
      data.forEach(function(row, i) {
        // buat DOM untuk barisnya
        var tr = document.createElement('tr');
        // buat DOM untuk kolom-kolomnya dan isikan langsung dalam baris
        var tdNo = document.createElement('td');
        tdNo.innerText = ++i;
        tr.appendChild(tdNo);
        var tdNama = document.createElement('td');
        tdNama.innerText = row.nama;
        tr.appendChild(tdNama);
        var tdAlamat = document.createElement('td');
        tdAlamat.innerText = row.alamat;
        tr.appendChild(tdAlamat);
        // isikan ke tabel
        tabelUserBody.appendChild(tr);
      });
    }
  };

  // Ambil datanya
  ajax.send();
};

// fungsi AJAX untuk menambahkan data baru. parameter data disini dipakai
// untuk mengambil data yang akan dikirim melalui AJAX
var ajaxTambah = function(data) {
  // inisialisasikan class XMLHttpRequest terlebih dulu
  var ajax = new XMLHttpRequest();
  // siapkan koneksi AJAX untuk tambah data baru
  ajax.open('POST', 'https://stub.ianmustafa.com/kulgram-tkk-ajax/', true);

  // event listener ini akan dijalankan ketika proses AJAX berhasil.
  // disini kita akan memanggil fungsi ajaxGet untuk
  // me-refresh isi tabel, lalu mengkosongkan form.
  ajax.onload = function () {
    if (this.status >= 200 && this.status < 400) {
      // panggil ajaxGet()
      ajaxGet();

      // kosongkan form jika perlu
      var formTambah = document.getElementById('form-user');
      formTambah.querySelector('input[name="nama"]').value = '';
      formTambah.querySelector('textarea[name="alamat"]').value = '';
    }
  };

  // Kirim datanya
  ajax.send(data);
};

// buat event listener untuk mengisi tabel ketika halaman sudah siap
document.addEventListener('DOMContentLoaded', function(event) {
  // panggil fungsi ajaxGet untuk mengisi tabel
  ajaxGet();
});

// buat event listener untuk form ketika proses submit data dijalankan
var formTambah = document.getElementById('form-user');
formTambah.addEventListener('submit', function(event) {
  // cegah form untuk melakukan submit seperti biasa
  event.preventDefault();
  // panggil ajaxTambah dengan data berupa data dalam form
  ajaxTambah(new FormData(formTambah));
});
