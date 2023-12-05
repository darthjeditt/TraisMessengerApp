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
    const [errors, setErrors] = useState({
        passwordError: '',
        formError: '',
        emailError: ''
    });
    const [showModal, setShowModal] = useState(false);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const [animationClass, setAnimationClass] = useState('slide-in');

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

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        // Reset errors
        setErrors({ passwordError: '', formError: '', emailError: '' });

        // Check for empty fields
        if (!formData.username || !formData.email || !formData.password || !formData.password2) {
            setErrors({ ...errors, formError: 'Please fill in all fields' });
            setLoading(false);
            return;
        }

        // Validate email format
        // eslint-disable-next-line
        const emailRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
        if (!emailRegex.test(formData.email)) {
            setErrors({ ...errors, emailError: 'Invalid email format' });
            setLoading(false);
            return;
        }

        // Check if passwords match
        if (formData.password !== formData.password2) {
            setErrors({ ...errors, passwordError: 'Passwords do not match' });
            setLoading(false);
            return;
        }

        try {
            const response = await signup(formData);
            if (response) {
                setShowModal(true);
                setTimeout(() => {
                    setShowModal(false);
                    navigate('/login');
                }, 1000); // Delay for showing modal and then navigating
            } else {
                setErrors({ ...errors, formError: 'Signup failed, please try again' });
                setLoading(false);
            }
        } catch (error) {
            console.error('Error during signup:', error);
            setErrors({ ...errors, formError: 'An error occurred during signup' });
            setLoading(false);
        }
    };

    return (
        <div className={`min-h-screen flex bg-gray-100 ${animationClass}`}>
            <div className="w-1/3 bg-gradient-to-b from-green-400 via-purple-500 to-blue-500 flex flex-col justify-center items-center text-white p-10 space-y-5">
                <h1 className="text-5xl font-extrabold mb-5 tracking-tight">
                    Chat<span className="text-blue-200">App</span>
                </h1>
                <p className="text-lg font-medium">
                    Join our community and start chatting with friends and colleagues.
                </p>
            </div>
            <div className="w-2/3 flex items-center justify-center">
                <div className="bg-gradient-to-br from-white to-gray-100 p-12 rounded-xl shadow-xl w-2/3 space-y-6 transform transition-transform">
                    <h2 className="text-3xl font-bold mb-5 text-gray-700 tracking-wide">
                        Create Your Account
                    </h2>
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div className="mb-4">
                            <label className="block text-gray-600 mb-2">Username</label>
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
                            <label className="block text-gray-600 mb-2">Email</label>
                            <input
                                type="email"
                                name="email"
                                placeholder="Email"
                                value={formData.email}
                                onChange={handleChange}
                                className="w-full p-3 border border-gray-300 rounded-lg focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-200 transition-shadow hover:shadow-md"
                            />
                            {errors.emailError && (
                                <p className="text-red-500 mt-2">{errors.emailError}</p>
                            )}
                        </div>
                        <div className="mb-4">
                            <label className="block text-gray-600 mb-2">Password</label>
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
                            <label className="block text-gray-600 mb-2">Confirm Password</label>
                            <input
                                type="password"
                                name="password2"
                                placeholder="Retype Password"
                                value={formData.password2}
                                onChange={handleChange}
                                className="w-full p-3 border border-gray-300 rounded-lg focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-200 transition-shadow hover:shadow-md"
                            />
                            {errors.passwordError && (
                                <p className="text-red-500 mt-2">{errors.passwordError}</p>
                            )}
                        </div>
                        {errors.formError && (
                            <p className="text-red-500 text-center mb-4">{errors.formError}</p>
                        )}
                        <button
                            type="submit"
                            className="w-full bg-gradient-to-r from-green-500 to-emerald-700 text-white p-3 rounded-lg hover:from-green-500 hover:to-emerald-700 transition-gradient duration-500 shadow-md hover:shadow-lg transform hover:-translate-y-1 active:scale-95"
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
            {/* Modal and Loading Screen */}
            {showModal && (
                <div className="fixed inset-0 flex items-center justify-center z-50">
                    <div className="absolute inset-0 bg-black opacity-50"></div>
                    <div className="bg-white p-6 rounded-lg shadow-lg transform transition-transform">
                        <h3 className="text-xl font-bold mb-2">Success!</h3>
                        <p>{formData.username} has successfully signed up!</p>
                    </div>
                </div>
            )}
            {loading && (
                <div className="fixed inset-0 flex items-center justify-center z-50">
                    <div className="loader"></div>
                </div>
            )}
        </div>
    );
}

export default Signup;
