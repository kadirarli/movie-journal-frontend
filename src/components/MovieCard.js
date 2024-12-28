import React from 'react';
import '../styles/MovieCard.css';

const MovieCard = ({ movie, handleAddFavorite }) => {
    const {
        title,
        releaseDate,
        genres,
        overview,
        posterPath,
        voteAverage,
        voteCount,
        popularity,
    } = movie;

    return (
        <div className="movie-card">
            <div className="movie-card-content">
                <img
                    src={posterPath ? `https://image.tmdb.org/t/p/w500${posterPath}` : 'https://via.placeholder.com/200x300'}
                    alt={title || 'Movie Poster'}
                    className="movie-card-poster"
                />
                <div className="movie-card-details">
                    <h3 className="movie-card-title">{title || 'Untitled'}</h3>
                    <p className="movie-card-info">
                        {releaseDate || 'Unknown Year'} | ⭐ {voteAverage || 'N/A'} ({voteCount || '0'} votes)
                    </p>
                    <p className="movie-card-info">Popularity: {popularity || 'N/A'}</p>
                    <p className="movie-card-genres">{genres || 'Unknown genres'}</p>
                    <p className="movie-card-overview">
                        {overview ? `${overview.slice(0, 100)}...` : 'No overview available.'}
                    </p>
                </div>
            </div>
            <button className="movie-card-button" onClick={() => handleAddFavorite(movie)}>
                Add to Favorites
            </button>
        </div>
    );
};

export default MovieCard;
