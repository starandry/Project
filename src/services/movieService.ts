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

export const fetchRecommendedMovies = async (genres: string[]): Promise<Movie[]> => {
    const genre = genres[0]; // первый жанр для запроса
    const response = await axios.get(`${API_URL}&s=${genre}&type=movie`);

    if (response.data.Response === 'True') {
        const movies = response.data.Search;

        // детали для каждого фильма, чтобы узнать жанры
        const detailedMoviesPromises = movies.map(async (movie: { imdbID: string }) => {
            const detailsResponse = await axios.get(`${API_URL}&i=${movie.imdbID}`);
            return detailsResponse.data;
        });

        const detailedMovies = await Promise.all(detailedMoviesPromises);

        //фильмы, у которых хотя бы два жанра совпадают
        return detailedMovies.filter((movie: Movie) => {
            // жанры кот  есть  у найденного фильма
            const movieGenres = movie.Genre.split(',').map(genre => genre.trim());
            //жанры кот  совпадают  с исходным фильмом
            const matchingGenres = genres.filter(genre => movieGenres.includes(genre));
            return matchingGenres.length >= 2;
        });
    } else {
        throw new Error(response.data.Error);
    }
};