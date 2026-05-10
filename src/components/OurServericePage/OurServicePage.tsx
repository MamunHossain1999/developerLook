/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import { FiArrowUpRight } from "react-icons/fi";

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
        className="relative py-6 md:py-8 border-b border-black/20 group hover:border-transparent"
      >
        <div
          className="flex items-center justify-between cursor-pointer relative"
          onMouseEnter={() => setHoveredIndex(index)}
          onMouseLeave={() => setHoveredIndex(null)}
        >
          {/* TEXT + ICON */}
          <div className="flex items-center gap-3 z-20">
            <span
              className={`${
                isHovered
                  ? "opacity-100 translate-x-0"
                  : "opacity-0 -translate-x-3"
              } text-white transition-all duration-300 hidden lg:block`}
            >
              <FiArrowUpRight size={36} className="-rotate-5 pl-1" />
            </span>

            {/* MOBILE IMAGE (always visible) */}
            <img
              src={service.img}
              alt={service.name}
              className="w-12 h-12 object-cover rounded-xl lg:hidden"
            />

            <span
              className={`text-2xl sm:text-4xl lg:text-5xl font-black transition-all duration-300 ${
                isHovered
                  ? "text-white translate-x-2"
                  : "text-black/80 translate-x-0"
              }`}
              style={{ fontFamily: "'Arial Black', sans-serif" }}
            >
              {service.name}
            </span>
          </div>

          {/* DESKTOP HOVER IMAGE */}
          <div
            className={`absolute left-0 top-1/2 -translate-y-1/2 h-[90px] sm:h-[110px] rounded-full overflow-hidden shadow-xl pointer-events-none z-10  hidden lg:block ${
              isHovered ? "w-full opacity-100" : "w-0 opacity-0"
            }`}
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
    <div className="bg-[#f0efeb] px-4 sm:px-8 lg:px-2 py-12 sm:py-16 lg:py-3 overflow-hidden">
      <div className="flex justify-center mb-12 lg:mb-1">
        <a
          href="#"
          className="group relative w-full lg:w-fit bg-white rounded-full hover:rounded-2xl px-6 sm:px-8 py-3 sm:py-4 overflow-hidden"
        >
          {/* TEXT WRAPPER */}
          <div className="relative flex flex-col h-5 justify-center items-center overflow-hidden font-bold text-xs sm:text-sm text-center">
            {/* TOP */}
            <span className="transition-transform duration-500 group-hover:-translate-y-full flex items-center justify-center gap-1 w-full text-center">
              Explore Our Work
              <FiArrowUpRight className="text-base -rotate-5" />
            </span>

            {/* BOTTOM */}
            <span className="absolute top-full w-full flex items-center justify-center gap-1 transition-transform duration-500 group-hover:-translate-y-full text-center">
              Explore Our Work
              <FiArrowUpRight className="text-base -rotate-45" />
            </span>
          </div>
        </a>
      </div>
      {/* HEADER */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between border-b pb-4 mb-10 lg:mb-1 gap-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 sm:gap-4">
          {/* MOBILE: Our + image together */}
          <div className="flex items-center gap-2 sm:contents">
            <h2 className="text-4xl sm:text-6xl lg:text-7xl font-black leading-none">
              Our
            </h2>

            <div className="overflow-hidden rounded-xl border border-black/10">
              <img
                src="https://images.unsplash.com/photo-1520975916090-3105956dac38?w=300&h=300&fit=crop"
                alt="services"
                className="w-10 h-10 sm:w-20 sm:h-20 lg:w-16 lg:h-16 object-cover transition-transform duration-500 hover:scale-110"
              />
            </div>
          </div>

          <h2 className="text-4xl sm:text-6xl lg:text-7xl font-black leading-none">
            Services
          </h2>
        </div>

        <a
          href="#"
          className="group relative hidden md:block bg-white  rounded-full hover:rounded-2xl px-6 sm:px-8 py-3 sm:py-4 overflow-hidden w-fit"
        >
          <div className="relative flex flex-col h-5 overflow-hidden font-bold text-xs sm:text-sm">
            <span className="transition-transform duration-500 group-hover:-translate-y-full flex items-center gap-1">
              VIEW ALL SERVICES
              <FiArrowUpRight className="text-base -rotate-5" />
            </span>

            <span className="absolute top-full transition-transform duration-500 group-hover:-translate-y-full flex items-center gap-1">
              VIEW ALL SERVICES
              <FiArrowUpRight className="text-base -rotate-5" />
            </span>
          </div>
        </a>
      </div>

      {/* GRID */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-24">
        <div>{services.slice(0, 3).map((s, i) => renderService(s, i))}</div>
        <div>{services.slice(3, 6).map((s, i) => renderService(s, i + 3))}</div>
      </div>

      {/* MOBILE VIEW ALL SERVICES BUTTON */}
      <div>
        <a
          href="#"
          className="md:hidden block bg-white rounded-full px- py-4 mt-4 w-full text-center font-bold text-sm"
        >
          VIEW ALL SERVICES
          <FiArrowUpRight className="inline-block ml-2 text-base -rotate-5" />
        </a>
      </div>
    </div>
  );
}
