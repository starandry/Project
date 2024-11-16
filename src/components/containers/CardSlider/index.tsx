import React, {useState} from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import {MovieCard} from "../../UI/MovieCard";
import { Movie } from '../../../types';
import {Wrapper} from "../Wrapper";
import styles from './cardSlider.module.scss';
import './cardSlider.scss';
import {ArrowLeft, ArrowRigth} from "../../UI/Icon/icon.component.tsx";

interface SliderProps {
    cards: Movie[];
}

const CustomPrevArrow = ({ onClick, disabled }: { onClick?: () => void, disabled?: boolean }) => (
    <button onClick={onClick} className={`${styles.customPrev} ${disabled ? styles.disabled : ''}`} disabled={disabled}>
        <ArrowLeft />
    </button>
);

const CustomNextArrow = ({ onClick, disabled }: { onClick?: () => void, disabled?: boolean }) => (
    <button onClick={onClick} className={`${styles.customNext} ${disabled ? styles.disabled : ''}`} disabled={disabled}>
        <ArrowRigth />
    </button>
);

const CardSlider: React.FC<SliderProps> = ({ cards }) => {
    const [isPrevDisabled, setIsPrevDisabled] = useState(true);
    const [isNextDisabled, setIsNextDisabled] = useState(cards.length <= 4);

    const settings = {
        dots: false,
        infinite: false,
        speed: 500,
        slidesToShow: 4,
        slidesToScroll: 1,
        centerMode: false,
        beforeChange: (oldIndex, newIndex) => {
            setIsPrevDisabled(newIndex === 0);
            setIsNextDisabled(newIndex >= cards.length - 4);
        },
        nextArrow: <CustomNextArrow disabled={isNextDisabled} />,
        prevArrow: <CustomPrevArrow disabled={isPrevDisabled} />,
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