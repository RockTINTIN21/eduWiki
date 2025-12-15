"use client";

import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import { PhotoProvider, PhotoView } from "react-photo-view";
import { HugeiconsIcon } from "@hugeicons/react";
import { ArrowLeft01Icon, ArrowRight01Icon } from "@hugeicons/core-free-icons";

import "swiper/css";
import "./GalleryCarousel.css";
import "react-photo-view/dist/react-photo-view.css";

const GalleryCarousel = ({ images }: { images: string[] }) => {
  return (
    <PhotoProvider>
      <Swiper
        spaceBetween={20}
        slidesPerView={3}
        modules={[Navigation]}
        navigation={{
          nextEl: ".swiper-button-next-custom",
          disabledClass: "swiper-button-disabled-custom",
          prevEl: ".swiper-button-prev-custom",
        }}
      >
        {images.map((image, index) => (
          <SwiperSlide
            key={index}
            className="!h-[70px] md:!h-[150px]"
          >
            <PhotoView src={image}>
              <Image
                className="rounded-xl h-full object-cover cursor-pointer"
                src={image}
                width={500}
                height={250}
                alt="Изображение"
              />
            </PhotoView>
          </SwiperSlide>
        ))}

        <div className="swiper-button-next-custom">
          <HugeiconsIcon icon={ArrowRight01Icon} />
        </div>
        <div className="swiper-button-prev-custom">
          <HugeiconsIcon icon={ArrowLeft01Icon} />
        </div>
      </Swiper>
    </PhotoProvider>
  );
};

export default GalleryCarousel;
