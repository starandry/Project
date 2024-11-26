import React from 'react';
import styles from './movieCard.module.scss';
import {useLocation, Link} from "react-router-dom";
import {FavouriteIcon, FireIcon} from "../Icon/icon.component.tsx";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../../../stores/store.ts";
import {toggleFavourite} from "../../../stores/slices/favouritesSlice.ts";
import { Movie } from '../../../types';
import {Wrapper} from "../../containers/Wrapper";
import '../../../styles/_globals.scss'

type MovieCardProps = {
    movie: Movie;
    wrapperClassName?: string;
};

const MovieCard: React.FC<MovieCardProps> = ({ movie, wrapperClassName }) => {
    const location = useLocation();
    const dispatch = useDispatch();
    const rating = parseFloat(movie.imdbRating);
    const isDark = useSelector((state: RootState) => state.theme.isDark);
    const currentPath = location.pathname;
    let ratingClass, posterClass, fireIconClass, compTitle, seriesCard;

    if (isDark) {
        compTitle = styles.title;
    } else {
        compTitle = `${styles.title} ${styles.lightTitle}`;
    }

    //лежит ли  фильм в хранилище избранных
    const isFavourite = useSelector((state: RootState) =>
        state.favourites.some(favMovie => favMovie.imdbID === movie.imdbID)
    );

    const handleFavouriteClick = () => {
        dispatch(toggleFavourite(movie));
    };

    if (rating < 5) {
        ratingClass = styles.lowRaiting;
    } else if (rating >= 5 && rating < 6) {
        ratingClass = styles.middleRating;
    } else {
        ratingClass = styles.raiting;
    }

    if (currentPath === '/trends') {
        posterClass = `${styles.poster} ${styles.trendsPoster}`;
        fireIconClass = `${styles.fireIcon} ${styles.trendsFireIcon}`;
        ratingClass += ` ${styles.raitingTrends}`
        seriesCard = styles.movieCard;
    } else if (location.pathname === '/favorites' && !isFavourite) {
        return null //карточка не показывается
    } else if (currentPath === '/favorites') {
        posterClass = `${styles.poster} ${styles.trendsPoster}`;
        seriesCard = styles.movieCard;
    } else if (currentPath.startsWith('/movie/')) {
        posterClass = `${styles.poster} ${styles.moviePoster}`;
        seriesCard = `${styles.movieCard} ${styles.seriesCard}`;
        fireIconClass = styles.fireIcon;
    } else {
        posterClass = styles.poster;
        fireIconClass = styles.fireIcon;
        seriesCard = styles.movieCard;
    }


    return (
        <div className={seriesCard}>
            <span className={ratingClass}>
                <FireIcon className={fireIconClass}/>
                <span>{movie.imdbRating}</span>
            </span>
            <span className={styles.favouriteIconWrapper} onClick={handleFavouriteClick}>
                <Wrapper className={`${wrapperClassName ? wrapperClassName : ''}`}>
                    <FavouriteIcon  isActive={isFavourite}/>
                </Wrapper>
            </span>
            <Link to={`/movie/${movie.imdbID}`}>
                <img
                    src={movie.Poster !== 'N/A' ? movie.Poster : 'https://via.placeholder.com/300x450'}
                    alt={movie.Title}
                    className={posterClass}
                />
            </Link>
            <div className={styles.info}>
                <h3 className={compTitle}>{movie.Title}</h3>
                <p className={styles.genre}>{movie.Genre.split(',').map(genre => genre.trim()).join(' • ')}</p>
            </div>
        </div>
    );
};

export { MovieCard };