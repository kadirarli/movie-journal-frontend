import API from './api';

// Favorileri getir
export const getFavorites = async () => {
    const { data } = await API.get('/favorites');
    return data.favorites;
};

// Favoriye ekle
export const addFavorite = async (favorite) => {
    const { data } = await API.post('/favorites', favorite);
    return data;
};

// Favoriden kaldır
export const removeFavorite = async (favoriteId) => {
    await API.delete(`/favorites/${favoriteId}`);
};
