const BASE_URL = 'http://localhost:3000'; // Adjust this to your backend URL

export async function fetchMessages() {
  try {
    const response = await fetch(`${BASE_URL}/chat/messages`);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching messages:', error);
    return [];
  }
}
