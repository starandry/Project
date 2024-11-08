import React from 'react';
import styles from './movieCard.module.scss';

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
    const rating = parseFloat(movie.imdbRating);
    let ratingClass;

    if (rating < 5) {
        ratingClass = styles.lowRaiting;
    } else if (rating >= 5 && rating < 6) {
        ratingClass = styles.middleRating;
    } else {
        ratingClass = styles.raiting;
    }

    return (
        <div className={styles.movieCard}>
            <span className={ratingClass}>{ movie.imdbRating }</span>
            <img
                src={movie.Poster !== 'N/A' ? movie.Poster : 'https://via.placeholder.com/300x450'}
                alt={movie.Title}
                className={styles.poster}
            />
            <div className={styles.info}>
                <h3 className={styles.title}>{movie.Title}</h3>
                <p className={styles.genre}>{movie.Genre}</p>
            </div>
        </div>
    );
};

export { MovieCard };