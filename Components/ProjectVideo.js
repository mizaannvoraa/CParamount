"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "animate.css";

import { useRef, useEffect, useState } from "react";
import Image from "next/image";
import AnimateCard from "./AnimateCard";

// Lazy YouTube Component
const LazyYouTubeEmbed = ({ youtubeId, title }) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [imageError, setImageError] = useState(false);
  
  // Extract video ID from the full string (remove parameters)
  const videoId = youtubeId.split('?')[0];
  
  const handleLoad = () => {
    setIsLoaded(true);
  };

  const handleImageError = () => {
    setImageError(true);
  };

  if (!isLoaded) {
    return (
      <div 
        className="relative w-full aspect-video bg-gray-900 cursor-pointer group overflow-hidden rounded-lg"
        onClick={handleLoad}
      >
        {/* YouTube Thumbnail */}
        <div className="relative w-full h-full">
          <Image
            src={imageError ? 
              `https://img.youtube.com/vi/${videoId}/hqdefault.jpg` : 
              `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`
            }
            alt={title}
            fill
            className="object-cover transition-transform duration-300 group-hover:scale-105"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            onError={handleImageError}
            priority={false}
            quality={85}
            placeholder="blur"
            blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAABAAEDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWGRkqGx0f/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaH9bcfaSXWGaRmknyJckliyjqTzSlT54b6bk+h0R+IRjBDm5aa4+5xYujg7jHuDcnVBUG3kdDLEW7lPEUhNp91XBUhsqCECL3pG7jKBTwv/9k="
          />
        </div>
        
        {/* Dark Overlay */}
        <div className="absolute inset-0 bg-opacity-20 group-hover:bg-opacity-30 transition-all duration-300" />
        
        {/* YouTube Play Button */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="relative group-hover:scale-110 transition-transform duration-300">
            {/* YouTube Red Background Circle */}
            <div className="w-12 h-12 sm:w-16 sm:h-16 md:w-18 md:h-18 bg-red-600 rounded-full flex items-center justify-center shadow-lg group-hover:bg-red-700 transition-colors duration-300">
              {/* White Play Triangle */}
              <svg 
                className="w-4 h-4 sm:w-6 sm:h-6 md:w-7 md:h-7 text-white ml-0.5" 
                fill="currentColor" 
                viewBox="0 0 24 24"
              >
                <path d="M8 5v14l11-7z"/>
              </svg>
            </div>
            
            {/* Pulse Animation Ring */}
            <div className="absolute inset-0 w-12 h-12 sm:w-16 sm:h-16 md:w-18 md:h-18 border-2 border-white border-opacity-50 rounded-full animate-pulse" />
          </div>
        </div>
        
        {/* Video Duration Badge (optional) */}
        <div className="absolute bottom-2 right-2 bg-opacity-80 text-white text-xs px-2 py-1 rounded">
          HD
        </div>
        
        {/* Loading indicator on hover */}
        <div className="absolute bottom-2 left-2 text-white text-xs bg-opacity-70 px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          Click to play
        </div>
        
        {/* YouTube Logo */}
        <div className="absolute top-2 left-2 opacity-70 group-hover:opacity-100 transition-opacity duration-300">
          <svg className="w-6 h-6 sm:w-8 sm:h-8" viewBox="0 0 24 24" fill="none">
            <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" fill="#FF0000"/>
          </svg>
        </div>
      </div>
    );
  }

  return (
    <div className="relative w-full aspect-video rounded-lg overflow-hidden">
      <iframe
        className="w-full h-full"
        src={`https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0`}
        title={title}
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        allowFullScreen
        loading="lazy"
      />
    </div>
  );
};

const videos = [
  {
    title: "The Gateway - Seafront Resid...",
    youtubeId: "LBwI4SHiYXE?si=jy1zKnZyXlD9qkyi",
  },
  {
    title: "Launching Waterfront Resid...",
    youtubeId: "xvN94yEnSBE?si=WX9To25OyA8jOAAl",
  },
  {
    title: "Sea Horizon Towers Preview",
    youtubeId: "-MncVWVfVPY?si=tJq1BeCLKLIicqth",
  },
  {
    title: "Sea Horizon Towers Preview",
    youtubeId: "xGEKzSsU2Ro?si=UDfQtstIwWhHpvlI",
  },
];

export default function ProjectVideo() {
  const prevRef = useRef(null);
  const nextRef = useRef(null);
  const [navigationReady, setNavigationReady] = useState(false);

  // Wait for refs to be available
  useEffect(() => {
    setNavigationReady(true);
  }, []);

  return (
    <div className="container mx-auto relative w-full px-4 lg:pb-8">
      {/* Text Section */}
      <div className="text-center">
        <h2 className="text-[#D2A23A] text-xl md:text-3xl font-extrabold">
          PROJECT VIDEOS
        </h2>
        <div className="mx-auto mt-2 w-39 h-1 rounded"></div>
      </div>

      <div className="w-full max-w-[1190px] mx-auto">
        {navigationReady && (
          <Swiper
            modules={[Navigation]}
            spaceBetween={15}
            slidesPerView={1.1}
            breakpoints={{
              640: { slidesPerView: 2.2 },
              1024: { slidesPerView: 3.2 },
            }}
            navigation={{
              prevEl: prevRef.current,
              nextEl: nextRef.current,
            }}
            onBeforeInit={(swiper) => {
              swiper.params.navigation.prevEl = prevRef.current;
              swiper.params.navigation.nextEl = nextRef.current;
            }}
            // Add lazy loading for Swiper
            lazy={{
              loadPrevNext: true,
              loadOnTransitionStart: true,
            }}
          >
            {videos.map((video, index) => (
              <SwiperSlide key={index}>
                <AnimateCard animationClass="animate__rotateInDownLeft">
                  <div className="relative overflow-hidden mt-8">
                    <LazyYouTubeEmbed 
                      youtubeId={video.youtubeId}
                      title={video.title}
                    />
                  </div>
                </AnimateCard>
              </SwiperSlide>
            ))}
          </Swiper>
        )}

        {/* Navigation Buttons */}
        <div className="flex justify-center items-center mb-4 gap-3 mt-5">
          <button
            ref={prevRef}
            className="px-3 cursor-pointer font-medium text-base lg:text-base py-[6px] outline-0 bg-[#D09E32] rounded text-white hover:bg-[#B8862B] transition-colors duration-200"
            aria-label="Previous video"
          >
            Prev
          </button>
          <button
            ref={nextRef}
            className="px-3 cursor-pointer font-medium text-base lg:text-base py-[6px] outline-0 bg-[#D09E32] rounded text-white hover:bg-[#B8862B] transition-colors duration-200"
            aria-label="Next video"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
}