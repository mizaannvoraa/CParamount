"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "animate.css";

import { useRef, useEffect, useState } from "react";
import AnimateCard from "./AnimateCard";

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
  {
    title: "Sea Horizon Towers Preview",
    youtubeId: "l482T0yNkeo",
  },
  {
    title: "Sea Horizon Towers Preview",
    youtubeId: "l482T0yNkeo",
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
        <div className="mx-auto mt-2 w-39 h-1 bg-black rounded"></div>
      </div>

      <div className="w-full max-w-[1190px] mx-auto">
        {navigationReady && (
          <Swiper
            modules={[Navigation]}
            spaceBetween={16}
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
          >
            {videos.map((video, index) => (
              <SwiperSlide key={index}>
                <AnimateCard animationClass="animate__rotateInDownLeft">
                  <div className="relative overflow-hidden mt-8">
                    <iframe
                      className="w-full h-48 sm:h-56 md:h-64 lg:h-72"
                      src={`https://www.youtube.com/embed/${video.youtubeId}`}
                      title={video.title}
                      frameBorder="0"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                    ></iframe>
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
            className="px-3 cursor-pointer font-medium text-base lg:text-base py-[6px] outline-0 bg-[#D09E32] rounded text-white "
          >
            Prev
          </button>
          <button
            ref={nextRef}
            className="px-3 cursor-pointer font-medium text-base lg:text-base py-[6px] outline-0 bg-[#D09E32] rounded text-white "
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
}
