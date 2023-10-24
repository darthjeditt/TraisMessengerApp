import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from './views/Home';
import Login from './views/auth/Login';
import Signup from './views/auth/Signup';

function App() {
    return (
        <div className="container mx-auto p-4">
            <Routes>
                <Route path="/signup" element={<Signup />} />
                <Route path="/login" element={<Login />} />
                <Route path="/" element={<Home />} />
                {/* Add more routes as needed */}
            </Routes>
        </div>
    );
}

export default App;
