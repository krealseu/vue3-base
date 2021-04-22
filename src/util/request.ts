import axios from 'axios';
const service = axios.create({
    baseURL: "",
    // withCredentials: true, // send cookies when cross-domain requests
    timeout: 5000, // request timeout
});

export const api = service;

export default service;