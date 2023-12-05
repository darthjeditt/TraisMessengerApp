import React from 'react';
import { useNavigate } from "react-router-dom";

// Main component for the profile popup, displaying user details and providing logout functionality
const ProfilePopup = ({ user, onClose }) => {
    const navigate = useNavigate();

    // Handles the logout process
    const handleLogout = () => {
        // Redirects the user to the login screen after logout
        navigate('/login', { replace: true });
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
            <div className="bg-white bg-opacity-10 border border-gray-300 rounded-2xl p-6 w-96 shadow-2xl backdrop-filter backdrop-blur-lg">
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-xl font-bold text-white">
                        {user.username} {/* Displaying the username */}
                    </h2>
                    <CloseButton onClick={onClose} /> {/* Close button for the popup */}
                </div>
                <UserProfileSection user={user} /> {/* Section displaying user profile details */}
                <LogoutButton onClick={handleLogout} /> {/* Logout button */}
            </div>
        </div>
    );
};

// Button component for closing the profile popup
const CloseButton = ({ onClick }) => (
    <button
        onClick={onClick}
        className="p-2 rounded-full bg-red-500 bg-opacity-75 text-white hover:bg-red-700 transition duration-300"
    >
        <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
        >
            <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M6 18L18 6M6 6l12 12"
            />
        </svg>
    </button>
);

// Component to display user profile information
const UserProfileSection = ({ user }) => (
    <div className="flex items-center mb-4">
        <img
            src="https://i.pinimg.com/564x/93/4b/4c/934b4cda17d0621f4a796cb195642a45.jpg"
            alt="Profile"
            className="rounded-full w-16 h-16 border-4 border-blue-500 mr-4"
        />
        <div>
            <div className="text-gray-200 font-medium">
                {user.email}
            </div>
            <div className="text-sm text-white p-1 rounded bg-blue-600 bg-opacity-50">
                Status: {user.online ? 'Online' : 'Offline'}
            </div>
        </div>
    </div>
);

// Logout button component
const LogoutButton = ({ onClick }) => (
    <button
        onClick={onClick}
        className="mt-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full transition duration-300"
    >
        Logout
    </button>
);

export default ProfilePopup;
