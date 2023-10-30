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

    console.log(':token:', token);
    if (!token) {
        throw new Error('Token not found in local storage');
    }
    return axios.get(`${BASE_URL}/user/me`);
};

export const getUsers = () => {
    return axios.get(`${BASE_URL}/user`);
};

export const loginUser = (userData) =>
    api.post(`${BASE_URL}/user/login`, userData);
export const signupUser = (userData) =>
    api.post(`${BASE_URL}/user/signup`, userData);
export const fetchMessages = () => api.get(`${BASE_URL}/chat/messages`);
