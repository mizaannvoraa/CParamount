"use client";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/css";
import Image from "next/image";

export default function Slider() {
  const SliderImages = [
    { src: "/assets/Sobha Central Web banner.jpg", alt: "Slide 1" },
    { src: "/assets/Sobha Central Web Footer banner.jpg", alt: "Slide 2" },
  ];

  const MobileImages = [
    { src: "/assets/Sobha_mobile_banner.jpg", alt: "Slide 3" },
      { src: "/assets/Sobha_Mobile_Footer_banner.jpg", alt: "Slide 3" },
  ];

  return (
    <>
      {/* Desktop Swiper */}
      <div className="hidden md:block">
        <Swiper
          slidesPerView={1}
          loop={true}
          autoplay={{
            delay: 3000,
            disableOnInteraction: false,
          }}
          allowTouchMove={false}
          simulateTouch={false}
          modules={[Autoplay]}
        >
          {SliderImages.map((item, idx) => (
            <SwiperSlide key={`desktop-${idx}`}>
              <div className="relative w-full lg:h-[87vh]">
                <Image
                  src={item.src}
                  alt={item.alt}
                  width={1920}
                  height={1080}
                  className="w-full h-full object-cover"
                />
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      {/* Mobile Swiper */}
      <div className="block md:hidden -mt-17">
        <Swiper
          slidesPerView={1}
          loop={true}
          autoplay={{
            delay: 3000,
            disableOnInteraction: false,
          }}
          allowTouchMove={false}
          simulateTouch={false}
          modules={[Autoplay]}
        >
          {MobileImages.map((item, idx) => (
            <SwiperSlide key={`mobile-${idx}`}>
              <div className="relative ">
                <Image
                  src={item.src}
                  alt={item.alt}
                  width={1920}
                  height={1380}
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
