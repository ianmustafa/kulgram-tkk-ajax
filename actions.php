<?php

// kita impor PDO-nya dahulu
$pdo = require 'db.php';

// ambil nilai 'act' dari $_GET, dan lakukan aksi sesuai nilainya
switch ($_GET['act']) {
    // tambahkan data baru untuk 'act' = tambah
    case 'tambah':
        // ambil data dari $_POST untuk input
        $nama = $_POST['nama'];
        $alamat = $_POST['alamat'];

        // siapkan statemen PDO
        $stmt = $pdo->prepare('INSERT INTO user (nama, alamat) VALUES (:nama, :alamat)');
        $stmt->execute([
            'nama' => $nama,
            'alamat' => $alamat,
        ]);

        // setelah selesai, kembali ke halaman index
        header('Location: index.php');
        break;

    // jika 'act' tidak diisi, berikan respon kosong
    default:
        echo null;
}
