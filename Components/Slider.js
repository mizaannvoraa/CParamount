"use client";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/css";
import Image from "next/image";
import { useEffect, useState } from "react";

export default function Slider() {
  // Use state to store slides to ensure React doesn't re-render and break Swiper
  const [desktopSlides] = useState([
    { src: "/assets/Sobha Central Web banner.jpg", alt: "Slide 1" },
    { src: "/assets/Sobha Central Web Footer banner.jpg", alt: "Slide 2" },
  ]);

  const [mobileSlides] = useState([
    { src: "/assets/Sobha_mobile_banner.jpg", alt: "Slide 3" },
    { src: "/assets/Sobha_Mobile_Footer_banner.jpg", alt: "Slide 4" },
  ]);

  const getExpandedSlides = (slides) => {
    return [...slides, ...slides, ...slides, ...slides];
  };

  return (
    <>
      {/* Desktop Swiper */}
      <div className="hidden md:block">
        <Swiper
          slidesPerView={1}
          spaceBetween={0}
          loop={false}
          speed={800}
          watchSlidesProgress={true}
          autoplay={{
            delay: 3000,
            disableOnInteraction: false,
          }}
          allowTouchMove={false}
          simulateTouch={false}
          modules={[Autoplay]}
          className="mySwiper"
        >
          {getExpandedSlides(desktopSlides).map((item, idx) => (
            <SwiperSlide key={`desktop-${idx}`}>
              <div className="relative w-full lg:h-[87vh]">
                <Image
                  src={item.src}
                  alt={item.alt}
                  width={1920}
                  height={1080}
                  priority={idx < 2}
                  className="w-full h-full object-cover"
                />
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      {/* Mobile Swiper */}
      <div className="block md:hidden mt-0">
        <Swiper
          slidesPerView={1}
          spaceBetween={0}
          loop={false} 
          speed={800}
          watchSlidesProgress={true}
          autoplay={{
            delay: 3000,
            disableOnInteraction: false,
          }}
          allowTouchMove={false}
          simulateTouch={false}
          modules={[Autoplay]}
          className="mySwiper"
        >
          {getExpandedSlides(mobileSlides).map((item, idx) => (
            <SwiperSlide key={`mobile-${idx}`}>
              <div className="relative">
                <Image
                  src={item.src}
                  alt={item.alt}
                  width={1920}
                  height={1380}
                  priority={idx < 2}
                  className="w-full h-full object-cover"
                />
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </>
  );
}