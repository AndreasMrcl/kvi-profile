import Axios from 'axios';

const axios = Axios.create({
    baseURL: 'https://api.konsilveteriner.com', // Pastikan mengarah ke production
    withCredentials: true, // INI KUNCI UTAMANYA (Wajib untuk Sanctum SPA)
    headers: {
        'X-Requested-With': 'XMLHttpRequest',
        'Accept': 'application/json',
        'Content-Type': 'application/json',
    },
});

export default axios;