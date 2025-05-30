import { Geist, Geist_Mono } from "next/font/google";
import { GoogleTagManager } from '@next/third-parties/google'; 
import "./globals.css";
import Navbar from "@/Components/Navbar";
import Footer from "@/Components/Footer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Real Estate Dubai | Luxury Villas & Homes in Dubai for Sale",
  description:
    "Explore premium Real Estate Dubai listings, including luxurious Villas in Dubai and modern Homes in Dubai. Find your dream property today!",
    icons: {
     icon: '/favicon.ico',
    shortcut: '/favicon.ico',
    apple: '/favicon.ico',
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`scroll-smooth ${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Navbar />
        {children}
        <Footer />
        <GoogleTagManager gtmId="GTM-P33RNKLV" /> 
      </body>
    </html>
  );
}
