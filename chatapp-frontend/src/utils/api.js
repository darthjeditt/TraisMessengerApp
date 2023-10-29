import axios from 'axios';

export const api = axios.create({
    baseURL: 'http://localhost:5000/api',
    headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`
    }
});

export const getCurrentUser = () => {
    const token = localStorage.getItem('token');
    if (!token) {
        throw new Error('Token not found in local storage');
    }
    return axios.get(`/user/me`);
};

export const setAuthToken = (token) => {
    if (token) {
        api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    } else {
        delete api.defaults.headers.common['Authorization'];
    }
};

export const getUsers = () => {
    return axios.get(`/user`);
};

export const loginUser = (userData) => api.post(`/user/login`, userData);
export const signupUser = (userData) => api.post(`/user/signup`, userData);
export const fetchMessages = () => api.get(`/chat/messages`);
