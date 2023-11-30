import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { login } from '../../utils/api';

function Login() {
    const [formData, setFormData] = useState({
        username: '',
        password: ''
    });
    const navigate = useNavigate();
    const [animationClass, setAnimationClass] = useState('slide-in');

    useEffect(() => {
        const timer = setTimeout(() => {
            setAnimationClass('');
        }, 1000);
        return () => clearTimeout(timer);
    }, []);

    const handleSignupClick = (e) => {
        e.preventDefault();
        setAnimationClass('slide-out');
        setTimeout(() => {
            navigate('/signup', { replace: true });
        }, 1000);
    };

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const user = await login(formData);
            if (user) {
                navigate('/home');
            }
        } catch (error) {
            console.error('Error during login:', error);
        }
    };

    return (
        <div className={`min-h-screen flex bg-gray-100 ${animationClass}`}>
            <div className="w-1/3 bg-gradient-to-b from-green-400 via-purple-500 to-blue-500 flex flex-col justify-center items-center text-white p-10 space-y-5">
                <h1 className="text-5xl font-extrabold mb-5 tracking-tight">
                    Chat<span className="text-blue-200">App</span>
                </h1>
                <p className="text-lg font-medium">
                    Connect, converse, and collaborate with friends and
                    colleagues.
                </p>
            </div>
            <div className="w-2/3 flex items-center justify-center">
                <div className="bg-gradient-to-br from-white to-gray-100 p-12 rounded-xl shadow-xl w-2/3 space-y-6 transform transition-transform hover:scale-105">
                    <h2 className="text-3xl font-bold mb-5 text-gray-700 tracking-wide">
                        Welcome Back!
                    </h2>
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div className="mb-4">
                            <label className="block text-gray-600 mb-2">
                                Username
                            </label>
                            <input
                                type="text"
                                name="username"
                                placeholder="Username"
                                value={formData.username}
                                onChange={handleChange}
                                className="w-full p-3 border border-gray-300 rounded-lg focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-200 transition-shadow hover:shadow-md"
                            />
                        </div>
                        <div className="mb-4">
                            <label className="block text-gray-600 mb-2">
                                Password
                            </label>
                            <input
                                type="password"
                                name="password"
                                placeholder="Password"
                                value={formData.password}
                                onChange={handleChange}
                                className="w-full p-3 border border-gray-300 rounded-lg focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-200 transition-shadow hover:shadow-md"
                            />
                        </div>
                        <button
                            type="submit"
                            className="w-full bg-gradient-to-r from-green-500 to-emerald-700 text-white p-3 rounded-lg hover:from-green-500 hover:to-emerald-700 transition-gradient duration-500 shadow-md hover:shadow-lg transform hover:-translate-y-1"
                        >
                            Login
                        </button>
                    </form>
                    <p className="mt-4 text-center text-gray-600">
                        Don't have an account?{' '}
                        <Link
                            to="/signup"
                            onClick={handleSignupClick}
                            className="text-blue-500 hover:underline cursor-pointer"
                        >
                            Sign Up
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    );
}

export default Login;
