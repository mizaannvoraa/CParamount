import { Geist, Geist_Mono } from "next/font/google";
import { GoogleTagManager } from '@next/third-parties/google'; // ✅ Add GTM
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
  title: "Classic Paramount",
  description:
    "We aim to offer comprehensive services, whether it's buying, selling, renting, or managing properties.",
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
