import React, { useState } from "react";
import Head from "next/head";
import AnimateCard from "./AnimateCard";

const faqs = [
  {
    question: "What are the benefits of investing in Real Estate Dubai?",
    answer:
      "Investing in Real Estate Dubai offers tax-free income, high rental yields, and a stable economy, making it an attractive option for both local and international investors.",
  },
  {
    question: "Are there financing options available for Villas in Dubai?",
    answer:
      "Yes, various banks and financial institutions offer mortgage solutions for purchasing Villas in Dubai, subject to eligibility criteria.",
  },
  {
    question: "Can foreigners buy Homes in Dubai?",
    answer:
      "Absolutely. Dubai has designated freehold areas where foreigners can purchase Homes in Dubai with full ownership rights.",
  },
  {
    question: "What is the average price of Villas in Dubai?",
    answer:
      "Prices vary based on location and amenities, but Villas in Dubai typically range from AED 2 million to AED 30 million.",
  },
  {
    question: "How do I ensure the legitimacy of a real estate deal in Dubai?",
    answer:
      "Always work with RERA-registered agents and verify property details through the Dubai Land Department to ensure a secure transaction.",
  },
  {
    question: "What are off-plan properties?",
    answer:
      "Off-plan properties are developments that are under construction or in the planning stages, allowing buyers to invest at lower prices before completion.",
  },
  {
    question: "Are there any additional costs when buying Homes in Dubai?",
    answer:
      "Yes, buyers should account for registration fees, agency commissions, and maintenance charges when purchasing Homes in Dubai.",
  },
  {
    question: "What is the process of buying Villas in Dubai?",
    answer:
      "The process involves selecting a property, signing a sales agreement, paying a deposit, and registering the property with the Dubai Land Department.",
  },
  {
    question: "Can I rent out my property in Dubai?",
    answer:
      "Yes, property owners can lease their Homes in Dubai, subject to local regulations and obtaining the necessary permits.",
  },
  {
    question: "How does the rental yield in Dubai compare globally?",
    answer:
      "Dubai offers competitive rental yields, often higher than global averages, making Real Estate Dubai a lucrative investment.",
  },
];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState(null);
  const [showAll, setShowAll] = useState(false);
  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": faqs.map((faq) => ({
      "@type": "Question",
      "name": faq.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": faq.answer,
      },
    })),
  };
  const visibleFaqs = showAll ? faqs : faqs.slice(0, 4);
  return (
    <>
      <Head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
        />
      </Head>
          <AnimateCard animationClass="animate__zoomIn">
      <div className="container mx-auto px-4 py-1 md:py-10 max-w-[920px]">
        <div className="text-center mb-5 md:mb-10">
          <h2 className="text-[#D2A23A] text-xl md:text-3xl font-bold">
            Frequently Asked Questions (FAQs)
          </h2>
          <div className="mx-auto mt-2 w-20 h-1 bg-black rounded"></div>
        </div>
        <div className="space-y-2 md:space-y-4">
          {visibleFaqs.map((faq, index) => (
            <div
              key={index}
              className="border border-gray-200 rounded-lg p-2 md:p-4 shadow-sm bg-white"
            >
              <button
                className="w-full text-left font-medium text-gray-800 flex justify-between items-center"
                onClick={() => toggleFAQ(index)}
              >
                <span>{faq.question}</span>
                <span className="ml-2 text-xl cursor-pointer">
                  {openIndex === index ? "−" : "+"}
                </span>
              </button>
              {openIndex === index && (
                <p className="mt-3 text-gray-600">{faq.answer}</p>
              )}
            </div>
          ))}
        </div>

        {faqs.length > 4 && (
          <div className="text-center mt-6">
            <button
              onClick={() => setShowAll(!showAll)}
 className="md:px-6 px-3 md:py-2 py-1 bg-[#D2A23A] cursor-pointer text-white rounded hover:bg-yellow-700 transition"            >
              {showAll ? "Read Less" : "Read More"}
            </button>
          </div>
        )}
      </div></AnimateCard>
    </>
  );
}
