import React, { useState, useEffect } from 'react';
import { getCurrentUser, updateUserStatus } from '../utils/api';
import { TailSpin } from 'react-loader-spinner';

function CurrentUserDisplay() {
    const [currentUser, setCurrentUser] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [showDetails, setShowDetails] = useState(false);

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const user = await getCurrentUser();
                setCurrentUser(user);
                if (!user.online) {
                    await updateUserStatus(user._id, true); // Update online status
                }
            } catch (error) {
                console.error('Error fetching current user:', error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchUser();
    }, []);

    if (isLoading) {
        return <TailSpin />; // Replace with your loading spinner or UI element
    }

    if (!currentUser) {
        return <div>User not found.</div>;
    }

    const toggleDetails = () => {
        setShowDetails(!showDetails);
    };

    return (
        <div className="relative">
            <div className="cursor-pointer" onClick={toggleDetails}>
                <div className="text-gray-600">{currentUser.username}</div>
            </div>
            {showDetails && currentUser && (
                <div className="absolute top-full left-0 bg-white border border-gray-300 rounded-lg p-4 w-72 z-10 mt-2 shadow-lg">
                    <div className="font-bold text-lg">
                        {currentUser.username}
                    </div>
                    <div className="text-gray-600">{currentUser.email}</div>
                    <div className="flex items-center">
                        <span
                            className={`h-3 w-3 rounded-full ${
                                currentUser.online
                                    ? 'bg-green-500'
                                    : 'bg-gray-500'
                            } mr-2`}
                        ></span>
                        Status: {currentUser.online ? 'Online' : 'Offline'}
                    </div>
                </div>
            )}
        </div>
    );
}

export default CurrentUserDisplay;
