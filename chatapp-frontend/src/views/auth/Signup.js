import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { signup } from '../../utils/api';

// Main Signup component for handling user registration
const Signup = () => {
    // State for managing form data
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        password: '',
        password2: ''
    });

    // State for managing form errors
    const [errors, setErrors] = useState({
        passwordError: '',
        formError: '',
        emailError: ''
    });

    // State for controlling modal visibility
    const [showModal, setShowModal] = useState(false);

    // State for managing loading state
    const [loading, setLoading] = useState(false);

    // Navigation hook for redirecting users
    const navigate = useNavigate();

    // State for managing entrance and exit animations
    const [animationClass, setAnimationClass] = useState('slide-in');

    // Effect for handling animation timeout
    useEffect(() => {
        const timer = setTimeout(() => setAnimationClass(''), 1000);
        return () => clearTimeout(timer);
    }, []);

    // Handles click on the login link
    const handleLoginLinkClick = () => {
        setAnimationClass('slide-out');
        setTimeout(() => navigate('/login', { replace: true }), 1000);
    };

    // Handles form field changes
    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    // Handles form submission
    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setErrors({ passwordError: '', formError: '', emailError: '' });

        // Form validation logic
        if (
            !formData.username ||
            !formData.email ||
            !formData.password ||
            !formData.password2
        ) {
            setErrors({ ...errors, formError: 'Please fill in all fields' });
            setLoading(false);
            return;
        }

        // Email format validation
        // eslint-disable-next-line
        const emailRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
        if (!emailRegex.test(formData.email)) {
            setErrors({ ...errors, emailError: 'Invalid email format' });
            setLoading(false);
            return;
        }

        // Password match validation
        if (formData.password !== formData.password2) {
            setErrors({ ...errors, passwordError: 'Passwords do not match' });
            setLoading(false);
            return;
        }

        // Signup API call
        try {
            const response = await signup(formData);
            if (response) {
                setShowModal(true);
                setTimeout(() => {
                    setShowModal(false);
                    navigate('/login');
                }, 1000);
            } else {
                setErrors({
                    ...errors,
                    formError: 'Signup failed, please try again'
                });
                setLoading(false);
            }
        } catch (error) {
            console.error('Error during signup:', error);
            setErrors({
                ...errors,
                formError: 'An error occurred during signup'
            });
            setLoading(false);
        }
    };

    return (
        <div className={`min-h-screen flex bg-gray-100 ${animationClass}`}>
            <LeftPanel />
            <SignupForm
                formData={formData}
                errors={errors}
                handleChange={handleChange}
                handleSubmit={handleSubmit}
                handleLoginLinkClick={handleLoginLinkClick}
            />
            {showModal && <SuccessModal username={formData.username} />}
            {loading && <LoadingScreen />}
        </div>
    );
};

// Left panel component displaying branding and information
const LeftPanel = () => (
    <div className="w-1/3 bg-gradient-to-b from-green-400 via-purple-500 to-blue-500 flex flex-col justify-center items-center text-white p-10 space-y-5">
        <h1 className="text-5xl font-extrabold mb-5 tracking-tight">
            Chat<span className="text-blue-200">App</span>
        </h1>
        <p className="text-lg font-medium">
            Join our community and start chatting with friends and colleagues.
        </p>
    </div>
);

// Form component for user signup
const SignupForm = ({
    formData,
    errors,
    handleChange,
    handleSubmit,
    handleLoginLinkClick
}) => (
    <div className="w-2/3 flex items-center justify-center">
        <div className="bg-gradient-to-br from-white to-gray-100 p-12 rounded-xl shadow-xl w-2/3 space-y-6 transform transition-transform">
            <h2 className="text-3xl font-bold mb-5 text-gray-700 tracking-wide">
                Create Your Account
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
                    label="Email"
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    error={errors.emailError}
                />
                <InputField
                    label="Password"
                    type="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                />
                <InputField
                    label="Confirm Password"
                    type="password"
                    name="password2"
                    value={formData.password2}
                    onChange={handleChange}
                    error={errors.passwordError}
                />
                {errors.formError && (
                    <p className="text-red-500 text-center mb-4">
                        {errors.formError}
                    </p>
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
);

// Input field component for form inputs
const InputField = ({ label, type, name, value, onChange, error }) => (
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
        {error && <p className="text-red-500 mt-2">{error}</p>}
    </div>
);

// Modal component displayed on successful signup
const SuccessModal = ({ username }) => (
    <div className="fixed inset-0 flex items-center justify-center z-50">
        <div className="absolute inset-0 bg-black opacity-50"></div>
        <div className="bg-white p-6 rounded-lg shadow-lg transform transition-transform">
            <h3 className="text-xl font-bold mb-2">Success!</h3>
            <p>{username} has successfully signed up!</p>
        </div>
    </div>
);

// Loading screen component displayed during processing
const LoadingScreen = () => (
    <div className="fixed inset-0 flex items-center justify-center z-50">
        <div className="loader"></div>
    </div>
);

export default Signup;
