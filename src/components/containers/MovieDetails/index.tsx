import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchMovieDetailsAsync, clearMovieDetails } from '../../../stores/slices/moviesSlice.ts';
import { RootState, AppDispatch  } from '../../../stores/store.ts';
import styles from './movieDetails.module.scss';
import { MovieDetails as MovieDetailsType } from '../../../services/movieService.ts';
import {Wrapper} from "../Wrapper";
import {Spacer} from "../../UI/Spacer";
import {FavouriteIcon, IMDbBadge, ShareIcon} from "../../UI/Icon/icon.component.tsx";

const MovieDetails: React.FC = () => {
    const { imdbID } = useParams<{ imdbID: string }>();
    const dispatch = useDispatch<AppDispatch>();
    const movieDetails = useSelector((state: RootState) => state.movies.movieDetails as MovieDetailsType);
    const loading = useSelector((state: RootState) => state.movies.loading);
    const error = useSelector((state: RootState) => state.movies.error);

    //лежит ли  фильм в хранилище избранных
    const isFavourite = useSelector((state: RootState) =>
        state.favourites.some(favMovie => favMovie.imdbID === movieDetails.imdbID)
    );

    useEffect(() => {
        if (imdbID) {
            dispatch(fetchMovieDetailsAsync(imdbID));
        }

        return () => {
            dispatch(clearMovieDetails());
        };
    }, [dispatch, imdbID]);

    if (loading) return <p>Загрузка...</p>;
    if (error) return <p>{error}</p>;
    if (!movieDetails) return null;
    console.log(movieDetails);
    return (
        <Wrapper className={styles.movieDetails}>
            <Wrapper className={styles.container}>
                <Wrapper className={styles.wrappPoster}>
                    <img src={movieDetails.Poster !== 'N/A' ? movieDetails.Poster : 'https://via.placeholder.com/300x450'}
                         alt={movieDetails.Title}
                         className={styles.poster}/>
                    <Wrapper>
                        <Wrapper >
                            <FavouriteIcon isActive={isFavourite}/>
                        </Wrapper>
                        <Wrapper >
                            <ShareIcon/>
                        </Wrapper>
                    </Wrapper>
                </Wrapper>
                <Wrapper className={styles.movieHeader}>
                    <p className={styles.genre}>{movieDetails.Genre.split(',').map(genre => genre.trim()).join(' • ')}</p>
                    <h2 className={styles.title}>{movieDetails.Title}</h2>
                    <Wrapper className={styles.infoBadges}>
                <span className={styles.rating}>
                    <span>{movieDetails.imdbRating}</span>
                </span>
                        <Wrapper className={styles.IMDWrap}>
                            <IMDbBadge/>
                            <span>{movieDetails.imdbRating}</span>
                        </Wrapper>
                        <Wrapper className={styles.runtimeWrap}>
                            <span>{movieDetails.Runtime}</span>
                        </Wrapper>
                    </Wrapper>
                </Wrapper>
                <Wrapper className={styles.movieInfo}>
                    <p className={styles.plot}>{movieDetails.Plot}</p>
                    <Wrapper className={styles.detailsWrap}>
                        <span>Year:</span><p>{movieDetails.Year}</p>
                        <span>Released:</span><p>{movieDetails.Released}</p>
                        <span>BoxOffice:</span><p>{movieDetails.BoxOffice}</p>
                        <span>Country:</span><p>{movieDetails.Country}</p>
                        <span>Production:</span><p>{movieDetails.Production}</p>
                        <span>Actors:</span><p>{movieDetails.Actors}</p>
                        <span>Director:</span><p>{movieDetails.Director}</p>
                        <span>Writers:</span><p>{movieDetails.Writer}</p>
                    </Wrapper>
                </Wrapper>
            </Wrapper>
            <Spacer className={styles.spacer}/>
        </Wrapper>
    );
};

export {MovieDetails};