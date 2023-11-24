import axios from 'axios';

const BASE_URL = 'http://localhost:5000/api';

const api = axios.create({
    baseURL: BASE_URL,
    headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`
    }
});

export const fetchUsers = async () => {
    try {
        const response = await api.get('/user');
        return response.data;
    } catch (error) {
        throw new Error(error.response?.data?.message || 'Error fetching users.');
    }
};

export const fetchChatHistory = async (currentUserId, selectedUserId) => {
    try {
        const response = await api.get(`/chat/history/${currentUserId}/${selectedUserId}`);
        return response.data;
    } catch (error) {
        throw new Error(error.response?.data?.message || 'Error fetching chat history.');
    }
};

export const login = async (data) => {
    try {
        const response = await api.post('/user/login', data);
        localStorage.setItem('token', response.data.token);
        return response.data;
    } catch (error) {
        throw new Error(error.response?.data?.message || 'Error logging in.');
    }
};

export const signup = async (data) => {
    try {
        const response = await api.post('/user/signup', data);
        localStorage.setItem('token', response.data.token);
        return response.data;
    } catch (error) {
        throw new Error(error.response?.data?.message || 'Error signing up.');
    }
};

export const getCurrentUser = async () => {
    try {
        const response = await api.get('/user/me');
        return response.data;
    } catch (error) {
        throw new Error(error.response?.data?.message || 'Error fetching current user.');
    }
};

export const sendMessage = async (content, senderId, receiverId) => {
    try {
        const response = await api.post('/chat/message', {
            content,
            sender: senderId,
            receiver: receiverId
        });
        return response.data;
    } catch (error) {
        console.error('Error sending message:', error);
        throw error;
    }
};
// Add more API functions as needed...
