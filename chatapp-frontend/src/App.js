import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from './views/Home';
import Login from './views/auth/Login';
import Signup from './views/auth/Signup';
// import ChatBox from './components/ChatBox';

function App() {
    return (
        <div className="container mx-auto p-4">
            <Routes>
                <Route path="/signup" element={<Signup />} />
                <Route path="/login" element={<Login />} />
                <Route path="/home" element={<Home />} />
                <Route path="/" element={<Login />} />
                {/* <Route path="/home/chat/:userId" element={<ChatBox />} /> */}
                {/* Add more routes as needed */}
            </Routes>
        </div>
    );
}

export default App;
