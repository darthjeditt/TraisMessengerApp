import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from './views/Home';
import Login from './views/auth/Login';
import Signup from './views/auth/Signup';
// import ChatBox from './components/ChatBox';

function App() {
    return (
        <div>
            <Routes>
                <Route path="/signup" element={<Signup />} />
                <Route path="/login" element={<Login />} />
                <Route path="/home" element={<Home />} />
                <Route path="/" element={<Login />} />
            </Routes>
        </div>
    );
}

export default App;
