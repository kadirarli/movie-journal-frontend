import React, { useEffect, useState } from 'react';
import { getProfile } from '../services/authService';
import '../styles/Profile.css';

function Profile() {
    const [user, setUser] = useState(null);

    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const data = await getProfile();
                setUser(data.user);
            } catch (error) {
                console.error('Error fetching profile:', error.message);
            }
        };
        fetchProfile();
    }, []);

    if (!user) return <div className="loading-message">Loading your profile...</div>;

    return (
        <div className="profile-container">
            <div className="profile-header">
                <h2>Welcome, {user.username}!</h2>
                <p>Your personalized profile page</p>
            </div>
            <div className="profile-card">
                <div className="profile-avatar">
                    <img
                        src="https://via.placeholder.com/150"
                        alt="User Avatar"
                        className="avatar-image"
                    />
                </div>
                <div className="profile-info">
                    <p>
                        <strong>Username:</strong> {user.username}
                    </p>
                    <p>
                        <strong>Email:</strong> {user.email}
                    </p>
                    <p>
                        <strong>Joined:</strong> {new Date(user.createdAt).toLocaleDateString()}
                    </p>
                </div>
            </div>
        </div>
    );
}

export default Profile;
