import React, { createContext, useState, useEffect, useContext } from 'react';
import { checkTokenValidity } from '../services/authService';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(
        !!localStorage.getItem('token') && checkTokenValidity(localStorage.getItem('token'))
    );

    useEffect(() => {
        const token = localStorage.getItem('token');
        
        // Sayfa yenilendiğinde token kontrolü
        if (token && !checkTokenValidity(token)) {
            localStorage.removeItem('token');
            setIsAuthenticated(false);
        }
    }, []);

    const handleLogin = (token) => {
        localStorage.setItem('token', token);
        setIsAuthenticated(true);
    };

    const handleLogout = () => {
        localStorage.removeItem('token');
        setIsAuthenticated(false);
    };

    // Token kontrolü yapan yeni bir fonksiyon
    const checkAndUpdateAuthStatus = () => {
        const token = localStorage.getItem('token');
        
        if (!token || !checkTokenValidity(token)) {
            localStorage.removeItem('token');
            setIsAuthenticated(false);
            return false;
        }
        
        return true;
    };

    return (
        <AuthContext.Provider value={{ 
            isAuthenticated, 
            handleLogin, 
            handleLogout,
            checkAndUpdateAuthStatus // Yeni eklenen fonksiyon
        }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);