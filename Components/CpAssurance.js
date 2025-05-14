import Image from "next/image";
import React from "react";
import "animate.css";
import AnimateCard from "./AnimateCard";

const CpAssurance = () => {
  const Cards_data = [
    {
      src: "/assets/Growth.png",
      text: "High Return on Investment",
      alt: "I1",
    },
    {
      src: "/assets/icon_2.png",
      text: "On Time Delivery",
      alt: "I2",
    },
    {
      src: "/assets/Record Breaking.png",
      text: "Trusted Brand with Legacy of Excellence",
      alt: "I3",
    },
    {
      src: "/assets/Under Construction.png",
      text: "Superior Construction Quality",
      alt: "I4",
    },
  ];
  return (
    <>
      <AnimateCard animationClass="animate__zoomInLeft">
        <div className="container mx-auto lg:py-15 py-7 ">
          {/* Text Section  */}
          <div className="text-center mb-10">
            <h2 className="text-[#D2A23A] text-xl md:text-3xl font-extrabold">
              CLASSIC PARAMOUNT ASSURANCE
            </h2>
            <div className="mx-auto mt-2 w-39 h-1 bg-black rounded"></div>
          </div>
          {/* Card Section  */}
          <div className="flex flex-wrap items-center justify-evenly gap-6 px-[6px] lg:py-3 ">
            {Cards_data.map((item, idx) => (
              <div
                key={idx}
                className="bg-white w-full lg:min-h-[230px] lg:max-w-[240px] min-h-[220px] max-w-[220px] lg:px-2 px-2 py-2 rounded-[13px] shadow-lg flex flex-col items-center justify-center transition-transform duration-300 hover:transform hover:-translate-y-3"
                style={{
                  boxShadow:
                    "rgba(0, 0, 0, 0.07) 0px 1px 2px, rgba(0, 0, 0, 0.07) 0px 2px 4px, rgba(0, 0, 0, 0.07) 0px 4px 8px, rgba(0, 0, 0, 0.07) 0px 8px 16px, rgba(0, 0, 0, 0.07) 0px 16px 32px, rgba(0, 0, 0, 0.07) 0px 32px 64px",
                }}
              >
                <Image
                  className="object-cover w-[110px] "
                  src={item.src}
                  width={100}
                  height={100}
                  alt={item.alt}
                />
                <p className="text-black text-[14px] font-bold text-center py-4">
                  {item.text}
                </p>
              </div>
            ))}
          </div>
          {/* Card section Ends  */}
        </div>
      </AnimateCard>
    </>
  );
};

export default CpAssurance;
