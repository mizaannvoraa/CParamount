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
    { src: "/assets/Sobha_mobile_banner.webp", alt: "Slide 3" },
    { src: "/assets/Sobha_Mobile_Footer_banner.webp", alt: "Slide 4" },
  ]);

  const expandSlides = (slides) =>
    slides.length < 3 ? [...slides, ...slides, ...slides] : slides;

  return (
    <>
      <Head>
        <link rel="preload" as="image" href="/assets/Sobha_Web_Ban1.webp" />
        <link rel="preload" as="image" href="/assets/Sobha_mobile_banner.webp" />
        <link rel="preload" as="image" href="/assets/Sobha_Web_Ban2.webp" />
        <link rel="preload" as="image" href="/assets/Sobha_Mobile_Footer_banner.webp" />
      </Head>

      {/* Desktop Swiper */}
      <div className="hidden md:block">
        {/* Reserve space immediately to prevent layout shift */}
        <div className="w-full aspect-[16/9] max-h-screen bg-gray-100 relative">
          <Swiper
            slidesPerView={1}
            loop={desktopSlides.length >= 3}
            speed={600}
            autoplay={{ delay: 3000, disableOnInteraction: false }}
            allowTouchMove={false}
            modules={[Autoplay]}
            className="mySwiper h-full absolute inset-0"
            style={{ height: '100%' }}
          >
            {expandSlides(desktopSlides).map((item, idx) => (
              <SwiperSlide key={`desktop-${idx}`}>
                <div className="relative w-full h-full overflow-hidden">
                  <Image
                    src={item.src}
                    alt={item.alt}
                    fill
                    priority={idx === 0}
                    loading={idx === 0 ? "eager" : "lazy"}
                    className="object-cover"
                    style={{ objectPosition: "center" }}
                    sizes="(min-width: 768px) 100vw, 0px"
                    placeholder="blur"
                    blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAABAAEDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWGRkqGx0f/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaH9bcfaSXWGaRmknyJckliyjqTzSlT54b6bk+h0R+i2kwHbK79l8+dfgAi4/UegN"
                  />
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>

      {/* Mobile Swiper */}
      <div className="block md:hidden">
        {/* Reserve space immediately to prevent layout shift */}
        <div className="w-full aspect-[9/16] bg-gray-100 relative">
          <Swiper
            slidesPerView={1}
            loop={mobileSlides.length >= 3}
            speed={600}
            autoplay={{ delay: 3000, disableOnInteraction: false }}
            allowTouchMove={false}
            modules={[Autoplay]}
            className="mySwiper h-full absolute inset-0"
            style={{ height: '100%' }}
          >
            {expandSlides(mobileSlides).map((item, idx) => (
              <SwiperSlide key={`mobile-${idx}`}>
                <div className="relative w-full h-full overflow-hidden">
                  <Image
                    src={item.src}
                    alt={item.alt}
                    fill
                    priority={idx === 0}
                    loading={idx === 0 ? "eager" : "lazy"}
                    className="object-cover"
                    style={{ objectPosition: "center" }}
                    sizes="(max-width: 767px) 100vw, 0px"
                    placeholder="blur"
                    blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAABAAEDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWGRkqGx0f/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaH9bcfaSXWGaRmknyJckliyjqTzSlT54b6bk+h0R+i2kwHbK79l8+dfgAi4/UegN"
                  />
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
    </>
  );
}