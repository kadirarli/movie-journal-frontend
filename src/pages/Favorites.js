import React, { useEffect, useState } from 'react';
import { getFavorites, removeFavorite } from '../services/favoritesService';

function Favorites() {
    const [favorites, setFavorites] = useState([]);

    // Favorileri yükleme
    useEffect(() => {
        const fetchFavorites = async () => {
            try {
                const data = await getFavorites();
                setFavorites(data);
            } catch (error) {
                console.error('Error fetching favorites:', error.message);
            }
        };
        fetchFavorites();
    }, []);

    // Favoriden kaldırma
    const handleRemove = async (favoriteId) => {
        try {
            await removeFavorite(favoriteId);
            setFavorites(favorites.filter((fav) => fav.id !== favoriteId));
        } catch (error) {
            console.error('Error removing favorite:', error.message);
        }
    };

    if (!favorites.length) {
        return <div style={{ textAlign: 'center', padding: '20px' }}>You don't have any favorites yet!</div>;
    }

    return (
        <div style={{ padding: '20px', backgroundColor: '#f9f9f9' }}>
            <h2 style={{ textAlign: 'center', marginBottom: '20px', fontSize: '2rem' }}>Your Favorites</h2>

            {/* Favori filmleri grid şeklinde göster */}
            <div
                style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
                    gap: '20px',
                }}
            >
                {favorites.map((favorite) => (
                    <div
                        key={favorite.id}
                        style={{
                            display: 'flex',
                            flexDirection: 'column',
                            justifyContent: 'space-between',
                            backgroundColor: '#fff',
                            borderRadius: '10px',
                            boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
                            overflow: 'hidden',
                            padding: '15px',
                        }}
                    >
                        <img
                            src={favorite.posterPath ? `https://image.tmdb.org/t/p/w500${favorite.posterPath}` : 'https://via.placeholder.com/200x300'}
                            alt={favorite.title || 'Movie Poster'}
                            style={{ width: '100%', height: 'auto', borderRadius: '8px' }}
                        />
                        <div style={{ padding: '10px 0', textAlign: 'center' }}>
                            <h3 style={{ margin: '0', fontSize: '1.2rem', color: '#333' }}>{favorite.title}</h3>
                            <p style={{ margin: '10px 0', fontSize: '0.9rem', color: '#666' }}>
                                {favorite.overview || 'No description available.'}
                            </p>
                            <p style={{ margin: '5px 0', fontSize: '0.9rem', color: '#999' }}>
                                Release Date: {favorite.releaseDate || 'N/A'}
                            </p>
                        </div>
                        <button
                            onClick={() => handleRemove(favorite.id)}
                            style={{
                                backgroundColor: '#ff4d4d',
                                color: 'white',
                                border: 'none',
                                padding: '10px',
                                borderRadius: '4px',
                                cursor: 'pointer',
                                textAlign: 'center',
                            }}
                        >
                            Remove from Favorites
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Favorites;
