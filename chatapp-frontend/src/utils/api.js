import axios from 'axios';

const BASE_URL = 'http://localhost:5000/api';

// Create an Axios instance for reusable configuration
const api = axios.create({
    baseURL: BASE_URL
});

// Function to get the auth token
const getAuthToken = () => `Bearer ${localStorage.getItem('token')}`;

// Function to handle API errors
const handleApiError = (error) => {
    throw new Error(
        error.response?.data?.message ||
            'An error occurred while processing your request.'
    );
};

// Fetch users
export const fetchUsers = async () => {
    try {
        const response = await api.get('/users', {
            headers: {
                Authorization: getAuthToken(),
                'Cache-Control': 'no-cache',
                Pragma: 'no-cache'
            }
        });
        return response.data;
    } catch (error) {
        handleApiError(error);
    }
};

// Fetch chat history
export const fetchChatHistory = async (currentUserId, selectedUserId) => {
    try {
        const response = await api.get(
            `/chat/history/${currentUserId}/${selectedUserId}`,
            {
                headers: {
                    Authorization: getAuthToken()
                }
            }
        );
        return response.data;
    } catch (error) {
        handleApiError(error);
    }
};

// User login
export const login = async (data) => {
    try {
        const response = await api.post('/users/login', data);
        localStorage.setItem('token', response.data.token);
        return response.data;
    } catch (error) {
        handleApiError(error);
    }
};

// User signup
export const signup = async (data) => {
    try {
        const response = await api.post('/users/signup', data);
        localStorage.setItem('token', response.data.token);
        return response.data;
    } catch (error) {
        handleApiError(error);
    }
};

// Get current user
export const getCurrentUser = async () => {
    try {
        const response = await api.get('/users/me', {
            headers: {
                Authorization: getAuthToken(),
                'Cache-Control': 'no-cache',
                Pragma: 'no-cache'
            }
        });
        return response.data;
    } catch (error) {
        handleApiError(error);
    }
};

// Send message
export const sendMessage = async (content, senderId, receiverId) => {
    try {
        const response = await api.post(
            '/chat/messages',
            {
                content,
                sender: senderId,
                receiver: receiverId
            },
            {
                headers: {
                    Authorization: getAuthToken()
                }
            }
        );
        return response.data;
    } catch (error) {
        console.error('Error sending message:', error);
        throw error;
    }
};

// Online Status
export const updateUserStatus = async (userId, status) => {
    try {
        await api.put(
            `/users/${userId}/online`,
            { online: status },
            {
                headers: {
                    Authorization: getAuthToken()
                }
            }
        );
    } catch (error) {
        handleApiError(error);
    }
};
