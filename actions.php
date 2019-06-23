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

    // tambahkan data baru untuk 'act' = tambah_ajax
    case 'tambah_ajax':
        // ambil data dari $_POST untuk input
        $nama = $_POST['nama'];
        $alamat = $_POST['alamat'];

        // siapkan statemen PDO
        $stmt = $pdo->prepare('INSERT INTO user (nama, alamat) VALUES (:nama, :alamat)');
        $stmt->execute([
            'nama' => $nama,
            'alamat' => $alamat,
        ]);

        // setelah selesai, kembalikan data yang berhasil tersimpan ke database
        $id = $pdo->lastInsertId();
        // ketika memberikan response JSON, baris berikut sangat direkomendasikan
        // untuk digunakan, untuk memastikan tipe konten yang dikembalikan
        // ke client benar-benar berupa JSON
        header('Content-Type: application/json');
        // encode data ke JSON lalu tampilkan sebagai respon
        echo json_encode([
            'id' => $id,
            'nama' => $nama,
            'alamat' => $alamat,
        ]);
        break;

    // ambil data dari database untuk 'act' = get_ajax
    case 'get_ajax':
        // ambil data dari database
        $query = $pdo->query('SELECT * FROM user');

        // gunakan data yang berhasil diambil dalam response ke client.
        // jangan lupa set tipe konten berupa JSON
        header('Content-Type: application/json');
        // encode data ke JSON lalu tampilkan sebagai respon
        echo json_encode($query->fetchAll());
        break;

    // jika 'act' tidak diisi, berikan respon kosong
    default:
        echo null;
}
