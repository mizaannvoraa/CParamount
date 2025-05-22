"use client";

import { useState, useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/autoplay";
import Image from "next/image";
import ContactModalForm from "./Modal";
import "animate.css";
import AnimateCard from "./AnimateCard";

// Tabs
const tabs = ["All", "Sobha", "Damac", "Emaar", "Binghatti"];
const projects = [
  {
    id: "B1",
    tab: "Sobha",
    name: "Sobha Aquamont",
    location: "UAE (Umm Al QUAIN Downtown)",
    config: "1,2,3 Bedroom Residences",
    price: "1.11 Million AED",
    image: "/assets/S1.jpg",
    rera: "Pre Launch",
    description:
      "This word suggests a unique combination of waterfront peacefulness and mountain-inspired elevation (high-rise towers of the cluster), offering residents a beachfront lifestyle experience where they can enjoy both the whispers of oceanic waves and the grandeur of views from the high-rise buildings.",
  },
  {
    id: "C1",
    tab: "Sobha",
    name: "Sobha Hartland II",
    location: "Meydan, Dubai",
    config: "1,2 & 3 Bedroom Apartments & Villas",
    price: "1.3 Million AED",
    image: "/assets/S2.jpg",
    rera: "3067",
    description:
      "With over 1 million sq.ft of lush green spaces and villas set between an abundance of open greenery, the residency at sobha Hartland II allows you to experience nature's bounty in full glory.Walk along the streets adorned with bouldering walls and tree-lined walkways in grand forest landscapes and seasonal gardens.Take time out to peek at a dense panorama of the park accessible from every villa. Water front living with mansions , villas in same community , close to downtown , burj khalifa, dubai mall & dubai creek tower.",
  },
  {
    id: "C3",
    tab: "Sobha",
    name: "Sobha Central",
    location: "JLT, Dubai",
    config: " 1,1.5,2 & 3 Bed",
    price: "1.5 Million AED",
    image: "/assets/Sobha Jlt.jpg",
    rera: "Pre Launch",
    description:
      "Set along Sheikh Zayed Road, Sobha Central sits at the intersection of movement, meaning, and modernity. With the Dubai skyline as your backdrop and the city’s pulse at your doorstep, this address redefines what it means to live in the centre of it all. Designed for those who seek balance—between work and home, pace and pause—it o ers direct access to business hubs, retail districts, and the vibrant energy of urban life.",
  },
  {
    id: "C4",
    tab: "Damac",
    name: "Damac island",
    location: "Dubailand, Dubai",
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
    name: "Damac Chelsea tower",
    location: "Maritime City (DMC), Dubai",
    config: "1, 2 & 3 Bedrooms",
    price: "2.17 Million AED",
    image: "/assets/D2.jpg",
    rera: "3719",
    description:
      "The towers are a distillation of Chelsea’s very essence - their passion, pride as well as purpose and brought to life in the most luxuriously timeless way possible. Each of the towers blurs the line between contemporary urban and indulgent, waterfront resort-style living like never before.",
  },
  {
    id: "C6",
    tab: "Damac",
    name: "Damac la Violet 4",
    location: "DAMAC Hills 2,Dubai",
    config: "4 Bed Townhouse",
    price: "1.9 Million AED",
    image: "/assets/elixir.jpg",
    rera: "2354",
    description:
      "Violet 4 is part of a community where every moment becomes a lasting memory. Where you can attend a yoga class, go tanning and float down a lazy river all before lunch.Where your kids can paint the town red, and blue, catch a wave or two and play to their, and your heart's content. This is the community you never knew you needed, and more.",
  },
  {
    id: "C8",
    tab: "Emaar",
    name: "Emaar Atlan",
    location: "Dubai Creek Harbour, Dubai",
    config: "1, 2 & 3 Bedroom Apartments",
    price: "1.6 Million AED",
    image: "/assets/E1.jpg",
    rera: "Pre Launch",
    description:
      "Life at Altan is a blissful getaway, where the creek shimmers,the city skyline inspires, and nature invites you to unwind.Glide through calm waters, stroll through vibrant promenades,and find peace in lush gardens. At Altan, home is more thanjust a place—it’s an experience.",
  },
  {
    id: "C9",
    tab: "Emaar",
    name: "Emaar Rivera The Valley",
    location: "The Valley,Dubai",
    config: " 4 Bedroom Townhouse",
    price: "4.5 Million AED",
    image: "/assets/E2.jpg",
    rera: "3174",
    description:
      "Welcome to Rivera, where active and sustainable living come together. Surrounded byparks, beautifully landscaped flower gardens, jogging tracks, and all the amenities of The Valley West at your doorstep, every element brings the outdoors closer.",
  },
  {
    id: "C10",
    tab: "Emaar",
    name: " Emaar Greenspoint",
    location: "Emaar South,Dubai",
    config: "3 & 4 Bedroom Apartments",
    price: "3.5 Million AED",
    image: "/assets/EmaarGreen.jpg",
    rera: "3558",
    description:
      "Greenspoint isn’t just a home—it’s a vibrant community built to keep you moving. Glide through dedicated cycling trails, jog beneath the shade of lush trees, or unwind with your family in the neighbourhood parks. Here, every path leads to a life full of energy and vitality.",
  },
  {
    id: "C11",
    tab: "Binghatti",
    name: "Binghatti Hills View ",
    location: "Arjan, Dubai",
    config: "1 & 2 Bedroom Apartments",
    price: "750K",
    image: "/assets/B1.jpg",
    rera: "3321",
    description:
      "On the talus of progress, a new epitome comes into view. Rise above. Embrace the expanse. At Hill Views, discover a mode of living where ambition thrives as the future unfolds. Here, cutting-edge design syncs with the horizon, creating an environment that thrives at the intersection of community and technology.",
  },
  {
    id: "C12",
    tab: "Binghatti",
    name: "Binghatti Haven",
    location: "Sports City, Dubai",
    config: "1 & 2 Bedroom",
    price: "1.2 Million AED",
    image: "/assets/B2.jpg",
    rera: "3442",
    description:
      "Amid the vibrant pulse of a dynamic district, Haven emerges as a sanctuary of renewal. True to its name, it is a harmonious retreat where the drive for excellence meets serene moments of restoration. Haven is not just a residence, it is a canvas for rejuvenation, a place where life balances between ambition and calm.",
  },
  {
    id: "C13",
    tab: "Binghatti",
    name: "BINGHATTI AQUARISE",
    location: "Business Bay,Dubai",
    config: "1, 2 & 3 Bedrooms",
    price: "1 Million AED",
    image: "/assets/B3.jpg",
    rera: "3585",
    description:
      "Birthed from a tranquil dream of glass and light, Aquarise emerges as an ode to gentle living in the heart of Business Bay. Its graceful façade shimmers beneath and invites you into a realm where time slows, and each breath resonates with possibility. Step inside and discover a serene haven, poised between urban vibrancy and the poetic cadence of flowing water.",
  },
  {
    id: "C14",
    tab: "Binghatti",
    name: "Binghatti Mercedes-Benz Places ",
    location: "Downtown,Dubai",
    config: "2, 3 & 4 Bed",
    price: "10 Million AED",
    image: "/assets/B4.jpg",
    rera: "2545",
    description:
      "Defined as an epochal architectural symbol, the hyper-tower’s design supremacy is brought to life by the amalgamation of multiple design languages. The use of intricate strokes, mingled with the candescent pattern of the Mercedes-Benz three-pointed star create a form that lives and breathes the spirit of revolutionary architecture and craftsmanship.",
  },
];

export default function TabSection({ countryFromURL = "ae" }) {
  const [isOpen, setIsOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("All");
  const [selectedProjectName, setSelectedProjectName] = useState("");
  const [isExpanded, setIsExpanded] = useState({});
  const swiperRef = useRef(null);

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

  const handleOpenModal = (projectName) => {
    swiperRef.current?.autoplay?.stop();
    setSelectedProjectName(projectName);
    setIsOpen(true);
  };

  const handleCloseModal = () => {
    swiperRef.current?.autoplay?.start();
    setIsOpen(false);
  };

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
          <div className="flex flex-wrap space-x-4 mb-6 mt-8 items-center justify-center">
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

        {/* Swiper */}
        <div className="relative">
          <Swiper
            modules={[Navigation, Pagination, Autoplay]}
            spaceBetween={20}
            slidesPerView={1}
            loop={shouldEnableLoop}
            autoplay={{
              delay: 3000,
              disableOnInteraction: false,
            }}
            onSwiper={(swiper) => {
              swiperRef.current = swiper;
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
              <SwiperSlide
                key={proj.id}
                className="!bg-white"
                onMouseEnter={() => swiperRef.current?.autoplay?.stop()}
                onMouseLeave={() => swiperRef.current?.autoplay?.start()}
              >
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
                      <h3 className="text-gray-900 text-[14px] font-black pb-1 mb-2 border-b border-[#ccc]">
                        {proj.name}
                      </h3>

                      <p className="text-gray-900 text-[14px] font-extralight leading-relaxed">
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

                      <div className="pt-4 text-gray-900">
                        <div className="flex flex-col gap-y-3">
                          {[
                            { label: "Rera No.", value: proj.rera },
                            { label: "Location", value: proj.location },
                            { label: "Configuration", value: proj.config },
                            { label: "Starting Price", value: proj.price },
                          ].map(({ label, value }) => (
                            <div
                              key={label}
                              className="border-b text-xs font-extralight pb-[2px] border-gray-300 flex justify-between sm:pr-1"
                            >
                              <span className="font-medium text-gray-900">
                                {label}
                              </span>
                              <span className="text-gray-900 text-right">
                                {value}
                              </span>
                            </div>
                          ))}
                        </div>

                        <div className="flex flex-col gap-3 mt-3">
                          <div className="flex border-b text-xs font-normal text-gray-900 border-gray-300 items-center justify-between">
                            For more details
                            <button
                              onClick={() => handleOpenModal(proj.name)}
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
                              onClick={() => handleOpenModal(proj.name)}
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

          <div className="w-full flex items-center gap-1 ml-4 justify-center mt-4">
            <div className="custom-swiper-pagination"></div>
          </div>
        </div>
      </div>

      {isOpen && (
        <ContactModalForm
          countryFromURL={countryFromURL}
          onClose={handleCloseModal}
          selectedProject={selectedProjectName}
        />
      )}
    </>
  );
}
