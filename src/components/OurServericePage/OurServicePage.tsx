/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import { FaLongArrowAltRight } from "react-icons/fa";
const services = [
  {
    name: "Digital PR",
    img: "https://images.unsplash.com/photo-1504711434969-e33886168f5c?w=400&h=240&fit=crop",
  },
  {
    name: "Search & Growth Strategy",
    img: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400&h=240&fit=crop",
  },
  {
    name: "Data & Insights",
    img: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400&h=240&fit=crop",
  },
  {
    name: "Organic Social & Content",
    img: "https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?w=400&h=240&fit=crop",
  },
  {
    name: "Content Experience",
    img: "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?w=400&h=240&fit=crop",
  },
  {
    name: "Onsite SEO",
    img: "https://images.unsplash.com/photo-1432888498266-38ffec3eaf0a?w=400&h=240&fit=crop",
  },
];

export default function ButtonStyleHoverPage() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  const renderService = (service: any, index: number) => {
    const isHovered = hoveredIndex === index;

    return (
      <div
        key={service.name}
        className="relative py-8 border-b border-black/20 group hover:border-transparent"
      >
        <div
          className="flex items-center justify-between cursor-pointer relative"
          onMouseEnter={() => setHoveredIndex(index)}
          onMouseLeave={() => setHoveredIndex(null)}
        >
          {/* TEXT + LEFT ICON */}
          <div className="flex items-center gap-3 z-20">
            {/* ICON */}
            <span
              className={`${
                isHovered
                  ? "opacity-100 translate-x-0"
                  : "opacity-0 -translate-x-3"
              } text-white transition-all duration-300`}
            >
              <FaLongArrowAltRight
                size={40}
                className="-rotate-45 transition-transform duration-300"
              />
            </span>

            {/* TEXT */}
            <span
              className={`text-5xl font-black transition-all duration-300 ${
                isHovered
                  ? "text-white translate-x-2"
                  : "text-black/80 translate-x-0"
              }`}
              style={{ fontFamily: "'Arial Black', sans-serif" }}
            >
              {service.name}
            </span>
          </div>

          {/* IMAGE PILL */}
          <div
            className={`absolute left-0 top-1/2 -translate-y-1/2 h-[110px] rounded-full overflow-hidden shadow-xl pointer-events-none z-10 ${
              isHovered ? "w-full opacity-100" : "w-0 opacity-0"
            } `}
          >
            <img
              src={service.img}
              alt={service.name}
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-[#f0efeb] px-12 py-20 overflow-hidden">
      {/* HEADER */}
      <div className="flex items-end justify-between mb-16">
        <h2 className="text-7xl font-black uppercase leading-none">
          Our <br />
          <span className="text-gray-400">Services</span>
        </h2>

        <a
          href="#"
          className="group relative bg-white border border-black rounded-full px-8 py-4 overflow-hidden block"
        >
          <div className="relative flex flex-col h-5 overflow-hidden font-bold text-sm">
            <span className="transition-transform duration-500 group-hover:-translate-y-full">
              VIEW ALL SERVICES →
            </span>
            <span className="absolute top-full transition-transform duration-500 group-hover:-translate-y-full">
              VIEW ALL SERVICES →
            </span>
          </div>
        </a>
      </div>

      {/* GRID */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-24">
        <div>{services.slice(0, 3).map((s, i) => renderService(s, i))}</div>
        <div>{services.slice(3, 6).map((s, i) => renderService(s, i + 3))}</div>
      </div>
    </div>
  );
}
