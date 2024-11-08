import React, { useEffect } from 'react';
import { MovieCard } from '../../UI/MovieCard';
import styles from './movieGallery.module.scss';
import { useSelector, useDispatch } from 'react-redux';
import { fetchMoviesAsync } from '../../../stores/slices/moviesSlice.ts';
import { RootState, AppDispatch } from '../../../stores/store.ts';

const MovieGallery: React.FC = () => {
   const dispatch = useDispatch<AppDispatch>();
   const { movies, loading, error, page } = useSelector((state: RootState) => state.movies);

   useEffect(() => {
      dispatch(fetchMoviesAsync(page));
   }, [dispatch, page]);

   if (loading && movies.length === 0) return <p>Загрузка...</p>;
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

