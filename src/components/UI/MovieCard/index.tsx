import React from 'react';
import styles from './movieCard.module.scss';
import {useLocation} from "react-router-dom";
import {FireIcon} from "../Icon/icon.component.tsx";

type Movie = {
    imdbID: string;
    Title: string;
    Year: string;
    Poster: string;
    Genre: string;
    imdbRating: string;
};

type MovieCardProps = {
    movie: Movie;
};

const MovieCard: React.FC<MovieCardProps> = ({ movie }) => {
    const location = useLocation();
    const rating = parseFloat(movie.imdbRating);
    let ratingClass, posterClass, fireIconClass;

    if (rating < 5) {
        ratingClass = styles.lowRaiting;
    } else if (rating >= 5 && rating < 6) {
        ratingClass = styles.middleRating;
    } else {
        ratingClass = styles.raiting;
    }

    if (location.pathname === '/trends') {
        posterClass = `${styles.poster} ${styles.trendsPoster}`;
        fireIconClass = `${styles.fireIcon} ${styles.trendsFireIcon}`;
        ratingClass += ` ${styles.raitingTrends}`
    } else {
        posterClass = styles.poster;
        fireIconClass = styles.fireIcon;
    }


    return (
        <div className={styles.movieCard}>
            <span className={ratingClass}>
                <FireIcon className={fireIconClass}/>
                <span>{movie.imdbRating}</span>
            </span>

            <img
                src={movie.Poster !== 'N/A' ? movie.Poster : 'https://via.placeholder.com/300x450'}
                alt={movie.Title}
                className={posterClass}
            />
            <div className={styles.info}>
                <h3 className={styles.title}>{movie.Title}</h3>
                <p className={styles.genre}>{movie.Genre}</p>
            </div>
        </div>
    );
};

export { MovieCard };