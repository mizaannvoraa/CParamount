"use client"

import { useState, useRef, useCallback } from "react"
import { Swiper, SwiperSlide } from "swiper/react"
import { Autoplay } from "swiper/modules"
import "swiper/css"
import "swiper/css/autoplay"
import Image from "next/image"
import { ChevronLeft, ChevronRight } from "lucide-react"
import ContactModalForm from "./Modal"

const tabs = ["All", "Sobha", "Damac", "Emaar", "Binghatti"]

const projects = [
  {
    id: "B1",
    tab: "Sobha",
    name: "Sobha Aquamont",
    alt:'Modern Villa in Palm Jumeirah - Villas in Dubai',
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
    alt:'Spacious Family Home in Al Furjan - Homes in Dubai',
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
    alt:'Skyline View Apartment - Real Estate Dubai',
    location: "JLT, Dubai",
    config: " 1,1.5,2 & 3 Bed",
    price: "1.5 Million AED",
    image: "/assets/Sobha Jlt.jpg",
    rera: "Pre Launch",
    description:
      "Set along Sheikh Zayed Road, Sobha Central sits at the intersection of movement, meaning, and modernity. With the Dubai skyline as your backdrop and the city's pulse at your doorstep, this address redefines what it means to live in the centre of it all. Designed for those who seek balance—between work and home, pace and pause—it o ers direct access to business hubs, retail districts, and the vibrant energy of urban life.",
  },
  {
    id: "C4",
    tab: "Damac",
    name: "Damac island",
    alt:'Luxury villa with private pool in Emirates Hills – Villas in Dubai',
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
    alt:'Family-friendly townhouse in Arabian Ranches – Homes in Dubai',
    location: "Maritime City (DMC), Dubai",
    config: "1, 2 & 3 Bedrooms",
    price: "2.17 Million AED",
    image: "/assets/D2.jpg",
    rera: "3719",
    description:
      "The towers are a distillation of Chelsea's very essence - their passion, pride as well as purpose and brought to life in the most luxuriously timeless way possible. Each of the towers blurs the line between contemporary urban and indulgent, waterfront resort-style living like never before.",
  },
  {
    id: "C6",
    tab: "Damac",
    name: "Damac la Violet 4",
    alt:'Modern real estate development in Downtown Dubai – Real Estate Dubai',
    location: "DAMAC Hills 2,Dubai",
    config: "4 Bed Townhouse",
    price: "1.9 Million AED",
    image: "/assets/damacviolet.jpg",
    rera: "2354",
    description:
      "Violet 4 is part of a community where every moment becomes a lasting memory. Where you can attend a yoga class, go tanning and float down a lazy river all before lunch.Where your kids can paint the town red, and blue, catch a wave or two and play to their, and your heart's content. This is the community you never knew you needed, and more.",
  },
  {
    id: "C8",
    tab: "Emaar",
    name: "Emaar Atlan",
    alt:'Spacious 5-bedroom villa exterior shot – Villas in Dubai',
    location: "Dubai Creek Harbour, Dubai",
    config: "1, 2 & 3 Bedroom Apartments",
    price: "1.6 Million AED",
    image: "/assets/E1.jpg",
    rera: "Pre Launch",
    description:
      "Life at Altan is a blissful getaway, where the creek shimmers,the city skyline inspires, and nature invites you to unwind.Glide through calm waters, stroll through vibrant promenades,and find peace in lush gardens. At Altan, home is more thanjust a place—it's an experience.",
  },
  {
    id: "C9",
    tab: "Emaar",
    name: "Emaar Rivera The Valley",
    alt:'Open-plan living room with skyline views – Homes in Dubai',
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
    alt:'Night view of Dubai Marina apartments – Real Estate Dubai',
    location: "Emaar South,Dubai",
    config: "3 & 4 Bedroom Apartments",
    price: "3.5 Million AED",
    image: "/assets/EmaarGreen.jpg",
    rera: "3558",
    description:
      "Greenspoint isn't just a home—it's a vibrant community built to keep you moving. Glide through dedicated cycling trails, jog beneath the shade of lush trees, or unwind with your family in the neighbourhood parks. Here, every path leads to a life full of energy and vitality.",
  },
  {
    id: "C11",
    tab: "Binghatti",
    name: "Binghatti Hills View ",
    alt:'Elegant master bedroom in Palm Jumeirah villa – Villas in Dubai',
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
    alt:'New residential community aerial view – Homes in Dubai',
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
    alt:'Luxury real estate brochure mockup – Real Estate Dubai marketing',
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
    alt:'Home buyer exploring property listing online – Real Estate Dubai search',
    location: "Downtown,Dubai",
    config: "2, 3 & 4 Bed",
    price: "10 Million AED",
    image: "/assets/B4.jpg",
    rera: "2545",
    description:
      "Defined as an epochal architectural symbol, the hyper-tower's design supremacy is brought to life by the amalgamation of multiple design languages. The use of intricate strokes, mingled with the candescent pattern of the Mercedes-Benz three-pointed star create a form that lives and breathes the spirit of revolutionary architecture and craftsmanship.",
  },
];


export default function TabSection({ countryFromURL = "ae" }) {
  const [isOpen, setIsOpen] = useState(false)
  const [activeTab, setActiveTab] = useState("All")
  const [selectedProjectName, setSelectedProjectName] = useState("")
  const [isExpanded, setIsExpanded] = useState({})
  const [isLoading, setIsLoading] = useState(false)
  const [autoplayPaused, setAutoplayPaused] = useState(false) // Track autoplay state
  const swiperRef = useRef(null)

  const filteredProjects = activeTab === "All" ? projects : projects.filter((proj) => proj.tab === activeTab)

  // Function to pause autoplay
  const pauseAutoplay = useCallback(() => {
    if (swiperRef.current?.autoplay) {
      swiperRef.current.autoplay.stop()
      setAutoplayPaused(true)
    }
  }, [])

  // Function to resume autoplay
  const resumeAutoplay = useCallback(() => {
    if (swiperRef.current?.autoplay) {
      swiperRef.current.autoplay.start()
      setAutoplayPaused(false)
    }
  }, [])

  const toggleDescription = useCallback((projectId) => {
    // Pause autoplay when expanding description
    if (!isExpanded[projectId]) {
      pauseAutoplay()
    } else {
      // Resume autoplay when collapsing description
      resumeAutoplay()
    }
    
    setIsExpanded((prev) => ({
      ...prev,
      [projectId]: !prev[projectId],
    }))
  }, [isExpanded, pauseAutoplay, resumeAutoplay])

  const handleOpenModal = useCallback((projectName) => {
    // Pause autoplay when opening modal
    pauseAutoplay()
    setSelectedProjectName(projectName)
    setIsOpen(true)
  }, [pauseAutoplay])

  const handleCloseModal = useCallback(() => {
    // Resume autoplay when modal closes
    setTimeout(() => {
      resumeAutoplay()
    }, 100)
    setIsOpen(false)
  }, [resumeAutoplay])

  const handleTabChange = useCallback((tab) => {
    setIsLoading(true)
    setActiveTab(tab)
    // Reset expanded states when changing tabs
    setIsExpanded({})
    // Resume autoplay when changing tabs
    resumeAutoplay()

    // Simulate loading to prevent layout shifts
    setTimeout(() => {
      setIsLoading(false)
    }, 100)
  }, [resumeAutoplay])

  // Ensure we have enough slides for smooth operation
  const shouldEnableLoop = filteredProjects.length > 1
  const slidesToShow = Math.min(filteredProjects.length, 3)

  return (
    <>
      <div className="max-w-7xl mx-auto px-4 md:pt-12 pt-6 bg-white" id="projects">
        <div className="text-center">
          <h2 className="text-[#D2A23A] mt-4 text-2xl md:text-3xl font-extrabold">PROJECTS</h2>
          <div className="mx-auto mt-[1px] w-19 lg:w-29 h-1 bg-black rounded"></div>
        </div>

        {/* Tabs */}
        <div className="flex flex-wrap gap-2 mb-6 mt-8 items-center justify-center">
          {tabs.map((tab) => (
            <button
              key={tab}
              onClick={() => handleTabChange(tab)}
              disabled={isLoading}
              className={`px-6 py-2 rounded-[5px] border transition-all duration-200 ${
                activeTab === tab
                  ? "bg-transparent text-[#b6800c] border-2 border-[#D09E32]"
                  : "bg-[#D09E32] border-0 text-white hover:bg-[#b6800c]"
              } ${isLoading ? "opacity-50 cursor-not-allowed" : "cursor-pointer"}`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Loading State */}
        {isLoading && (
          <div className="flex justify-center items-center py-12">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#D09E32]"></div>
          </div>
        )}

        {/* Swiper Container with Fixed Height to Prevent CLS */}
        {!isLoading && (
          <div className="relative" style={{ minHeight: "600px" }}>
            {filteredProjects.length > 0 ? (
              <>
                <Swiper
                  modules={[ Autoplay]}
                  spaceBetween={20}
                  slidesPerView={1}
                  loop={filteredProjects.length > 1}
                  autoplay={{
                    delay: 3000,
                    disableOnInteraction: false,
                    pauseOnMouseEnter: false,
                    waitForTransition: true,
                  }}
                  speed={600}
                  onSwiper={(swiper) => {
                    swiperRef.current = swiper
                  }}
                  onSlideChange={() => {
                    // Only restart autoplay if it's not intentionally paused
                    if (!autoplayPaused && swiperRef.current?.autoplay) {
                      swiperRef.current.autoplay.start()
                    }
                  }}
                 
                  breakpoints={{
                    640: { slidesPerView: 1 },
                    768: { slidesPerView: Math.min(2, slidesToShow) },
                    1024: { slidesPerView: Math.min(3, slidesToShow) },
                  }}
                  className="mySwiper pb-12"
                >
                  {filteredProjects.map((proj) => (
                    <SwiperSlide key={proj.id} className="!bg-white">
                      <div className="bg-white shadow-xl rounded-lg overflow-hidden h-full">
                        {/* Fixed height image container to prevent CLS */}
                        <div className="relative w-full h-48 bg-gray-100">
                          <Image
                            src={proj.image || "/placeholder.svg"}
                            alt={proj.alt}
                            fill
                            sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                            className="object-cover"
                            priority={activeTab === "All" || proj.tab === activeTab}
                          />
                        </div>

                        <div className="px-2 py-1">
                          <h3 className="text-gray-900 text-lg font-bold pb-1 mb-1 border-b border-gray-200">
                            {proj.name}
                          </h3>

                          {/* Fixed height description container to prevent CLS */}
                          <div className="" style={{ minHeight: "100px" }}>
                            <p className="text-gray-700 text-sm leading-relaxed">
                              {isExpanded[proj.id] ? proj.description : `${proj.description.slice(0, 130)}...`}
                            </p>

                            <button
                              className="text-[#D09E32] font-semibold text-sm mt-2 hover:underline focus:outline-none transition-colors"
                              onClick={() => toggleDescription(proj.id)}
                            >
                              {isExpanded[proj.id] ? "Read less" : "Read more"}
                            </button>
                          </div>

                          <div className="space-y-1">
                            {[
                              { label: "Rera No.", value: proj.rera },
                              { label: "Location", value: proj.location },
                              { label: "Configuration", value: proj.config },
                              { label: "Starting Price", value: proj.price },
                            ].map(({ label, value }) => (
                              <div
                                key={label}
                                className="flex justify-between items-center py-1 border-b border-gray-200 text-sm"
                              >
                                <span className="font-medium text-gray-900">{label}</span>
                                <span className="text-gray-700 text-right">{value}</span>
                              </div>
                            ))}
                          </div>

                          <div className="mt-2 space-y-3">
                            <div className="flex justify-between items-center">
                              <span className="text-sm font-medium text-gray-900">For more details</span>
                              <button
                                onClick={() => handleOpenModal(proj.name)}
                                className="bg-[#D09E32] text-white px-4 py-1 text-sm rounded hover:bg-[#b6800c] transition-colors"
                              >
                                Click Here
                              </button>
                            </div>

                            <div className="flex justify-between items-center">
                              <span className="text-sm font-medium text-gray-900">Download Brochure</span>
                              <button
                                onClick={() => handleOpenModal(proj.name)}
                                className="bg-[#D09E32] text-white px-4 py-1 text-sm rounded hover:bg-[#b6800c] transition-colors"
                              >
                                Click Here
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </SwiperSlide>
                  ))}
                </Swiper>
              </>
            ) : (
              <div className="flex flex-col items-center justify-center py-12">
                <div className="text-gray-500 text-lg mb-4">No projects found for this category</div>
                <button
                  onClick={() => handleTabChange("All")}
                  className="bg-[#D09E32] text-white px-6 py-1 rounded hover:bg-[#b6800c] transition-colors"
                >
                  View All Projects
                </button>
              </div>
            )}
          </div>
        )}
      </div>

      {isOpen && (
        <ContactModalForm
          countryFromURL={countryFromURL}
          onClose={handleCloseModal}
          selectedProject={selectedProjectName}
        />
      )}
    </>
  )
}