import React from 'react';
import '../styles/Home.css'; // CSS dosyasını oluşturacağız

function Home() {
    return (
        <div className="home">
            {/* Hero Section */}
            <section className="hero">
                <div className="hero-content">
                    <h1>Welcome to Movie Journal</h1>
                    <p>Your personal hub for exploring and saving your favorite movies and TV shows.</p>
                    <a href="/movie/search" className="cta-button">Start Exploring</a>
                </div>
                <img
                    className="hero-image"
                    src="https://via.placeholder.com/800x400"
                    alt="Cinema background"
                />
            </section>

            {/* Features Section */}
            <section className="features">
                <h2>Features</h2>
                <div className="feature-list">
                    <div className="feature-card">
                        <img
                            src="https://via.placeholder.com/300x200"
                            alt="Search Movies"
                        />
                        <h3>Search for Movies</h3>
                        <p>Explore a vast database of movies and TV shows powered by TMDB. Find details, ratings, genres, and more.</p>
                    </div>
                    <div className="feature-card">
                        <img
                            src="https://via.placeholder.com/300x200"
                            alt="Save Favorites"
                        />
                        <h3>Save Your Favorites</h3>
                        <p>Add your favorite movies and TV shows to your personalized list for easy access anytime.</p>
                    </div>
                    <div className="feature-card">
                        <img
                            src="https://via.placeholder.com/300x200"
                            alt="User Profile"
                        />
                        <h3>Manage Your Profile</h3>
                        <p>View and update your profile details to make your experience more personalized.</p>
                    </div>
                </div>
            </section>

            {/* Call to Action */}
            <section className="cta">
                <h2>Get Started Today!</h2>
                <p>Login or register now to begin your journey with Movie Journal.</p>
                <div className="cta-buttons">
                    <a href="/login" className="cta-button">Login</a>
                    <a href="/register" className="cta-button secondary">Register</a>
                </div>
            </section>
        </div>
    );
}

export default Home;
