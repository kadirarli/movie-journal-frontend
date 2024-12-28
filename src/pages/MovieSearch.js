import React, { useState } from 'react';
import { searchMovies } from '../services/tmdbService';
import { addFavorite } from '../services/favoritesService';
import MovieCard from '../components/MovieCard';

function MovieSearch() {
    const [query, setQuery] = useState('');
    const [results, setResults] = useState([]);

    const handleSearch = async (e) => {
        e.preventDefault();
        try {
            const movies = await searchMovies(query);
            setResults(movies);
        } catch (error) {
            console.error('Error searching movies:', error.message);
        }
    };

    const handleAddFavorite = async (movie) => {
        try {
            await addFavorite(movie);
            alert(`${movie.title} added to favorites!`);
        } catch (error) {
            console.error('Error adding favorite:', error.message);
        }
    };

    return (
        <div className="movie-search-container">
            <h2 className="movie-search-title">Search Movies</h2>
            <form onSubmit={handleSearch} className="movie-search-form">
                <input
                    type="text"
                    placeholder="Search for a movie"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    className="movie-search-input"
                />
                <button type="submit" className="movie-search-button">
                    Search
                </button>
            </form>

            <div className="movie-search-grid">
                {results.map((movie) => (
                    <MovieCard
                        key={movie.id}
                        movie={movie}
                        handleAddFavorite={handleAddFavorite}
                    />
                ))}
            </div>
        </div>
    );
}

export default MovieSearch;
