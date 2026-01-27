"use client";
import "./mobile-carousel.css";
import { Autoplay, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";
import "swiper/css/pagination";
import PromoCard, { type PromoCardProps } from "@/components/ui/promo-card";

interface MobileCarouselProps {
	data: PromoCardProps[];
	isShortCard?: boolean;
}

const MobileCarousel = ({ data, isShortCard = true }: MobileCarouselProps) => {
	return (
		<Swiper
			spaceBetween={50}
			slidesPerView={1}
			autoplay={{
				delay: 3500,
				disableOnInteraction: false,
			}}
			pagination={{
				el: ".custom-pagination",
				bulletClass: "custom-bullet",
				bulletActiveClass: "custom-bullet-active",
				clickable: true,
			}}
			modules={[Pagination, Autoplay]}
		>
			{data.map((card, index) => (
				<SwiperSlide key={index}>
					<PromoCard
						isShortCard={isShortCard}
						title={card.title}
						description={card.description}
						icon={card.icon}
					/>
				</SwiperSlide>
			))}

			<div className="custom-pagination flex justify-center mt-4"></div>
		</Swiper>
	);
};

export default MobileCarousel;
