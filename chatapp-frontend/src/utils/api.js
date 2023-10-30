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
    return api.get(`/user/me`);  // Use the custom api instance here
};

export const getUsers = () => {
    return api.get(`/user`);
};

export const loginUser = (userData) =>
    api.post(`/user/login`, userData);
export const signupUser = (userData) =>
    api.post(`/user/signup`, userData);
export const fetchMessages = () => api.get(`/chat/messages`);
