import { io } from 'socket.io-client';

const socket = io('http://localhost:5000'); // Adjust this to your backend URL

export default socket;
