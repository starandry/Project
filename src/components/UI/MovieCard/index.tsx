import React from 'react';
import styles from './movieCard.module.scss';

interface MovieCardProps {
    movie: {
        imdbID: string;
        Title: string;
        Year: string;
        Poster: string;
        Genre: string;
        imdbRating: string;
    };
}

const MovieCard: React.FC<MovieCardProps> = ({ movie }) => {
    console.log(movie.imdbRating);
    return (
        <div className={styles.movieCard}>
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

