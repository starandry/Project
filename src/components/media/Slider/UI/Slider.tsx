import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import type { SliderProps } from '@/components/media/Slider/index.model.ts';
import { DiscountCard } from '@/components';

const Slider: React.FC<SliderProps> = ({
    slides = [1, 2, 3, 4, 5],
    discountPercent = 20,
    spaceBetween = 8,
}) => {
    return (
        <div>
            <Swiper
                modules={[Pagination]}
                pagination={{ clickable: true }}
                slidesPerView={3}
                slidesPerGroup={1}
                spaceBetween={spaceBetween}
                breakpoints={{
                    320: { slidesPerView: 1 },
                    640: { slidesPerView: 1.5 },
                    768: { slidesPerView: 2 },
                    1024: { slidesPerView: 3 },
                }}
            >
                {slides.map((_, index) => (
                    <SwiperSlide key={index}>
                        <DiscountCard percent={discountPercent} />
                    </SwiperSlide>
                ))}
            </Swiper>
        </div>
    );
};

export { Slider };
