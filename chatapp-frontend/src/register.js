import React, { useState } from 'react';
import axios from 'axios';
import 'tailwindcss/tailwind.css';

function Register() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState('');

    const handleRegister = async () => {
        if (password !== confirmPassword) {
            setError("Passwords don't match!");
            return;
        }
        try {
            await axios.post('/register', { username, password });
            setError('Registered successfully!');
        } catch (err) {
            setError('Registration failed!');
        }
    };

    return (
        <div className="flex flex-col items-center">
            <input className="border p-2 m-2" value={username} onChange={(e) => setUsername(e.target.value)} placeholder="Username" />
            <input className="border p-2 m-2" type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" />
            <input className="border p-2 m-2" type="password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} placeholder="Confirm Password" />
            <button className="bg-blue-500 text-white p-2 m-2" onClick={handleRegister}>Register</button>
            {error && <p className="text-red-500">{error}</p>}
        </div>
    );
}
