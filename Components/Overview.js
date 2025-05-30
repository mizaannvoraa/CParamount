// Overview.jsx
import React from "react";
import Counter from "./Counter";
import "animate.css";
import AnimateCard from "./AnimateCard";
import Image from "next/image";
const Overview = () => {
  return (
    <div className="bg-[#F7F7F7]" id="overview">
      <div className="container mx-auto px-1 py-6 lg:py-12 ">
        <div className="text-center">
          <h1 className="text-[#D2A23A] mt-4 mb-[6px] text-2xl md:text-3xl font-extrabold">
            Discover Prime Real Estate Opportunities in Dubai
          </h1>
          <div className="mx-auto mt-[1px] w-16 lg:w-29 h-1 bg-black rounded"></div>
        </div>

        <div className="max-w-[1190px] mx-auto flex flex-col lg:flex-row items-center mt-6 lg:mt-10 gap-6 lg:gap-2">
  <div className="w-full lg:w-1/2 px-2 flex items-center justify-center">
    <AnimateCard animationClass="animate__backInLeft">
      <Image src='/assets/overview_image.jpg' width={1000} height={500} alt="overview_image" className="w-full h-[320px]"/>
    </AnimateCard>
  </div>

  <div className="w-full lg:w-1/2 px-2">
    <AnimateCard animationClass="animate__backInRight">
      <div className="flex tracking-[1px] text-[17px] text-[#414141] items-start ">
      <p>Welcome to New Projects Dubai, your premier destination for exploring the latest Real Estate Dubai offerings. Whether  you&apos;re seeking luxurious Villas in Dubai or contemporary Homes in Dubai, our platform provides comprehensive listings and insights to help you find your dream property.
</p>

      </div>
    </AnimateCard>
  </div>
</div>



        {/* Counter Section */}
        <section className="lg:py-15 py-10">
             <AnimateCard animationClass="animate__fadeInUp">
          <div className=" max-w-7xl mx-auto grid grid-cols-1 gap-15 lg:grid-cols-4 lg:gap-8 text-center animate__animated animate__fadeInUp">
            <div className="transition-transform duration-300 hover:transform hover:-translate-y-3">
              <h2 className="lg:text-4xl text-[55px] mb-0 lg:mb-7 font-black text-yellow-600">
                <Counter end={34} suffix=" +" />
              </h2>
              <p className="lg:mt-2 mt-0 lg:text-base text-[14px] text-gray-700">
                GROSS ASSET VALUE
              </p>
            </div>

            <div className="transition-transform duration-300 hover:transform hover:-translate-y-3">
              <h2 className="lg:text-4xl text-[55px] mb-0 lg:mb-7 font-black text-yellow-600">
                <Counter end={11} suffix=" +" />
              </h2>
              <p className="lg:mt-2 mt-0 lg:text-base text-[14px]  text-gray-700">
                YEARS IN BUSINESS
              </p>
            </div>
            <div className="transition-transform duration-300 hover:transform hover:-translate-y-3">
              <h2 className="lg:text-4xl text-[55px] mb-0 lg:mb-7 font-black text-yellow-600">
                <Counter end={350} suffix=" +" />
              </h2>
              <p className="lg:mt-2 mt-0 lg:text-base text-[14px]  text-gray-700">
                ASSETS OWNED / OPERATED
              </p>
            </div>
            <div className="transition-transform duration-300 hover:transform hover:-translate-y-3">
              <h2 className="lg:text-4xl text-[55px] mb-0 lg:mb-7 font-black text-yellow-600">
                <Counter end={100} suffix=" +" />
              </h2>
              <p className="lg:mt-2 mt-0 lg:text-base text-[14px]  text-gray-700">
                EMPLOYEES
              </p>
            </div>
          </div>
          </AnimateCard>
        </section>
      </div>
    </div>
  );
};

export default Overview;
