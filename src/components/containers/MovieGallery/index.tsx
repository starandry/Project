import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { MovieCard } from '../../UI/MovieCard';
import styles from './movieGallery.module.scss';

interface Movie {
   imdbID: string;
   Title: string;
   Year: string;
   Poster: string;
   Genre: string;
   imdbRating: string; // Добавляем новое поле для рейтинга
}

const API_KEY = '62630e97';
const API_URL = `https://www.omdbapi.com/?apikey=${API_KEY}`;

const MovieGallery: React.FC = () => {
   const [movies, setMovies] = useState<Movie[]>([]);
   const [loading, setLoading] = useState<boolean>(true);
   const [error, setError] = useState<string | null>(null);

   useEffect(() => {
      const fetchMovies = async () => {
         try {
            const response = await axios.get(`${API_URL}&s=all&type=movie&page=1`);
            if (response.data.Response === 'True') {
               const movieDetailsPromises = response.data.Search.map(async (movie: { imdbID: string }) => {
                  const detailsResponse = await axios.get(`${API_URL}&i=${movie.imdbID}`);
                  return detailsResponse.data;
               });

               const moviesWithDetails = await Promise.all(movieDetailsPromises);
               setMovies(moviesWithDetails);
            } else {
               setError(response.data.Error);
            }
         } catch (error) {
            console.error('Ошибка при получении данных:', error);
            setError('Не удалось загрузить фильмы');
         } finally {
            setLoading(false);
         }
      };

      fetchMovies();
   }, []);

   if (loading) return <p>Загрузка...</p>;
   if (error) return <p>{error}</p>;

   return (
       <div className={styles.movieGallery}>
          {movies.map((movie) => (
              <MovieCard key={movie.imdbID} movie={movie} />
          ))}
       </div>
   );
};

export { MovieGallery };
