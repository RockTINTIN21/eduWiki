"use client";

import {Swiper, SwiperSlide} from "swiper/react";
import {Pagination} from "swiper/modules";
import PromoCard, {PromoCardProps} from "@/app/home-components/PromoCard";

interface MobileCarouselProps {
  data: PromoCardProps[],
  isShortCard?: boolean,
}

const MobileCarousel = ({data, isShortCard = true}: MobileCarouselProps) => {
  return (
    <>
      <Swiper
        spaceBetween={50}
        slidesPerView={1}
        pagination={{
          el: '.custom-pagination',
          clickable: true
        }}
        modules={[Pagination]}
      >
        {data.map((card, index) => (
          <SwiperSlide key={index}>
            <PromoCard isShortCard={isShortCard} title={card.title} description={card.description} icon={card.icon} />
          </SwiperSlide>
        ))}
      </Swiper>
      <div className="custom-pagination flex justify-center mt-4"/>
    </>
  );
};

export default MobileCarousel;