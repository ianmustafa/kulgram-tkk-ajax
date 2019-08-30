// Instansiasikan Vue.
var app = new Vue({
  // Jalankan Vue di elemen dengan ID #app.
  el: '#app',

  // Deklarasikan data yang akan dipakai. Data disini bersifat reaktif,
  // yang berarti setiap kali data disini berubah nilainya, perubahan
  // bisa langsung bisa dilihat pada tampilan data di halaman.
  data: {
    // Properti ini dipakai untuk menyimpan koleksi data hasil method ajaxGet()
    // yang nantinya akan ditampilkan dalam tabel.
    listUser: [],

    // Properti ini dipakai untuk menyimpan data dari form yang nantinya
    // dipakai sebagai data yang akan dikirim ke API ketika submit.
    payload: {
      id: null, // Properti ID ini dipakai untuk fungsi edit nanti.
      nama: '',
      alamat: '',
    },
  },

  // Berbagai method yang bisa dipanggil dalam instance Vue maupun dari
  // template Vue dapat dideklarasikan disini.
  methods: {
    // Method ini bertugas untuk mengambil semua data dari database.
    ajaxGet: function () {
      // Inisialisasikan AJAX-nya.
      axios.request({
        // Set URL tujuan.
        url: 'https://stub.ianmustafa.com/kulgram-tkk-ajax/',
        // Set metode HTTP yang akan digunakan. secara teknis default-nya memang
        // 'GET', tapi saya tunjukkan sekalian disini sebagai contoh.
        method: 'GET',
      })
      // Disini, kita menggunakan method then() untuk membuat callback yang
      // bertugas menangkap hasil dari request AJAX yang sukses.
      .then(function (response) {
        // Data hasil response dalam Axios berada dalam key data
        // dalam object response, jadi mari kita ambil dahulu.
        var data = response.data;
        // Dari sini, kita langsung letakkan data ke dalam instance data Vue,
        // tepatnya ke listUser.
        app.listUser = data;
        // listUser digunakan di dalam template Vue, tepatanya dalam
        // loop v-for di <tbody> dalam .tabel-user.
      });
    },
    // Method ini bertugas untuk menyimpan data dari form ke API.
    ajaxSimpan: function () {
      // Inisialisasikan AJAX-nya.
      axios.request({
        // Set URL tujuan.
        url: 'https://stub.ianmustafa.com/kulgram-tkk-ajax/',
        // Set metode HTTP yang akan digunakan.
        method: 'POST',
        // Set data yang akan dikirim dalam request. Dalam hal ini, ambil dari
        // instance data milik Vue.
        data: app.data,
      })
      .then(function (response) {
        // Setelah selesai, kita panggil method ajaxGet() untuk me-refresh
        // isi tabel.
        app.ajaxGet();

        // Lalu kosongkan payload form supaya kembali bersih.
        app.payload = {
          id: null,
          nama: '',
          alamat: '',
        };
      });
    },
  },

  // Hook 'mounted' ini akan dipanggil sesaat setelah elemen yang dipakai untuk
  // menjalankan Vue (dalam kasus ini #app) sudah di-replace oleh instance
  // virtual DOM milik Vue. Dengan kata lain, hook ini akan berjalan
  // segera setelah semua proses instansiasi Vue selesai.
  // Mirip dengan event DOMContentLoaded.
  mounted: function () {
    // Kita gunakan untuk memanggil method ajaxGet() yang dideklarasikan diatas.
    this.ajaxGet();
  },
});
