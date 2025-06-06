'use client';
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { pageview } from "@/lib/gtm";
import ContactForm from "@/Components/ContactUs";
import CpAssurance from "@/Components/CpAssurance";
import Overview from "@/Components/Overview";
import ProjectVideo from "@/Components/ProjectVideo";
import Slider from "@/Components/Slider";
import TabSection from "@/Components/TabSection";
import EnquireNowButton from "@/Components/EnquireNowButton";
import EnquireModal from "@/Components/EnquireModal";
import { Poppins } from 'next/font/google';
import Article from "./Article";
import FAQ from "./FAQ";

const poppins = Poppins({
  weight: ['300', '400', '600'],
  subsets: ['latin'],
  display: 'swap',
});

export default function HomePage({ countryFromURL }) {
  const pathname = usePathname();
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    pageview(pathname); 
  }, [pathname]);

  useEffect(() => {
    // Check if the current path should show the modal
    const shouldShowModal = pathname === '/uk' || pathname === '/canada' || pathname.startsWith('/uk/') || pathname.startsWith('/canada/');
    
    // Only set up the timer if we should show the modal
    if (shouldShowModal) {
      const timer = setTimeout(() => {
        setIsModalOpen(true);
      }, 10000);
      
      return () => clearTimeout(timer);
    }
  }, [pathname]);

  return (
    <div className={poppins.className}>
      <Slider />
      <TabSection countryFromURL={countryFromURL} />
      <Overview />
      <div className="bg-[#F3F3F3]">
        <CpAssurance />
        <ProjectVideo />
        <Article/>
        <FAQ/>
        <ContactForm countryFromURL={countryFromURL} />
      </div>
      <EnquireNowButton countryFromURL={countryFromURL}/>
      <EnquireModal
        countryFromURL={countryFromURL}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </div>
  );
}