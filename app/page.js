import ContactForm from "@/Components/ContactUs";
import CpAssurance from "@/Components/CpAssurance";
import Disclaimer from "@/Components/Disclaimer";
import Overview from "@/Components/Overview";
import ProjectVideo from "@/Components/ProjectVideo";
import Slider from "@/Components/Slider";
import TabSection from "@/Components/TabSection";
import { Poppins } from 'next/font/google';

import Image from "next/image";
const poppins = Poppins({
  weight: ['300', '400', '600'],
  subsets: ['latin'],
  display: 'swap', // Optional for better performance
});
export default function Home() {
  return (
  <>
  <Slider/>
  <Overview/>
  <TabSection/>
  <div className="bg-[#F3F3F3]">
  <CpAssurance/>
  <ProjectVideo/>
  <ContactForm/>
  </div>
  </>
  );
}
