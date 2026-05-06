import Axios from "axios";

const axios = Axios.create({
  baseURL: "", // KOSONGKAN BAGIAN INI SANGAT PENTING!
  withCredentials: true,
  headers: {
    "Accept": "application/json",
    "Content-Type": "application/json",
  },
});

export default axios;