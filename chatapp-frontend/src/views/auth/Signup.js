import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { signupUser } from '../../utils/api';

function Signup() {
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        password: '',
        confirmPassword: ''
    });
    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (formData.password !== formData.confirmPassword) {
            console.error('Passwords do not match');
            return;
        }
        try {
            await signupUser(formData);
            navigate('/login');
        } catch (error) {
            console.error('Error signing up:', error);
        }
    };

    return (
        <div className="min-h-screen flex bg-gray-100">
            <div className="w-1/3 bg-gradient-to-b from-green-400 via-orange-500 to-red-500 flex flex-col justify-center items-center text-white p-10 space-y-5">
                <h1 className="text-5xl font-extrabold mb-5 tracking-tight">Chat<span className="text-blue-200">App</span></h1>
                <p className="text-lg font-medium">Join our community and start chatting with friends and colleagues.</p>
                {/* <img src="/path_to_some_signup_illustration.png" alt="Signup illustration" className="w-2/3 h-auto"/> */}
            </div>
            <div className="w-2/3 flex items-center justify-center">
                <div className="bg-white p-12 rounded-xl shadow-2xl w-2/3 space-y-6">
                    <h2 className="text-3xl font-bold mb-5 text-gray-700">Create Your Account</h2>
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div className="mb-4">
                            <label className="block text-gray-600 mb-2">Username</label>
                            <input
                                type="text"
                                name="username"
                                placeholder="Username"
                                value={formData.username}
                                onChange={handleChange}
                                className="w-full p-3 border rounded-lg focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-200 transition"
                            />
                        </div>
                        <div className="mb-4">
                            <label className="block text-gray-600 mb-2">Email</label>
                            <input
                                type="email"
                                name="email"
                                placeholder="Email"
                                value={formData.email}
                                onChange={handleChange}
                                className="w-full p-3 border rounded-lg focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-200 transition"
                            />
                        </div>
                        <div className="mb-4">
                            <label className="block text-gray-600 mb-2">Password</label>
                            <input
                                type="password"
                                name="password"
                                placeholder="Password"
                                value={formData.password}
                                onChange={handleChange}
                                className="w-full p-3 border rounded-lg focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-200 transition"
                            />
                        </div>
                        <div className="mb-4">
                            <label className="block text-gray-600 mb-2">Confirm Password</label>
                            <input
                                type="password"
                                name="confirmPassword"
                                placeholder="Retype Password"
                                value={formData.confirmPassword}
                                onChange={handleChange}
                                className="w-full p-3 border rounded-lg focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-200 transition"
                            />
                        </div>
                        <button type="submit" className="w-full bg-gradient-to-r from-green-400 via-orange-500 to-red-500 text-white p-3 rounded-lg hover:from-green-500 hover:to-green-400 transition-gradient duration-500 shadow-md hover:shadow-lg transform hover:-translate-y-1">
                            Sign Up
                        </button>
                    </form>
                    <p className="mt-4 text-center text-gray-600">Already have an account? <Link to="/login" className="text-blue-500 hover:underline">Login</Link></p>
                </div>
            </div>
        </div>
    );
}

export default Signup;
