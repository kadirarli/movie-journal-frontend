import React, { useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate, useNavigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Profile from './pages/Profile';
import MovieSearch from './pages/MovieSearch';
import Favorites from './pages/Favorites';

function PrivateRoute({ children }) {
    const { isAuthenticated, checkAndUpdateAuthStatus } = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        if (!checkAndUpdateAuthStatus()) {
            navigate('/');
        }
    }, []);

    return isAuthenticated ? children : null;
}

function App() {
    return (
        <AuthProvider>
            <Router>
                <Navbar />
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/register" element={<Register />} />
                    <Route
                        path="/profile"
                        element={
                            <PrivateRoute>
                                <Profile />
                            </PrivateRoute>
                        }
                    />
                    <Route
                        path="/movie/search"
                        element={
                            <PrivateRoute>
                                <MovieSearch />
                            </PrivateRoute>
                        }
                    />
                    <Route
                        path="/favorites"
                        element={
                            <PrivateRoute>
                                <Favorites />
                            </PrivateRoute>
                        }
                    />
                </Routes>
            </Router>
        </AuthProvider>
    );
}

export default App;