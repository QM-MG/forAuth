import axios from 'axios';
const BASE_URL = '/auth';
const axiosIns = axios.create({
    baseURL: BASE_URL,
    headers: {
        'Content-Type': 'application/json'
    }
})
export default axiosIns;