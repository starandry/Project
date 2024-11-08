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

