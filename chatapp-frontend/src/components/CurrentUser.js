import React, { useState, useEffect } from 'react';
import { getCurrentUser } from '../utils/api';
import { TailSpin } from 'react-loader-spinner';

function CurrentUserDisplay() {
    const [currentUser, setCurrentUser] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const user = await getCurrentUser();
                setCurrentUser(user);
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

    return (
        <div className="current-user-display">
            <div className="user-name">{currentUser.username}</div>
            {/* Add more user details here */}
        </div>
    );
}

export default CurrentUserDisplay;
