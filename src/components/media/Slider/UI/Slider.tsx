import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import type { SliderProps } from '@/components/media/Slider/index.model.ts';
import { DiscountCard } from '@/components';
import styles from './index.module.scss';
import './slider.css';

const Slider: React.FC<SliderProps> = ({
    slides = [1, 2, 3, 4, 5],
    discountPercent = 20,
    spaceBetween = 8,
}) => {
    return (
        <div className={styles.sliderWrap}>
            <Swiper
                modules={[Pagination]}
                pagination={{ clickable: true }}
                slidesPerView={3.25}
                slidesPerGroup={1}
                spaceBetween={spaceBetween}
                breakpoints={{
                    320: { slidesPerView: 1 },
                    640: { slidesPerView: 1.5 },
                    768: { slidesPerView: 2.25 },
                    1024: { slidesPerView: 3.25 },
                }}
                className={styles.swiper}
            >
                {slides.map((_, index) => (
                    <SwiperSlide key={index} className={styles.slide}>
                        <DiscountCard percent={discountPercent} />
                    </SwiperSlide>
                ))}
            </Swiper>
        </div>
    );
};

export { Slider };
