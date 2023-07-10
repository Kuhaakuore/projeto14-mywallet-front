import axios from "axios";

const VITE_API_URL = import.meta.env.VITE_API_URL;

function createConfig(token) {
    return { headers: { Authorization: `Bearer ${token}` } };
  };

function signUp(body) {
    const promise = axios.post(`${VITE_API_URL}/cadastro`, body);

    return promise;
}

function login(body) {
    const promise = axios.post(`${VITE_API_URL}/`, body);

    return promise;
}

const api  = {
    login,
    signUp
}

export default api;