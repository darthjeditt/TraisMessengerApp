const ProfilePopup = ({ user, onClose }) => {
    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
            <div className="bg-white border border-gray-300 rounded-xl p-4 w-96 shadow-xl">
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-lg font-semibold text-gray-800">
                        {user.username}
                    </h2>
                    <button
                        onClick={onClose}
                        className="p-2 rounded-md hover:bg-gray-200"
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
                </div>
                <div className="flex items-center mb-4">
                    <img
                        src={user.profileImage}
                        alt="Profile"
                        className="rounded-full w-16 h-16 border-4 border-blue-500 mr-4"
                    />
                    <div>
                        <div className="text-gray-700 font-medium">
                            {user.email}
                        </div>
                        <div className="bg-black bg-opacity-50 text-white p-1 rounded">
                            Status: {user.online ? 'Online' : 'Offline'}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProfilePopup;
