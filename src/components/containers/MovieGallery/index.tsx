import React, {useEffect} from 'react';
import {MovieCard} from '../../UI/MovieCard';
import styles from './movieGallery.module.scss';
import {useDispatch, useSelector} from 'react-redux';
import {fetchHighRatedMoviesAsync, fetchMoviesAsync} from '../../../stores/slices/moviesSlice.ts';
import {AppDispatch, RootState} from '../../../stores/store.ts';
import {useLocation} from 'react-router-dom';
import {MIN_RATING} from "../../../constants/APIconstats.ts";

const MovieGallery: React.FC = () => {
   const dispatch = useDispatch<AppDispatch>();
   const location = useLocation();
   const { movies, loading, error, page } = useSelector((state: RootState) => state.movies);

   useEffect(() => {
      if (location.pathname === '/' ) {
         dispatch(fetchMoviesAsync(page));
      } else if (location.pathname === '/trends') {
         dispatch(fetchHighRatedMoviesAsync({ page, minRating: MIN_RATING }))
      }
   }, [dispatch, location.pathname, page]);

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

