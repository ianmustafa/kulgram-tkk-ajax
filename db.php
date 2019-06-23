<?php

// Pastikan db.sqlite sudah ada
if (!file_exists('db.sqlite')) {
    echo '<h1>Error!</h1><p><code>db.sqlite</code> tidak ada!</p>' .
    '<p>Silakan salin atau ubah nama <code>db.sqlite.example</code> menjadi ' .
    '<code>db.sqlite</code> terlebih dahulu.</p>';
    exit(1);
}


// Saya akan pakai PDO SQLite untuk contoh ini
return new PDO(
    'sqlite:' . __DIR__ . '/db.sqlite',
    null,
    null,
    [
        PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_OBJ,
        PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
    ]
);
