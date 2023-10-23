import axios from 'axios';

const BASE_URL = 'http://localhost:5000'; // Adjust this to your backend URL

export async function fetchMessages() {
  try {
    const response = await axios.get(`${BASE_URL}/chat/messages`);
    return response.data;
  } catch (error) {
    console.error('Error fetching messages:', error);
    return [];
  }
}

// Add more API calls as needed
// axios.get(url, {
//   headers: {
//     'Authorization': `Bearer ${YOUR_TOKEN}`
//   }
// });
