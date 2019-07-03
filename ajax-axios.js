// fungsi AJAX untuk mengambil semua data dari database
var ajaxGet = function() {
  // inisialisasikan AJAX-nya
  axios.request({
    // set URL tujuan
    url: 'https://stub.ianmustafa.com/kulgram-tkk-ajax/',
    // set metode HTTP yang akan digunakan. secara teknis default-nya memang
    // 'GET', tapi saya tunjukkan sekalian disini sebagai contoh
    method: 'GET',
  })
  // disini, kita menggunakan method then() untuk membuat callback yang
  // bertugas menangkap hasil dari request AJAX yang sukses
  .then(function (response) {
    // data hasil response dalam Axios berada dalam key data
    // dalam object response, jadi mari kita ambil dahulu
    var data = response.data;
    // seleksi tabel datanya
    var tabelUser = document.getElementById('tabel-user');
    // kosongkan elemen <tbody> dalam tabel
    var tabelUserBody = tabelUser.querySelector('tbody');
    tabelUserBody.innerHTML = '';
    // lakukan loop terhadap data untuk membuat baris tabel, lalu isikan
    // barisnya ke <tbody> dalam tabel
    data.forEach(function (row, i) {
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
  });
};

// fungsi AJAX untuk menambahkan data baru. parameter data disini dipakai
// untuk mengambil data yang akan dikirim melalui AJAX
var ajaxTambah = function(data) {
  // inisialisasikan AJAX-nya
  axios.request({
    // set URL tujuan
    url: 'https://stub.ianmustafa.com/kulgram-tkk-ajax/',
    // set metode HTTP yang akan digunakan
    method: 'POST',
    // set data yang akan dikirim dalam request
    data: data,
  })
  .then(function (response) {
    // panggil ajaxGet()
    ajaxGet();

    // kosongkan form jika perlu
    var formTambah = document.getElementById('form-user');
    formTambah.querySelector('input[name="nama"]').value = '';
    formTambah.querySelector('textarea[name="alamat"]').value = '';
  });
};

// buat event listener untuk mengisi tabel ketika halaman sudah siap
document.addEventListener('DOMContentLoaded', function (event) {
  // panggil fungsi ajaxGet untuk mengisi tabel
  ajaxGet();
});

// buat event listener untuk form ketika proses submit data dijalankan
var formTambah = document.getElementById('form-user');
formTambah.addEventListener('submit', function (event) {
  // cegah form untuk melakukan submit seperti biasa
  event.preventDefault();
  // panggil ajaxTambah dengan data berupa data dalam form
  ajaxTambah(new FormData(formTambah));
});
