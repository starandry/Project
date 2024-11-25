import React, {useEffect} from 'react';
import {MovieCard} from '../../UI/MovieCard';
import styles from './movieGallery.module.scss';
import {useDispatch, useSelector} from 'react-redux';
import {fetchHighRatedMoviesAsync, fetchMoviesAsync} from '../../../stores/slices/moviesSlice.ts';
import { selectFavourites } from '../../../stores/slices/favouritesSlice';
import {AppDispatch, RootState} from '../../../stores/store.ts';
import {useLocation} from 'react-router-dom';
import {MIN_RATING} from "../../../constants/APIconstats.ts";
import {SectionTitle} from "../../UI/SectionTitle";
import ImageCard from "../ImageCard";
import { FiltersState } from '../../../types';

const MovieGallery: React.FC = () => {
   const dispatch = useDispatch<AppDispatch>();
   const location = useLocation();
   const { movies, loading, error, page } = useSelector((state: RootState) => state.movies);
   const showButtons = useSelector((state: { filters: FiltersState }) => state.filters.showButtons);
   const favourites = useSelector(selectFavourites);
   const currentPath = location.pathname;
   let galleryClass, titleHome, sectionTitleText;

   if (currentPath === '/trends' || currentPath === '/favorites') {
      galleryClass = `${styles.movieGallery} ${styles.movieGalleryTrends}`;
      titleHome = `${styles.titleHome} ${styles.titleTrends}`;
   } else {
      galleryClass = styles.movieGallery;
      titleHome = styles.titleHome;
   }

   if (currentPath === '/trends') {
      sectionTitleText = 'Trends';
   } else if (currentPath === '/favorites') {
      sectionTitleText = 'Favorites';
   }

   useEffect(() => {
      if (location.pathname === '/' ) {
         dispatch(fetchMoviesAsync(page));
      } else if (location.pathname === '/trends') {
         dispatch(fetchHighRatedMoviesAsync({ page, minRating: MIN_RATING }))
      }
   }, [dispatch, location.pathname, page]);

   if (loading && movies.length === 0) {
      return <p>Загрузка...</p>;
   }

   if (currentPath === '/favorites' && favourites.length === 0) {
      return <>
         <ImageCard
             imageSrc={'images/empty-state.png'}
             altText={'Empty state'} caption={'Empty state text'}/>
      </>
   }

   if (error) return <p>{error}</p>;

   return (
       <>
          {showButtons && (
              <div className={styles.btnContainer}>

              </div>
          )}
          <SectionTitle text={sectionTitleText} className={titleHome}/>
          <div className={galleryClass}>
             {movies.map((movie) => (
                 <MovieCard key={movie.imdbID} movie={movie} />
             ))}
          </div>
       </>

   );
};

export { MovieGallery };

