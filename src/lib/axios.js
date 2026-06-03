import Axios from 'axios';

const axios = Axios.create({
    // Dev: kosong (relatif) -> ditangani proxy Vite ke 127.0.0.1:8000 (same-origin, tanpa CORS)
    // Prod: di-set lewat .env.production ke https://api.konsilveteriner.com
    baseURL: import.meta.env.VITE_API_BASE_URL ?? '',
    withCredentials: true,
    withXSRFToken: true, // INI KUNCI UTAMANYA UNTUK AXIOS VERSI BARU
    headers: {
        'X-Requested-With': 'XMLHttpRequest', // Wajib agar Laravel merespons dengan JSON
        'Accept': 'application/json',
        'Content-Type': 'application/json',
    },
});

export default axios;