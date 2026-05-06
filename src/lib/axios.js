import Axios from "axios";

const axios = Axios.create({
  baseURL: 'https://api.konsilveteriner.com',
  withCredentials: true,
  headers: {
    "Accept": "application/json",
    "Content-Type": "application/json",
  },
});

export default axios;