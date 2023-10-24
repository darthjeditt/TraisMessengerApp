import axios from 'axios';

const BASE_URL = 'http://localhost:5000'; // Adjust this to your backend URL

// Create an axios instance
const api = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Set the JWT token for axios
export const setAuthToken = (token) => {
  if (token) {
    api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  } else {
    delete api.defaults.headers.common['Authorization'];
  }
};

export async function fetchMessages() {
  try {
    const response = await api.get('/api/chat/messages');
    return response.data;
  } catch (error) {
    console.error('Error fetching messages:', error);
    return [];
  }
}

export async function loginUser(credentials) {
  try {
    const response = await api.post('/api/user/login', credentials);
    return response.data;
  } catch (error) {
    console.error('Error logging in:', error);
    throw error;
  }
}

export async function signupUser(details) {
  try {
    const response = await api.post('/api/user/signup', details);
    return response.data;
  } catch (error) {
    console.error('Error signing up:', error);
    throw error;
  }
}

// Add more API calls as needed
