const ProfilePopup = ({ user, onClose }) => {
    return (
        <div className="absolute top-full right-0 bg-white border border-gray-300 rounded-lg p-4 w-72 z-10 mt-2 shadow-lg">
            <div className="flex justify-between items-center mb-4">
                <h2 className="text-lg font-semibold">{user.username}</h2>
                <button onClick={onClose} className="text-gray-600 hover:text-gray-800">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                </button>
            </div>
            <div className="flex items-center mb-2">
                <img src={user.profileImage} alt="Profile" className="rounded-full w-16 h-16 border-2 border-blue-500 mr-4" />
                <div>
                    <div className="text-gray-800 font-medium">{user.email}</div>
                    <div className="flex items-center mt-1">
                        <span className={`h-3 w-3 rounded-full ${user.online ? 'bg-green-500' : 'bg-gray-500'} mr-2`}></span>
                        <span className="text-sm text-gray-600">Status: {user.online ? 'Online' : 'Offline'}</span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProfilePopup;
