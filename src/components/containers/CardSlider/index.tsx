import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import {MovieCard} from "../../UI/MovieCard";
import { Movie } from '../../../types';
import {Wrapper} from "../Wrapper";
import styles from './cardSlider.module.scss';
import './cardSlider.scss';

interface SliderProps {
    cards: Movie[];
}

const CardSlider: React.FC<SliderProps> = ({ cards }) => {
    const settings = {
        dots: false,  //точки под  слайдером
        infinite: false,  //вечная прокрутка
        speed: 500,
        slidesToShow: 4,
        slidesToScroll: 1,
        centerMode: false,
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 1,
                    infinite: true,
                    dots: true
                }
            },
            {
                breakpoint: 600,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 1
                }
            },
            {
                breakpoint: 480,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1
                }
            }
        ]
    };

    return (
        <Slider {...settings}>
            {cards.map((card) => (
                <Wrapper className={styles.wrapSlider}>
                    <MovieCard key={card.imdbID} movie={card} />
                </Wrapper>

            ))}
        </Slider>
    );
};

export { CardSlider };
