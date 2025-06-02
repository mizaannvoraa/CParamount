import React, { useState } from "react";
import AnimateCard from "./AnimateCard";

const articles = [
  {
    id: 1,
    title:"Key Advantages of Investing in Dubai Real Estate",
    points: [
      {
        title: "Strategic Location",
        content:
          "Dubai connects the East and West, offering unmatched access to international trade and business hubs.",
      },
      {
        title: "Tax-Free Investment",
        content:
          "No property or capital gains taxes make Dubai a highly attractive investment destination.",
      },
      {
        title: "High ROI",
        content:
          "With rental yields between 5-9%, properties in Dubai offer excellent returns.",
      },
      {
        title: "World-Class Infrastructure",
        content:
          "Dubai is known for advanced transportation, top-tier healthcare, and globally ranked education facilities.",
      },
    ],
  },
  {
    id: 2,
    title: "Top Villa Communities in Dubai",
    points: [
      {
        title: "Palm Jumeirah",
        content:
          "Iconic beachfront villas with stunning views and luxurious amenities on a palm-shaped island.",
      },
      {
        title: "Emirates Hills",
        content:
          "The 'Beverly Hills of Dubai' features exclusive villas with private gardens and golf views.",
      },
      {
        title: "Al Furjan",
        content:
          "Family-friendly and spacious homes at affordable prices, perfect for residents and investors alike.",
      },
    ],
  },
  {
    id: 3,
    title: "Types of Homes in Dubai",
    points: [
      {
        title: "Apartments",
        content:
          "From studios to penthouses, Dubai offers diverse apartments for every lifestyle and budget.",
      },
      {
        title: "Townhouses",
        content:
          "Popular with families, townhouses balance space, comfort, and affordability.",
      },
      {
        title: "Villas",
        content:
          "Villas provide luxurious living with privacy, pools, and landscaped gardens.",
      },
    ],
  },
  {
    id: 4,
    title: "Other Investment Highlights",
    points: [
      {
        title: "Off-Plan Projects",
        content:
          "Benefit from competitive prices, flexible payment plans, and developer incentives on new builds.",
      },
      {
        title: "Legal Considerations",
        content:
          "RERA-regulated agents and transparency laws protect investors and ensure smooth transactions.",
      },
    ],
  },
];

export default function Article() {
  const [expanded, setExpanded] = useState(false);

  // Flatten all points under each article heading
  const allPoints = articles.flatMap(article => [
    { type: 'title', title: article.title },
    ...article.points.map(point => ({
      type: 'point',
      title: point.title,
      content: point.content,
    })),
  ]);

  const pointsToShow = expanded ? allPoints : allPoints.slice(0, 5);

  return (
    <AnimateCard animationClass="animate__fadeIn">
    <div className="container mx-auto px-4 py-10 max-w-[1080px]">
      <div className="text-center mb-3 md:mb-10">
        <h2 className="text-[#D2A23A] text-xl md:text-3xl font-bold">
          Why Invest in Dubai Real Estate?
        </h2>
        <div className="mx-auto mt-2 w-20 h-1 bg-black rounded"></div>
      </div>

      <div className="px-2 md:px-6 py-1 md:py-3 border rounded-lg shadow-sm bg-white">
        <ul className="space-y-1 md:space-y-3">
          {pointsToShow.map((item, index) => (
            item.type === 'title' ? (
              <li key={`title-${index}`} className="text-lg font-semibold text-gray-800 mt-3">
                {item.title}
              </li>
            ) : (
              <li key={`point-${index}`}>
                <strong>{item.title}:</strong> {item.content}
              </li>
            )
          ))}
        </ul>

        <div className="text-center md:my-1 my-3">
          <button
            className="md:px-6 px-3 md:py-2 py-1 bg-[#D2A23A] cursor-pointer text-white rounded hover:bg-yellow-700 transition"
            onClick={() => setExpanded(!expanded)}
          >
            {expanded ? "Read Less" : "Read More"}
          </button>
        </div>
      </div>
    </div>
    </AnimateCard>
  );
}
