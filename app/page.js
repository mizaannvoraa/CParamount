'use client';

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { pageview } from "@/lib/gtm";

import ContactForm from "@/Components/ContactUs";
import CpAssurance from "@/Components/CpAssurance";
import Overview from "@/Components/Overview";
import ProjectVideo from "@/Components/ProjectVideo";
import Slider from "@/Components/Slider";
import TabSection from "@/Components/TabSection";

import { Poppins } from 'next/font/google';

const poppins = Poppins({
  weight: ['300', '400', '600'],
  subsets: ['latin'],
  display: 'swap',
});

export default function Home() {
  const pathname = usePathname();

  useEffect(() => {
    pageview(pathname);
  }, [pathname]);

  return (
    <>
      <Slider />
      <Overview />
      <TabSection />
      <div className="bg-[#F3F3F3]">
        <CpAssurance />
        <ProjectVideo />
        <ContactForm />
      </div>
    </>
  );
}
