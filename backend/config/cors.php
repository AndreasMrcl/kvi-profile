<?php

return [
    'paths' => ['api/*', 'sanctum/csrf-cookie'],
    'allowed_methods' => ['*'],
    // Baca dari env CORS_ALLOWED_ORIGINS (dipisah koma). Berlaku untuk lokal & produksi.
    'allowed_origins' => array_values(array_filter(array_map(
        'trim',
        explode(',', (string) env('CORS_ALLOWED_ORIGINS', 'http://127.0.0.1:5173,http://localhost:5173'))
    ))),
    'allowed_origins_patterns' => [],
    'allowed_headers' => ['*'],
    'exposed_headers' => [],
    'max_age' => 60,
    'supports_credentials' => true, // INI WAJIB TRUE
];