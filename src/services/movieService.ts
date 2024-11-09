import axios from 'axios';
import { API_URL } from '../constants/APIconstats.ts';

export type Movie = {
    imdbID: string;
    Title: string;
    Year: string;
    Poster: string;
    Genre: string;
    imdbRating: string;
};

export const fetchMovies = async (page: number = 1): Promise<Movie[]> => {
    const response = await axios.get(`${API_URL}&s=all&type=movie&page=${page}`);
    if (response.data.Response === 'True') {
        const movieDetailsPromises = response.data.Search.map(async (movie: { imdbID: string }) => {
            const detailsResponse = await axios.get(`${API_URL}&i=${movie.imdbID}`);
            return detailsResponse.data;
        });

        return await Promise.all(movieDetailsPromises);
    } else {
        throw new Error(response.data.Error);
    }
};

export const fetchHighRatedMovies = async (page: number, minRating: number): Promise<Movie[]> => {
    const movies = await fetchMovies(page);
    console.log("Fetched Movies:", movies); // Посмотреть полученные фильмы
    const filteredMovies = movies.filter(movie => {
        const rating = parseFloat(movie.imdbRating);
        console.log(`Movie: ${movie.Title}, Rating: ${rating}, MinRating: ${minRating}`);
        return rating >= minRating;
    });
    console.log("Filtered Movies:", filteredMovies); // Посмотреть отфильтрованные фильмы
    return filteredMovies;
};