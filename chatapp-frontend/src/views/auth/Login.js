import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { login } from '../../utils/api';

// Login component for user authentication
const Login = () => {
    const [formData, setFormData] = useState({ username: '', password: '' });
    const [error, setError] = useState({ message: '', type: '' });
    const navigate = useNavigate();
    const [animationClass, setAnimationClass] = useState('slide-in');

    // Animation effect for component mount and unmount
    useEffect(() => {
        const timer = setTimeout(() => setAnimationClass(''), 1000);
        return () => clearTimeout(timer);
    }, []);

    const handleSignupClick = () => {
        setAnimationClass('slide-out');
        setTimeout(() => navigate('/signup', { replace: true }), 1000);
    };

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!formData.username || !formData.password) {
            setError({ message: 'Please fill in all fields', type: 'emptyFields' });
            return;
        }

        try {
            const user = await login(formData);
            if (user) navigate('/home');
        } catch (error) {
            setError({ message: 'Incorrect username or password', type: 'invalidCredentials' });
            console.error('Error during login:', error);
        }
    };

    return (
        <div className={`min-h-screen flex bg-gray-100 ${animationClass}`}>
            <LeftPanel />
            <LoginForm
                formData={formData}
                error={error}
                handleChange={handleChange}
                handleSubmit={handleSubmit}
                handleSignupClick={handleSignupClick}
            />
        </div>
    );
};

const LeftPanel = () => (
    <div className="w-1/3 bg-gradient-to-b from-green-400 via-purple-500 to-blue-500 flex flex-col justify-center items-center text-white p-10 space-y-5">
        <h1 className="text-5xl font-extrabold mb-5 tracking-tight">
            Chat<span className="text-blue-200">App</span>
        </h1>
        <p className="text-lg font-medium">
            Connect, converse, and collaborate with friends and colleagues.
        </p>
    </div>
);

const LoginForm = ({ formData, error, handleChange, handleSubmit, handleSignupClick }) => (
    <div className="w-2/3 flex items-center justify-center">
        <div className="bg-gradient-to-br from-white to-gray-100 p-12 rounded-xl shadow-xl w-2/3 space-y-6 transform transition-transform">
            <h2 className="text-3xl font-bold mb-5 text-gray-700 tracking-wide">
                Welcome Back!
            </h2>
            <form onSubmit={handleSubmit} className="space-y-4">
                <InputField
                    label="Username"
                    type="text"
                    name="username"
                    value={formData.username}
                    onChange={handleChange}
                />
                <InputField
                    label="Password"
                    type="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                />
                {error.message && (
                    <p className={`text-red-500 text-center ${error.type === 'emptyFields' ? 'mb-4' : 'mb-2'}`}>
                        {error.message}
                    </p>
                )}
                <button
                    type="submit"
                    className="w-full bg-gradient-to-r from-green-500 to-emerald-700 text-white p-3 rounded-lg hover:from-green-500 hover:to-emerald-700 transition-gradient duration-500 shadow-md hover:shadow-lg transform hover:-translate-y-1"
                >
                    Login
                </button>
            </form>
            <p className="mt-4 text-center text-gray-600">
                Don't have an account?{' '}
                <Link to="/signup" onClick={handleSignupClick} className="text-blue-500 hover:underline cursor-pointer">
                    Sign Up
                </Link>
            </p>
        </div>
    </div>
);

const InputField = ({ label, type, name, value, onChange }) => (
    <div className="mb-4">
        <label className="block text-gray-600 mb-2">{label}</label>
        <input
            type={type}
            name={name}
            placeholder={label}
            value={value}
            onChange={onChange}
            className="w-full p-3 border border-gray-300 rounded-lg focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-200 transition-shadow hover:shadow-md"
        />
    </div>
);

export default Login;
