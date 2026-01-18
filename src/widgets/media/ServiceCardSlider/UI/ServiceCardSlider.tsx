import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import type { ServiceCardSliderProps } from '../model/serviceCardSliderTypes';
import { ServiceCardContainer } from '@/features/service-card';
import styles from './index.module.scss';

const ServiceCardSlider: React.FC<ServiceCardSliderProps> = ({
    slidesCount = 6,
    spaceBetween = 42,
}) => {
    return (
        <div className={styles.sliderWrap}>
            <Swiper
                spaceBetween={spaceBetween}
                slidesPerView={2.7}
                breakpoints={{
                    640: { slidesPerView: 1.1 },
                    768: { slidesPerView: 2 },
                    1024: { slidesPerView: 2.7 },
                }}
            >
                {Array.from({ length: slidesCount }).map((_, idx) => (
                    <SwiperSlide key={idx}>
                        <ServiceCardContainer />
                    </SwiperSlide>
                ))}
            </Swiper>
        </div>
    );
};

export { ServiceCardSlider };
