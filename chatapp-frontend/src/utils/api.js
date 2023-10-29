import axios from 'axios';

const BASE_URL = 'http://localhost:5000/api';

export const api = axios.create({
    baseURL: BASE_URL,
    headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`
    }
});

export const getCurrentUser = () => {
    const token = localStorage.getItem('token');
    if (!token) {
        throw new Error('Token not found in local storage');
    }
    return axios.get(`${BASE_URL}/user/me`);
};

export const setAuthToken = (token) => {
    const tokenToSend = localStorage.getItem('token');
    console.log('Token to Send in API Request:', tokenToSend);
    console.log('Token to Send in API Request2:', token);

    if (token) {
        api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    } else {
        delete api.defaults.headers.common['Authorization'];
    }
};

export const getUsers = () => {
    return axios.get(`${BASE_URL}/user`);
};

export const loginUser = (userData) => api.post(`${BASE_URL}/user/login`, userData);
export const signupUser = (userData) => api.post(`${BASE_URL}/user/signup`, userData);
export const fetchMessages = () => api.get(`${BASE_URL}/chat/messages`);
