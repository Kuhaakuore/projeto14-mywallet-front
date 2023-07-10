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

function createTransaction(body, type, token) {
    const config = createConfig(token);

    const promise = axios.post(`${VITE_API_URL}/nova-transacao/${type}`, body, config);

    return promise;
}

function getTransactions(token) {
    const config = createConfig(token);

    const promise = axios.get(`${VITE_API_URL}/home`, config);

    return promise;
}

const api  = {
    login,
    signUp,
    createTransaction,
    getTransactions
}

export default api;