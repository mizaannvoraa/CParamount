import Link from "next/link";
import React from "react";
import { FaFacebookF, FaLinkedinIn, FaInstagram } from "react-icons/fa";
import { IoLocationSharp, IoMail, IoCall } from "react-icons/io5";

const Footer = () => {
  return (
    <div className="bg-[#1e293b]">
      <footer className="bg-[#1e293b] text-white py-6 px-4 md:px-20">
        <div className="flex flex-col md:flex-row justify-between items-start gap-8 lg:gap-10 w-full max-w-[1390px] mx-auto">
          {/* Contact Section */}
          <div className="lg:w-[550px] w-full text-start ">
            <h2 className="text-[#f59e0b] text-lg font-semibold mb-4">
              Contact Us
            </h2>
            <div className="flex items-start gap-3 mb-3 justify-start ">
              <IoLocationSharp className="text-[30px] mt-1" />
              <p>
                Address: 1303, Grosvenor Business Tower - Barsha Heights - Dubai
                - United Arab Emirates
              </p>
            </div>
            <div className="flex items-center gap-3 mb-3 justify-start">
              <IoMail className="text-lg" />
              <p>enquires@cparamount.com</p>
            </div>
            <div className="flex items-center gap-3 justify-start">
              <IoCall className="text-lg" />
              <p>+971 56 531 1811</p>
            </div>
          </div>

          {/* Links Section */}
          <div className="flex-1 w-[100%] lg:pl-14 md:text-start ">
            <h2 className="text-[#f59e0b] text-lg font-semibold mb-4 ">
              Links
            </h2>
            <ul className="space-y-2 flex justify-start flex-col">
              <li>
                <a href="#overview" className="hover:underline">
                  Overview
                </a>
              </li>
              <li>
                <a href="#projects" className="hover:underline">
                  Projects
                </a>
              </li>
              <li>
                <a href="#contact" className="hover:underline">
                  Contact Us
                </a>
              </li>
            </ul>
          </div>

          {/* Social Section */}
          <div className="flex-1 w-[100%] md:mb-0 mb-5">
            <h2 className="text-[#f59e0b] text-lg font-semibold mb-4 ">
              Follow Us
            </h2>
            <div className="flex gap-4 ">
              <a
                href="https://www.facebook.com/Cparamount"
                className="bg-[#3b5998] p-3 rounded-full text-white"
              >
                <FaFacebookF />
              </a>
              <a
                href="https://www.linkedin.com/company/classic-paramount-real-estate/"
                className="bg-[#0e76a8] p-3 rounded-full text-white"
              >
                <FaLinkedinIn />
              </a>
              <a
                href="https://www.instagram.com/cparamountre/"
                className="bg-[#e4405f] p-3 rounded-full text-white"
              >
                <FaInstagram />
              </a>
            </div>
          </div>
        </div>
      </footer>
        <div className="border-t md:pb-4 pb-13 border-gray-700 py-4 px-4 text-sm text-gray-300 flex flex-col sm:flex-row items-center justify-center space-y-2 sm:space-y-0 sm:space-x-4 text-center">
      <Link
        href="https://cparamount.com/privacy-policy/"
        className="hover:underline tracking-widest font-medium"
      >
        PRIVACY POLICY
      </Link>
      <span className="hidden sm:inline-block border-l h-4 border-gray-500"></span>
      <p className="tracking-widest font-medium">© 2025 ALL RIGHTS RESERVED</p>
      <span className="hidden sm:inline-block border-l h-4 border-gray-500"></span>
       <Link
        href="/terms-conditions"
        className="hover:underline tracking-widest font-medium uppercase "
      >
        Terms & Conditions
      </Link>
    </div>
    </div>
  );
};

export default Footer;