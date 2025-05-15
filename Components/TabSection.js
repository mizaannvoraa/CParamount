"use client";

import { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules"; // Added Autoplay import
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/autoplay"; // Added CSS for autoplay
import Image from "next/image";
import ContactModalForm from "./Modal";
import "animate.css";
import AnimateCard from "./AnimateCard";

const tabs = ["All", "Sobha", "Damac", "Emaar", "Binghatti"];
const projects = [
  {
    id: "B1",
    tab: "Sobha",
    name: "Sobha Uaq downtown",
    location: "UAE (Umm Al QUAIN Downtown)",
    config: "1,2,3 Bedroom Residences",
    price: "1.11 Million AED",
    image: "/assets/S1.jpg",
    rera: "n/A",
    description:
      "This word suggests a unique combination of waterfront peacefulness and mountain-inspired elevation (high-rise towers of the cluster), offering residents a beachfront lifestyle experience where they can enjoy both the whispers of oceanic waves and the grandeur of views from the high-rise buildings.",
  },
  {
    id: "C1",
    tab: "Sobha",
    name: "Sobha Hartland II",
    location: "Meydan (Bukadra),Dubai,UAE(SOBHA HARTLAND II)",
    config: "1 , 2 & 3 BEDROOM APARTMENTS",
    price: "1.3 Million AED",
    image: "/assets/S2.jpg",
    rera: "3067",
    description:
      "With over 1 million sq.ft of lush green spaces and villas set between an abundance of open greenery, the residency at sobha Hartland II allows you to experience nature's bounty in full glory.Walk along the streets adorned with bouldering walls and tree-lined walkways in grand forest landscapes and seasonal gardens.Take time out to peek at a dense panorama of the park accessible from every villa.",
  },
  {
    id: "C3",
    tab: "Sobha",
    name: "Sobha jlt",
    location: "UAE",
    config: " 1, 1.5, 2 & 3 Bed",
    price: "1,580,796 AED",
    image: "/assets/Sobha Jlt.jpg",
    rera: "N/A",
    description:
      "Pre launching Verde by Sobha. Embrace a new kind of living in Dubai's one of the most coveted districts-JLT, surrounded by crafted lakes, thriving residential complexes, buzzing high streets and more.With 66 stories, SOBHA Verde is one of the tallest residential skyscrapers oering picturesque views of the lush green meadows and emerald golf course. The uber-luxury homes are designed to suit the discerning tastes of the globe trotters with class-apart amenities.",
  },
  {
    id: "C4",
    tab: "Damac",
    name: "Damac island",
    location: "Dubailand, near exit 36 on Emirates Road (E611)",
    config: "4 & 5 Bedroom",
    price: "2.35 Million AED",
    image: "/assets/D1.jpg",
    rera: "3698",
    description:
      "The heart of Paradise at the core of our tropical haven, the central Hub Fountain stands as a mesmerising focal point. This aquatic masterpiece isn't just water it's a living, breathing spectacle where elements dance in harmony.Watch as droplets pirouette with light beams, and flames flirt playfully with laser beams, creating a symphony for the senses.",
  },
  {
    id: "C5",
    tab: "Damac",
    name: "Maritime city Chelsea tower",
    location: "Dubai Maritime City(DMC)",
    config: "1, 2 & 3 Bedrooms",
    price: "2.17 Million",
    image: "/assets/D2.jpg",
    rera: "N/A",
    description:
      "  The towers are a distillation of Chelsea’s very essence - their passion, pride as well as purpose and brought to life in the most luxuriously timeless way possible. Each of the towers blurs the line between contemporary urban and indulgent, waterfront resort-style living like never before.",
  },
  {
    id: "C6",
    tab: "Damac",
    name: "Damac la Violeta 4",
    location: "DAMAC Hills 2",
    config: "4 Bed Townhouse",
    price: "2,515,000 AED",
    image: "/assets/elixir.jpg",
    rera: "N/A",
    description:
      "Violet 4 is part of a community where every moment becomes a lasting memory. Where you can attend a yoga class, go tanning and float down a lazy river all before lunch.Where your kids can paint the town red, and blue, catch a wave or two and play to their, and your heart's content. This is the community you never knew you needed, and more.",
  },
  {
    id: "C8",
    tab: "Emaar",
    name: "Waterfront Towers",
    location: "Mahim, Mumbai",
    config: "2, 3 & 4 BHK FLATS",
    price: "6.0 Cr.* (All Incl.)",
    image: "/assets/E1.jpg",
    rera: "P51900098765",
    description:
      "Waterfront Towers offers a luxurious lifestyle with stunning views of the Arabian Sea, located in the prime area of Mahim.",
  },
  {
    id: "C9",
    tab: "Emaar",
    name: "Waterfront Towers",
    location: "Mahim, Mumbai",
    config: "2, 3 & 4 BHK FLATS",
    price: "6.0 Cr.* (All Incl.)",
    image: "/assets/E2.jpg",
    rera: "P51900098765",
    description:
      "Waterfront Towers offers a luxurious lifestyle with stunning views of the Arabian Sea, located in the prime area of Mahim.",
  },
  // {
  //   id: "C10",
  //   tab: "Emaar",
  //   name: "Waterfront Towers",
  //   location: "Mahim, Mumbai",
  //   config: "2, 3 & 4 BHK FLATS",
  //   price: "6.0 Cr.* (All Incl.)",
  //   image: "/assets/elixir.jpg",
  //   rera: "P51900098765",
  //   description:
  //     "Waterfront Towers offers a luxurious lifestyle with stunning views of the Arabian Sea, located in the prime area of Mahim.",
  // },
  {
    id: "C11",
    tab: "Binghatti",
    name: "Binghatti hillsview (science park arjan)",
    location:
      "Al Barsha South 2,near Al Khail Road (Opp emaar Dubai Hills estate)",
    config: "1 & 2 Bedroom Apartments",
    price: "0.75 Million AED.",
    image: "/assets/B1.jpg",
    rera: "3321",
    description:
      "On the talus of progress, a new epitome comes into view. Rise above. Embrace the expanse. At Hill Views, discover a mode of living where ambition thrives as the future unfolds. Here, cutting-edge design syncs with the horizon, creating an environment that thrives at the intersection of community and technology.",
  },
  {
    id: "C12",
    tab: "Binghatti",
    name: "Binghatti Haven",
    location: "Dubai Sports City",
    config: "1 & 2  Bedroom",
    price: "1.2 Million AED",
    image: "/assets/B2.jpg",
    rera: "3442",
    description:
      "Amid the vibrant pulse of a dynamic district, Haven emerges as a sanctuary of renewal. True to its name, it is a harmonious retreat where the drive for excellence meets serene moments of restoration. Haven is not just a residence, it is a canvas for rejuvenation, a place where life balances between ambition and calm.",
  },
  {
    id: "C13",
    tab: "Binghatti",
    name: "N/A",
    location: "N/A",
    config: "N/A",
    price: "N/A",
    image: "/assets/B3.jpg",
    rera: "N/a",
    description:
      "N/A",
  },
  {
    id: "C14",
    tab: "Binghatti",
    name: "N/A",
    location: "N/A",
    config: "N/A",
    price: "N/A",
    image: "/assets/B4.jpg",
    rera: "N/A",
    description:
      "Waterfront Towers offers a luxurious lifestyle with stunning views of the Arabian Sea, located in the prime area of Mahim.",
  },
];

export default function TabSection() {
  const [isOpen, setIsOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("All");

  /** @type {Object.<string, boolean>} */
  const [isExpanded, setIsExpanded] = useState({});

  const filteredProjects =
    activeTab === "All"
      ? projects
      : projects.filter((proj) => proj.tab === activeTab);

  const toggleDescription = (projectId) => {
    setIsExpanded((prev) => ({
      ...prev,
      [projectId]: !prev[projectId],
    }));
  };

  // Make sure we have enough slides to enable loop
  const shouldEnableLoop = filteredProjects.length > 3;

  return (
    <>
      <div
        className="max-w-7xl mx-auto px-4 md:py-12 py-6 bg-white"
        id="projects"
      >
        <div className="text-center">
          <h2 className="text-[#D2A23A] mt-4 text-2xl md:text-3xl font-extrabold">
            PROJECTS
          </h2>
          <div className="mx-auto mt-[1px] w-19 lg:w-29 h-1 bg-black rounded"></div>
        </div>

        {/* Tabs */}
        <AnimateCard animationClass="animate__slideInDown">
          <div className="flex flex-wrap space-x-4 mb-6 mt-8 items-center justify-center ">
            {tabs.map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-6 py-2 rounded-[5px] border mt-[7px] cursor-pointer ${
                  activeTab === tab
                    ? "bg-transparent text-[#b6800c] border-2 border-[#D09E32]"
                    : "bg-[#D09E32] border-0 text-white"
                }`}
              >
                {tab}
              </button>
            ))}
          </div>
        </AnimateCard>
        {/* Slider */}
        <div className="relative">
          <Swiper
            modules={[Navigation, Pagination, Autoplay]}
            spaceBetween={20}
            slidesPerView={1}
            loop={shouldEnableLoop}
            autoplay={{
              delay: 2000,
              disableOnInteraction: false,
            }}
            navigation={{
              nextEl: ".custom-swiper-button-next",
              prevEl: ".custom-swiper-button-prev",
            }}
            pagination={{
              el: ".custom-swiper-pagination",
              clickable: true,
              dynamicBullets: true,
            }}
            breakpoints={{
              640: { slidesPerView: 1 },
              768: { slidesPerView: 2 },
              1024: { slidesPerView: 3 },
            }}
            className="mySwiper"
          >
            {filteredProjects.map((proj) => (
              <SwiperSlide key={proj.id} className="!bg-white">
                <AnimateCard animationClass="animate__zoomIn">
                  <div className="bg-white shadow-lg rounded-lg overflow-hidden my-2">
                    <Image
                      src={proj.image}
                      alt={proj.name}
                      width={400}
                      height={300}
                      className="w-full h-48 object-cover"
                    />
                    <div className="max-w-4xl mx-auto bg-white border border-gray-300 p-2 shadow-sm text-sm">
                      <h3 className="text-gray-800 text-xs font-extralight mb-2 border-b border-[#ccc]">
                        {proj.name}
                      </h3>

                      <p className="text-gray-800 text-[14px] font-extralight leading-relaxed">
                        {isExpanded[proj.id]
                          ? proj.description
                          : `${proj.description.slice(0, 130)}...`}
                      </p>

                      <button
                        className="text-yellow-600 font-semibold text-[13px] my-[2px] cursor-pointer hover:underline focus:outline-none"
                        onClick={() => toggleDescription(proj.id)}
                      >
                        {isExpanded[proj.id] ? "Read less" : "Read more"}
                      </button>

                      <div className="pt-4 text-gray-700 ">
                        <div className="flex flex-col gap-y-3">
                          {proj.rera ? (
                            <div className="border-b text-xs font-extralight pb-[2px] border-gray-300 flex justify-between sm:pr-1">
                              <span className="font-medium">Rera No.</span>
                              <span className="text-gray-600">{proj.rera}</span>
                            </div>
                          ) : (
                            <div className="invisible border-b text-xs font-extralight pb-[2px] border-gray-300 flex justify-between sm:pr-1">
                              <span className="font-medium">.</span>
                              <span className="text-gray-600">.</span>
                            </div>
                          )}

                          <div className="border-b text-xs font-extralight pb-[2px] border-gray-300 flex justify-between sm:pr-1">
                            <span className="font-medium">Location</span>
                            <span className="text-gray-600 text-right">
                              {proj.location}
                            </span>
                          </div>
                          <div className="border-b text-xs font-extralight pb-[2px] border-gray-300 flex justify-between sm:pr-1">
                            <span className="font-medium">Configuration</span>
                            <span className="text-gray-600">{proj.config}</span>
                          </div>
                          <div className="border-b text-xs font-extralight pb-[2px] border-gray-300 flex justify-between sm:pr-1">
                            <span className="font-medium">Starting Price</span>
                            <span className="text-gray-600">{proj.price}</span>
                          </div>
                        </div>

                        <div className="flex flex-col gap-3 mt-3">
                          <div className="flex border-b text-xs font-normal border-gray-300 items-center justify-between">
                            For more details
                            <button
                              onClick={() => setIsOpen(true)}
                              className="bg-[#D09E32] text-xs mb-1 text-white px-4 py-[6px] cursor-pointer hover:bg-yellow-700"
                            >
                              Click Here
                            </button>
                          </div>
                          <div className="flex items-center justify-between font-semibold">
                            <span className="text-black text-xs">
                              Download Brochure
                            </span>
                            <button
                              onClick={() => setIsOpen(true)}
                              className="bg-[#D09E32] text-xs mb-1 text-white px-4 py-[6px] cursor-pointer hover:bg-yellow-700"
                            >
                              Click Here
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </AnimateCard>
              </SwiperSlide>
            ))}
          </Swiper>

          {/* Custom Pagination */}
          <div className="w-full flex items-center gap-1 ml-4 justify-center mt-4">
            <div className="custom-swiper-pagination"></div>
          </div>
        </div>
      </div>
      {isOpen && <ContactModalForm onClose={() => setIsOpen(false)} />}
    </>
  );
}
