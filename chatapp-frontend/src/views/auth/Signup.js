import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { signup } from '../../utils/api';

function Signup() {
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        password: '',
        password2: ''
    });
    const [passwordError, setPasswordError] = useState('');
    const [showModal, setShowModal] = useState(false);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const [animationClass, setAnimationClass] = useState('slide-in');

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    useEffect(() => {
        const timer = setTimeout(() => {
            setAnimationClass('');
        }, 1000);
        return () => clearTimeout(timer);
    }, []);

    const handleLoginLinkClick = (e) => {
        e.preventDefault();
        setAnimationClass('slide-out');
        setTimeout(() => {
            navigate('/login', { replace: true });
        }, 1000);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        if (formData.password === formData.password2) {
            setPasswordError('');
            try {
                const response = await signup(formData);
                if (
                    response &&
                    response.data &&
                    response.data.message === 'User registered successfully'
                ) {
                    setShowModal(true);
                    setTimeout(() => {
                        setShowModal(false);
                        setLoading(false); // Move setLoading here
                        navigate('/login');
                    }, 1000);
                } else {
                    console.error('Signup failed:', response);
                    setLoading(false); // Add setLoading here as well
                }
            } catch (error) {
                console.error('Error during signup:', error);
                setLoading(false); // Ensure setLoading is set here too
            }
        } else {
            setPasswordError('Passwords do not match');
            setLoading(false); // Set loading to false in case of password mismatch
        }
    };

    return (
        <div className={`min-h-screen flex bg-gray-100 ${animationClass}`}>
            <div className="w-1/3 bg-gradient-to-b from-green-400 via-purple-500 to-blue-500 flex flex-col justify-center items-center text-white p-10 space-y-5">
                <h1 className="text-5xl font-extrabold mb-5 tracking-tight">
                    Chat<span className="text-blue-200">App</span>
                </h1>
                <p className="text-lg font-medium">
                    Join our community and start chatting with friends and
                    colleagues.
                </p>
            </div>
            <div className="w-2/3 flex items-center justify-center">
                <div className="bg-gradient-to-br from-white to-gray-100 p-12 rounded-xl shadow-xl w-2/3 space-y-6 transform transition-transform hover:scale-105">
                    <h2 className="text-3xl font-bold mb-5 text-gray-700 tracking-wide">
                        Create Your Account
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
                                Email
                            </label>
                            <input
                                type="email"
                                name="email"
                                placeholder="Email"
                                value={formData.email}
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
                        <div className="mb-4">
                            <label className="block text-gray-600 mb-2">
                                Confirm Password
                            </label>
                            <input
                                type="password"
                                name="password2" // Change this line
                                placeholder="Retype Password"
                                value={formData.password2} // Change this line
                                onChange={handleChange}
                                className="w-full p-3 border border-gray-300 rounded-lg focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-200 transition-shadow hover:shadow-md"
                            />
                            {passwordError && (
                                <p className="text-red-500 mt-2">
                                    {passwordError}
                                </p>
                            )}
                        </div>
                        <button
                            type="submit"
                            className="w-full bg-gradient-to-r from-green-500  to-emerald-700 text-white p-3 rounded-lg hover:from-green-500 hover:to-emerald-700 transition-gradient duration-500 shadow-md hover:shadow-lg transform hover:-translate-y-1 active:scale-95"
                        >
                            Sign Up
                        </button>
                    </form>
                    <p className="mt-4 text-center text-gray-600">
                        Already have an account?{' '}
                        <Link
                            to="/login"
                            onClick={handleLoginLinkClick}
                            className="text-blue-500 hover:underline"
                        >
                            Login
                        </Link>
                    </p>
                </div>
            </div>
            {/* Stylish Modal with Page Turn Effect */}
            {showModal && (
                <div className="fixed inset-0 flex items-center justify-center z-50">
                    <div className="absolute inset-0 bg-black opacity-50"></div>
                    <div
                        className={`bg-white p-6 rounded-lg shadow-lg transform transition-transform duration-4000 ${
                            showModal ? 'rotate-180' : ''
                        }`}
                    >
                        <h3 className="text-xl font-bold mb-2">Success!</h3>
                        <p>{formData.username} has successfully signed up!</p>
                    </div>
                </div>
            )}

            {/* Loading Screen */}
            {loading && (
                <div className="fixed inset-0 flex items-center justify-center z-50">
                    <div className="loader"></div>
                </div>
            )}
        </div>
    );
}

export default Signup;
