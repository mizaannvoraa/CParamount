"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { FiMenu, FiX } from "react-icons/fi";

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [hasMounted, setHasMounted] = useState(false);

  useEffect(() => {
    setHasMounted(true);
  }, []);

  const toggleMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen);

  const navItems = [
    { label: "Overview", href: "#overview" },
    { label: "Projects", href: "#projects" },
    { label: "Contact Us", href: "#contact" },
  ];

  if (!hasMounted) return null; // Prevent hydration mismatch

  return (
    <nav className="bg-white sticky top-0 z-50">
      <div className="container mx-auto flex items-center justify-between md:justify-around px-4 py-2">
        {/* Logo Section */}
        <div>
          <Link href="/" scroll={true}>
            <Image
              src="/assets/TrialLogo.png"
              width={100}
              height={100}
              alt="Logo L&T"
              className="md:w-[115px] w-[95px]  h-auto"
              priority
            />
          </Link>
        </div>

        {/* Desktop Nav */}
        <div className="hidden md:flex gap-8 text-[#D2A33C] text-[15px] uppercase font-bold font-sans">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="cursor-pointer hover:text-[#b28527] transition-colors duration-200"
            >
              {item.label}
            </Link>
          ))}
        </div>

        {/* Mobile Menu Button */}
        <div className="md:hidden">
          <button
            onClick={toggleMenu}
            aria-label="Toggle Menu"
            className="p-2 focus:outline-none"
          >
            <FiMenu size={28} className="text-[#D2A33C]" />
          </button>
        </div>
      </div>

      {/* Sliding Mobile Menu */}
      <div
        className={`
          fixed top-0 right-0 h-full w-64 bg-white shadow-lg z-50
          transform transition-transform duration-300 ease-in-out
          ${isMobileMenuOpen ? "translate-x-0" : "translate-x-full"}
        `}
      >
        <div className="flex justify-end p-2">
          <button
            onClick={toggleMenu}
            aria-label="Close Menu"
            className="p-2 focus:outline-none"
          >
            <FiX size={28} className="text-[#D2A33C]" />
          </button>
        </div>
        <div className="flex flex-col px-4 py-2 gap-6 text-[#D2A33C] text-[14px] uppercase font-bold font-sans">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setIsMobileMenuOpen(false)}
              className="cursor-pointer hover:text-[#b28527] transition-colors duration-200"
            >
              {item.label}
            </Link>
          ))}
        </div>
      </div>

      {/* Backdrop for mobile menu */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-40 md:hidden" onClick={toggleMenu} />
      )}
    </nav>
  );
};

export default Navbar;
