<!doctype html>
<html lang="id">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
    <title>Kulgram Taman Kode-Kode: AJAX</title>

    <!-- disini saya pakai Bulma untuk styling -->
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/bulma/0.7.5/css/bulma.min.css" />
    <style>
    body {
        padding: 2rem 1rem;
    }
    </style>
</head>
<body>
    <div class="container">
        <h1 class="title">
            Kulgram Taman Kode-Kode: AJAX
        </h1>

        <div class="columns">
            <div class="column is-half-desktop">
                <h3 class="title is-4">Daftar Semua User</h3>
                <table id="tabel-user" class="table is-fullwidth is-striped">
                    <thead>
                        <tr>
                            <th width="10%"><abbr title="Nomor">No</abbr></th>
                            <th width="30%">Nama</th>
                            <th>Alamat</th>
                        </tr>
                    </thead>
                    <tbody>
                        <?php
                        // kita impor PDO-nya dahulu
                        $pdo = require 'db.php';
                        // buat query baru
                        $query = $pdo->query('SELECT * FROM user');
                        // dan tampilkan dengan foreach
                        foreach($query->fetchAll() as $i => $row): ?>
                            <tr>
                                <td><?= ++$i ?></td>
                                <td><?= $row->nama ?></td>
                                <td><?= $row->alamat ?></td>
                            </tr>
                        <?php endforeach // foreach selesai ?>
                    </tbody>
                </table>
            </div>
            <div class="column is-half-desktop">
                <h3 class="title is-4">Tambah User</h3>
                <form id="form-user">
                    <div class="field">
                        <label class="label">Nama</label>
                        <div class="control">
                            <input class="input" type="text" name="nama" placeholder="Tulis nama disini" required>
                        </div>
                    </div>

                    <div class="field">
                        <label class="label">Alamat</label>
                        <div class="control">
                            <textarea class="textarea" name="alamat" placeholder="Tulis alamat disini" required></textarea>
                        </div>
                    </div>

                    <div class="field is-grouped">
                        <div class="control">
                            <button type="submit" class="button is-link">Tambahkan Data</button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    </div>

    <script src="ajax.js"></script>
</body>
</html>
