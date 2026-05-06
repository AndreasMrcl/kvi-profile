import Axios from 'axios';

const axios = Axios.create({
    baseURL: 'https://api.konsilveteriner.com',
    withCredentials: true,
    withXSRFToken: true, // INI KUNCI UTAMANYA UNTUK AXIOS VERSI BARU
    headers: {
        'X-Requested-With': 'XMLHttpRequest', // Wajib agar Laravel merespons dengan JSON
        'Accept': 'application/json',
        'Content-Type': 'application/json',
    },
});

export default axios;