import axios from 'axios';
import {API_URL} from '../constants/APIconstats.ts';

export type Movie = {
    imdbID: string;
    Title: string;
    Year: string;
    Poster: string;
    Genre: string;
    imdbRating: string;
};

export type MovieDetails = {
    imdbID: string;
    Title: string;
    Year: string;
    Poster: string;
    Genre: string;
    imdbRating: string;
    Runtime: string;
    Released: string;
    BoxOffice: string;
    Country: string;
    Production: string;
    Actors: string;
    Director: string;
    Writer: string;
    Plot: string;
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
    return movies.filter(movie => {
        const rating = parseFloat(movie.imdbRating);
        return rating >= minRating;
    });
};

export const fetchMovieDetails = async (imdbID: string): Promise<Movie> => {
    const response = await axios.get(`${API_URL}&i=${imdbID}`);
    if (response.data.Response === 'True') {
        return response.data;
    } else {
        throw new Error(response.data.Error);
    }
};
