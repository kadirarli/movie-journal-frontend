import API from './api';

// TMDb'den film arama
export const searchMovies = async (query) => {
    const { data } = await API.get(`/movies/tmdb/${query}`);
    console.log({ data });
    return data.results;
};
