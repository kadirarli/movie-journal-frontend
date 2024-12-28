import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import '../styles/Navbar.css';

const Navbar = () => {
    const { isAuthenticated, handleLogout, checkAndUpdateAuthStatus } = useAuth();
    const navigate = useNavigate();

    const handleAuthenticatedLink = (path) => {
        // Token kontrolü
        if (!checkAndUpdateAuthStatus()) {
            navigate('/'); // Token geçersizse ana sayfaya yönlendir
            return;
        }
        
        // Token geçerliyse sayfaya git
        navigate(path);
    };

    const logout = () => {
        handleLogout();
        navigate('/'); // Logout sonrası ana sayfaya yönlendir
    };

    return (
        <nav className="navbar">
            <div className="navbar-logo">
                <Link to="/">Movie Journal</Link>
            </div>
            <div className="navbar-links">
                <Link to="/">Home</Link>
                {!isAuthenticated && <Link to="/login">Login</Link>}
                {!isAuthenticated && <Link to="/register">Register</Link>}
                
                {isAuthenticated && (
                    <span onClick={() => handleAuthenticatedLink('/movie/search')}>
                        Search Movies
                    </span>
                )}
                {isAuthenticated && (
                    <span onClick={() => handleAuthenticatedLink('/favorites')}>
                        Favorites
                    </span>
                )}
                {isAuthenticated && (
                    <span onClick={() => handleAuthenticatedLink('/profile')}>
                        Profile
                    </span>
                )}
                
                {isAuthenticated && (
                    <button onClick={logout} className="logout-button">
                        Logout
                    </button>
                )}
            </div>
        </nav>
    );
};

export default Navbar;