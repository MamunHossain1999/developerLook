/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

// ================= DATA =================
const works = [
  {
    id: 1,
    title: "SIXT",
    date: "[2023-2025]",
    img: "https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?w=1400&q=80",
    color: "#ff4d4d",
  },
  {
    id: 2,
    title: "Dojo - B2",
    date: "[2021-2025]",
    img: "https://images.unsplash.com/photo-1664575602554-2087b04935a5?w=1400&q=80",
    color: "#4d79ff",
  },
  {
    id: 3,
    title: "Magnet Trade - B2B",
    date: "[2023-2024]",
    img: "https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=1400&q=80",
    color: "#4dff88",
  },
  {
    id: 4,
    title: "JD Sports",
    date: "[2025]",
    img: "https://images.unsplash.com/photo-1556906781-9a412961c28c?w=1400&q=80",
    color: "#ffd24d",
  },
  {
    id: 5,
    title: "Parkdean Resorts",
    date: "[2019-2025]",
    img: "https://images.unsplash.com/photo-1499793983690-e29da59ef1c2?w=1400&q=80",
    color: "#b84dff",
  },
  {
    id: 6,
    title: "Pooky",
    date: "[2025]",
    img: "https://images.unsplash.com/photo-1534073828943-f801091bb18c?w=1400&q=80",
    color: "#ff8c4d",
  },
  {
    id: 7,
    title: "Parkdean Resorts",
    date: "[2019-2025]",
    img: "https://images.unsplash.com/photo-1523987355523-c7b5b0dd90a7?w=1400&q=80",
    color: "#4dfff3",
  },
  {
    id: 8,
    title: "Lloyds Pharmacy",
    date: "[2022-23]",
    img: "https://images.unsplash.com/photo-1586015555751-63bb77f4322a?w=1400&q=80",
    color: "#ff4df2",
  },
  {
    id: 9,
    title: "PrettyLittleThing",
    date: "[2021-2023]",
    img: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=1400&q=80",
    color: "#4dffb8",
  },
];

const FeaturedWork: React.FC = () => {
  const cursorRef = useRef<HTMLDivElement | null>(null);
  const [showCursor, setShowCursor] = useState(false);
  const sectionRef = useRef<HTMLDivElement | null>(null);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  // ================= GSAP ANIMATION =================
  useEffect(() => {
    let ctx: gsap.Context | null = null;

    const initAnimation = () => {
      // sob clear
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());

      // MOBILE এ animation OFF
      if (window.innerWidth < 768) return;

      const total = works.length;

      ctx = gsap.context(() => {
        const scrollDistance = window.innerHeight * total;

        // PIN
        ScrollTrigger.create({
          trigger: sectionRef.current,
          start: "top top",
          end: `+=${scrollDistance}`,
          pin: true,
          scrub: false,
          anticipatePin: 1,
          invalidateOnRefresh: true,
        });

        // IMAGES
        gsap.to(".images-wrap", {
          yPercent: -100 * (total - 1),
          ease: "none",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top top",
            end: `+=${scrollDistance}`,
            scrub: 1,
            invalidateOnRefresh: true,
          },
        });

        // TEXT
        gsap.to(".text-wrap", {
          y: -((total - 1) * 60),
          ease: "none",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top top",
            end: `+=${scrollDistance}`,
            scrub: 1,
            invalidateOnRefresh: true,
          },
        });

        ScrollTrigger.refresh();
      }, sectionRef);
    };

    initAnimation();

    window.addEventListener("resize", initAnimation);

    return () => {
      window.removeEventListener("resize", initAnimation);

      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());

      if (ctx) ctx.revert();
    };
  }, []);

  // ================= CUSTOM CURSOR EFFECT =================
  useEffect(() => {
    if (!cursorRef.current) {
      return;
    }

    const xTo = gsap.quickTo(cursorRef.current, "x", {
      duration: 0.12,
      ease: "power3.out",
    });

    const yTo = gsap.quickTo(cursorRef.current, "y", {
      duration: 0.12,
      ease: "power3.out",
    });

    const move = (e: MouseEvent) => {
      xTo(e.clientX);
      yTo(e.clientY);
    };

    window.addEventListener("mousemove", move);

    return () => window.removeEventListener("mousemove", move);
  }, []);

  return (
    <div className="w-full mx-auto">
      <section
        ref={sectionRef}
        id="featured-work"
        className="relative w-full rounded-2xl overflow-hidden bg-black"
      >
        <div className="flex flex-col md:flex-row w-full">
          {/* LEFT SIDE */}
          <div className="w-full md:w-1/2 flex flex-col relative px-4 md:px-12">
            {/* HEADER */}
            <div className="sticky top-0 py-6 md:py-18 text-white z-50 bg-black">
              <h1 className="text-xl md:text-2xl">Featured Work</h1>
            </div>

            {/* MOBILE + TABLET CARDS */}
            <div className="lg:hidden flex flex-col gap-4 pt-6 pb-6">
              {works.map((work) => (
                <div
                  key={work.id}
                  className="relative w-full h-[220px] sm:h-[260px] rounded-2xl overflow-hidden"
                >
                  <img
                    src={work.img}
                    alt={work.title}
                    loading="lazy"
                    className="w-full h-full object-cover"
                  />

                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

                  <div className="absolute top-3 left-3 right-3 flex items-center justify-between bg-white/10 backdrop-blur-md rounded-full px-4 py-2 text-white text-xs sm:text-sm">
                    <span>{work.title}</span>
                    <span>↗</span>
                  </div>

                  <div className="absolute bottom-3 left-3 text-white">
                    <p className="text-xs opacity-70">{work.date}</p>
                    <h2 className="text-lg sm:text-2xl font-semibold">
                      {work.title}
                    </h2>
                  </div>
                </div>
              ))}
            </div>

            {/* DESKTOP TEXT */}
            <div
              className="hidden lg:flex text-wrap flex-col z-20 pt-[5vh] w-full"
              style={{
                textAlign: "left",
                WebkitMaskImage:
                  "linear-gradient(to bottom, transparent 0%, black 15%, black 85%, transparent 100%)",
                maskImage:
                  "linear-gradient(to bottom, transparent 0%, black 15%, black 85%, transparent 100%)",
              }}
            >
              {works.map((work, i) => (
                <div
                  key={work.id}
                  onMouseEnter={() => setHoveredIndex(i)}
                  onMouseLeave={() => setHoveredIndex(null)}
                  className={`transition-all duration-500 cursor-pointer flex flex-col ${
                    hoveredIndex === i
                      ? "opacity-100 translate-x-3"
                      : "opacity-95 translate-x-0"
                  }`}
                >
                  <div className="flex gap-2 hover:translate-x-3 transition-all duration-500">
                    <h3 className="text-7xl font-semibold tracking-tighter text-[#f5f1ea]">
                      {work.title}
                    </h3>

                    <span className="text-md font-mono text-white/40 tracking-widest uppercase">
                      {work.date}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* RIGHT SIDE (DESKTOP ONLY) */}
          <div
            className="hidden lg:flex w-full lg:w-1/2 h-[70vh] lg:h-full items-center justify-center relative"
            onMouseEnter={() => setShowCursor(true)}
            onMouseLeave={() => setShowCursor(false)}
          >
            {/* CURSOR */}
            <div
              ref={cursorRef}
              className={`fixed top-0 left-0 w-20 h-20 rounded-full bg-sky-300 pointer-events-none z-[100] -translate-x-1/2 -translate-y-1/2 flex items-center justify-center text-white text-xs uppercase tracking-[0.2em] transition-opacity duration-300 ${
                showCursor ? "opacity-100" : "opacity-0"
              }`}
            >
              View
            </div>

            {/* IMAGES */}
            <div className="w-full h-[95vh] overflow-hidden rounded-3xl cursor-none relative bg-[#0a0a0a]">
              <div className="images-wrap h-full w-full">
                {works.map((work, i) => (
                  <div key={work.id} className="h-full w-full p-4">
                    <div
                      className="relative w-full h-full overflow-hidden rounded-2xl"
                      onMouseEnter={() => setHoveredIndex(i)}
                      onMouseLeave={() => setHoveredIndex(null)}
                    >
                      <img
                        src={work.img}
                        alt={work.title}
                        className="absolute inset-0 w-full h-full object-cover"
                      />

                      <div
                        className="liquid-overlay absolute rounded-2xl inset-0 pointer-events-none"
                        style={{
                          backgroundColor: work.color,
                          clipPath:
                            hoveredIndex === i
                              ? "circle(150% at 50% 100%)"
                              : "circle(0% at 50% 100%)",
                          opacity: hoveredIndex === i ? 1 : 0,
                          transition: "all 0.7s ease-in-out",
                        }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default FeaturedWork;
