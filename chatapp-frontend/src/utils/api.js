import axios from 'axios';

const api = axios.create({
    baseURL: 'http://localhost:5000/api',
    headers: {
        'Content-Type': 'application/json',
    },
});

export const setAuthToken = (token) => {
    if (token) {
        api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    } else {
        delete api.defaults.headers.common['Authorization'];
    }
};

export const loginUser = (userData) => api.post('/user/login', userData);
export const signupUser = (userData) => api.post('/user/signup', userData);
export const fetchMessages = () => api.get('/chat/messages');

export default api;
