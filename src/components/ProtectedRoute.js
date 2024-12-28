import React, { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

const ProtectedRoute = ({ children }) => {
    const { isAuthenticated } = useContext(AuthContext);

    if (!isAuthenticated) {
        // Oturum kapalıysa ana sayfaya yönlendirin
        return <Navigate to="/" />;
    }

    return children;
};

export default ProtectedRoute;