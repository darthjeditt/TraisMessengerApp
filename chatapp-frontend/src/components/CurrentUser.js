import React, { useState, useEffect } from 'react';
import { getCurrentUser } from '../utils/api';

function CurrentUserDisplay() {
    const [currentUser, setCurrentUser] = useState(null);

    useEffect(() => {
        getCurrentUser().then(user => {
            setCurrentUser(user);
        }).catch(error => console.error('Error fetching current user:', error));
    }, []);

    if (!currentUser) {
        return <div>Loading user...</div>;
    }

    return (
        <div className="current-user-display">
            <div className="user-name">{currentUser.name}</div>
            {/* Add more user details here if needed */}
        </div>
    );
}

export default CurrentUserDisplay;
