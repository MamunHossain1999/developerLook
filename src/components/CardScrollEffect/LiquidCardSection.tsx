import React, { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { FiArrowUpRight } from "react-icons/fi";

const cards = [
  {
    id: 1,
    title: "Ryan McNamara is Now Rise at Seven",
    img: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?q=80&w=2070",
  },
  {
    id: 2,
    title: "Rise at Seven Appointed by Coneys",
    img: "https://images.unsplash.com/photo-1552664730-d307ca884978?q=80&w=2070",
  },
  {
    id: 3,
    title: "Rise at Seven Appointed by Langtree",
    img: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=2070",
  },
];

const CleanLiquidSection: React.FC = () => {
  const cursorRef = useRef<HTMLDivElement>(null);
  const { contextSafe } = useGSAP();

  // mouse move cursor position update
  const onMouseMove = (e: React.MouseEvent) => {
    gsap.to(cursorRef.current, {
      x: e.clientX,
      y: e.clientY,
      xPercent: -50,
      yPercent: -50,
      duration: 0.2,
      ease: "power2.out",
    });
  };

  // mouse enter - effect will start
  const onHoverEnter = contextSafe((e: React.MouseEvent) => {
    const overlay = e.currentTarget.querySelector(".liquid-overlay");

    // custom cursor will get bigger
    gsap.to("#custom-cursor", { scale: 1, duration: 0.3 });

    // animation: start with opacity 1 and scale up with blur
    gsap.fromTo(
      overlay,
      {
        opacity: 0,
        clipPath: "circle(0% at 50% 100%)",
        backdropFilter: "blur(0px)",
        WebkitBackdropFilter: "blur(0px)",
      },
      {
        opacity: 1,
        clipPath: "circle(130% at 50% 100%)",
        backdropFilter: "blur(18px)",
        WebkitBackdropFilter: "blur(18px)",
        duration: 0.8,
        ease: "power3.inOut",
      },
    );
  });

  // mouse leave - all effects will stop
  const onHoverLeave = contextSafe((e: React.MouseEvent) => {
    const overlay = e.currentTarget.querySelector(".liquid-overlay");

    gsap.to("#custom-cursor", { scale: 0, duration: 0.3 });

    gsap.to(overlay, {
      opacity: 0,
      clipPath: "circle(0% at 50% 100%)",
      backdropFilter: "blur(0px)",
      WebkitBackdropFilter: "blur(0px)",
      duration: 0.6,
      ease: "power3.in",
    });
  });

  return (
    <div
      onMouseMove={onMouseMove}
      className="relative bg-[#f0f0f0]  py-20 overflow-hidden"
    >
      {/* Custom Cursor */}
      <div
        ref={cursorRef}
        id="custom-cursor"
        className="fixed top-0 left-0 w-20 h-20 bg-[#14cfb1] rounded-full pointer-events-none z-50 flex items-center justify-center text-white font-bold text-xs scale-0 shadow-xl"
      >
        <FiArrowUpRight className=" -rotate-5 text-2xl" />
      </div>

      {/* header */}
      <div className="flex flex-col lg:flex-row px-2 lg:items-center justify-between border-b pb-4 mb-10 lg:mb-1 gap-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 sm:gap-4">
          {/* MOBILE: Our + image together */}
          <div className="flex items-center gap-2 sm:contents">
            <h2 className="text-4xl sm:text-6xl lg:text-7xl font-black leading-none">
              What!s
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
            New
          </h2>
        </div>

        <a
          href="#"
          className="group relative hidden md:block bg-white  rounded-full hover:rounded-2xl px-6 sm:px-8 py-3 sm:py-4 overflow-hidden w-fit"
        >
          <div className="relative flex flex-col h-5 overflow-hidden font-bold text-xs sm:text-sm">
            <span className="transition-transform duration-500 group-hover:-translate-y-full flex items-center gap-1">
              Explore More Thoughts
              <FiArrowUpRight className="text-base -rotate-5" />
            </span>

            <span className="absolute top-full transition-transform duration-500 group-hover:-translate-y-full flex items-center gap-1">
              Explore More Thoughts
              <FiArrowUpRight className="text-base -rotate-5" />
            </span>
          </div>
        </a>
      </div>
      <section className="mx-auto px-2 mt-12">
        <div
          className="
    flex gap-4 overflow-x-auto scrollbar-hide
    md:grid md:grid-cols-2
    lg:grid lg:grid-cols-3
  "
        >
          {cards.map((card) => (
            <div
              key={card.id}
              className="group relative min-w-[80%] sm:min-w-[60%] md:min-w-0 cursor-none"
              onMouseEnter={onHoverEnter}
              onMouseLeave={onHoverLeave}
            >
              {/* Image */}
              <div className="relative aspect-[4/5] overflow-hidden rounded-3xl ">
                <img
                  src={card.img}
                  alt={card.title}
                  className="h-full w-full object-cover"
                />

                <div
                  className="liquid-overlay absolute inset-0 opacity-10 bg-white/20 backdrop-blur-xl rounded-3xl pointer-events-none flex items-center justify-center p-6 "
                  style={{
                    backdropFilter: "bg-blur(10px)",
                    WebkitBackdropFilter: "bg-blur(10px)",
                  }}
                />
              </div>

              {/* Title */}
              <div className="mt-4 px-2">
                <h3 className="text-xl font-bold text-gray-900">
                  {card.title}
                </h3>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default CleanLiquidSection;
