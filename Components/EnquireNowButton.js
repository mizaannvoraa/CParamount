// EnquireNowButton.js
"use client";

import React, { useState } from "react";
import { IoMdCall } from "react-icons/io";
import EnquireModal from "./EnquireModal";

const EnquireNowButton = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  return (
    <>
      {/* Modal */}
      <EnquireModal isOpen={isModalOpen} onClose={closeModal} />

      {/* Desktop Button */}
      <button
        onClick={openModal}
        className="hidden md:flex fixed bottom-4 right-4 z-50 bg-[#d5a13f] text-white font-semibold py-2 px-4 rounded-md items-center shadow-lg hover:bg-[#c9962a] transition-all duration-300"
      >
        <svg
          className="w-5 h-5 mr-2"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M12 20h9M16.5 3.5a2.121 2.121 0 013 3L7 19l-4 1 1-4L16.5 3.5z"
          />
        </svg>
        Enquire Now
      </button>

      {/* Mobile Bar */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 z-50 flex">
        <a
          href="tel:+971565311811"
          className="flex-1 bg-[#b5851c] text-white py-[10px] flex justify-center items-center text-base font-extralight border-r border-white"
        >
          <IoMdCall className="text-xl mr-2" />
          Call Now
        </a>
        <button
          onClick={openModal}
          className="flex-1 bg-[#b5851c] text-white py-[10px] flex justify-center items-center text-base font-extralight"
        >
          <svg
            className="w-5 h-5 mr-2"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 20h9M16.5 3.5a2.121 2.121 0 013 3L7 19l-4 1 1-4L16.5 3.5z"
            />
          </svg>
          Enquire Now
        </button>
      </div>
    </>
  );
};

export default EnquireNowButton;
