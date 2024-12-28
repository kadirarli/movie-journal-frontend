import React, { useState } from 'react';
import { login } from '../services/authService';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import '../styles/Login.css';

function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const { handleLogin } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await login({ email, password });
            handleLogin(response.token); // Context'te oturumu başlat
            navigate('/profile'); // Profile sayfasına yönlendir
        } catch (error) {
            alert('Invalid credentials');
        }
    };

    return (
        <div className="login-container">
            <div className="login-form">
                <h2>Login to Movie Journal</h2>
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label htmlFor="email">Email</label>
                        <input
                            type="email"
                            id="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="Enter your email"
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="password">Password</label>
                        <input
                            type="password"
                            id="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="Enter your password"
                            required
                        />
                    </div>
                    <button type="submit" className="btn-submit">Login</button>
                </form>
                <p className="register-link">
                    Don't have an account? <a href="/register">Register Here</a>
                </p>
            </div>
        </div>
    );
}

export default Login;
