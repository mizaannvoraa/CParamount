"use client";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/css";
import Image from "next/image";
import { useState } from "react";
import Head from "next/head";

export default function Slider() {
  const [desktopSlides] = useState([
    { src: "/assets/Sobha_Web_Ban1.webp", alt: "Slide 1" },
    { src: "/assets/Sobha_Web_Ban2.webp", alt: "Slide 2" },
  ]);

  const [mobileSlides] = useState([
    { src: "/assets/Sobha_mobile_banner.jpg", alt: "Slide 3" },
    { src: "/assets/Sobha_Mobile_Footer_banner.jpg", alt: "Slide 4" },
  ]);

  // ✅ JavaScript-compatible function
  const expandSlides = (slides) =>
    slides.length < 3 ? [...slides, ...slides, ...slides] : slides;

  return (
    <>
      {/* Preload images for better LCP */}
      <Head>
        <link rel="preload" as="image" href="/assets/Sobha_Web_Ban1.webp" />
        <link rel="preload" as="image" href="/assets/Sobha_mobile_banner.jpg" />
      </Head>

      {/* Desktop Swiper */}
      <div className="hidden md:block">
        <Swiper
          slidesPerView={1}
          loop={desktopSlides.length >= 3}
          speed={600}
          autoplay={{
            delay: 3000,
            disableOnInteraction: false,
          }}
          allowTouchMove={false}
          modules={[Autoplay]}
          className="mySwiper"
        >
          {expandSlides(desktopSlides).map((item, idx) => (
            <SwiperSlide key={`desktop-${idx}`}>
              <div className="relative w-full aspect-[16/9] lg:h-[100vh] lg:-mt-[30px]">
                <Image
                  src={item.src}
                  alt={item.alt}
                  width={1920}
                  height={1080}
                  priority={idx < 2}
                  loading={idx < 2 ? "eager" : "lazy"}
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
          loop={mobileSlides.length >= 3}
          speed={600}
          autoplay={{
            delay: 3000,
            disableOnInteraction: false,
          }}
          allowTouchMove={false}
          modules={[Autoplay]}
          className="mySwiper"
        >
          {expandSlides(mobileSlides).map((item, idx) => (
            <SwiperSlide key={`mobile-${idx}`}>
              <div className="relative w-full aspect-[9/16]">
                <Image
                  src={item.src}
                  alt={item.alt}
                  width={1080}
                  height={1920}
                  priority={idx === 0} // <-- ONLY first slide is priority
                  loading={idx === 0 ? "eager" : "lazy"}
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