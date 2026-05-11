/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useRef } from "react";
import gsap from "gsap";

const BrandTicker = () => {
  const tickerRef = useRef<HTMLDivElement>(null);

  // BTN 1
  const topRef = useRef<HTMLSpanElement>(null);
  const bottomRef = useRef<HTMLSpanElement>(null);

  // BTN 2
  const topRef2 = useRef<HTMLSpanElement>(null);
  const bottomRef2 = useRef<HTMLSpanElement>(null);

  // =========================
  // BUTTON ANIMATION
  // =========================
  const animateEnter = (top: any, bottom: any) => {
    if (!top || !bottom) return;

    gsap.killTweensOf([top, bottom]);

    gsap.to(top, {
      y: "-100%",
      opacity: 0,
      duration: 0.3,
      ease: "power2.inOut",
    });

    gsap.fromTo(
      bottom,
      { y: "100%", opacity: 0 },
      {
        y: "0%",
        opacity: 1,
        duration: 0.3,
        ease: "power2.inOut",
      },
    );
  };

  const animateLeave = (top: any, bottom: any) => {
    if (!top || !bottom) return;

    gsap.killTweensOf([top, bottom]);

    gsap.to(top, {
      y: "0%",
      opacity: 1,
      duration: 0.3,
      ease: "power2.inOut",
    });

    gsap.to(bottom, {
      y: "100%",
      opacity: 0,
      duration: 0.3,
      ease: "power2.inOut",
    });
  };

  // =========================
  // 🔥 SMOOTH MARQUEE (NO JUMP FIX)
  // =========================
  useEffect(() => {
    const ctx = gsap.context(() => {
      const track = tickerRef.current?.querySelector(
        ".ticker-track",
      ) as HTMLElement;
      const items = tickerRef.current?.querySelectorAll(".ticker-item");

      if (!track || !items) return;

      const totalWidth: number = track.scrollWidth / 3;

      gsap.set(track, { x: 0 });

      gsap.to(track, {
        x: -totalWidth,
        duration: 25,
        ease: "none",
        repeat: -1,
        modifiers: {
          x: (x) => {
            const value = parseFloat(x);
            const mod = value % -totalWidth;
            return mod + "px";
          },
        },
      });

      // 🎯 Physics blur (same logic, optimized)
      const updateBlur = () => {
        const container = tickerRef.current?.getBoundingClientRect();
        if (!container) return;

        const center = container.left + container.width / 2;

        items.forEach((el) => {
          const rect = el.getBoundingClientRect();
          const elCenter = rect.left + rect.width / 2;

          const distanceFromCenter = Math.abs(center - elCenter);
          const norm = Math.min(distanceFromCenter / (container.width / 2), 1);

          gsap.set(el, {
            filter: `blur(${norm * 5}px)`,
            opacity: 1 - norm * 0.5,
            scale: 1 - norm * 0.03,
          });
        });

        requestAnimationFrame(updateBlur);
      };

      updateBlur();
    }, tickerRef);

    return () => ctx.revert();
  }, []);

  const logos = [
    "HubSpot",
    "XBOX",
    "SIXT",
    "REVOLUTION",
    "Kroger",
    "PlayStation",
  ];

  return (
    <section className="bg-[#f0efeb] py-14 md:py-2  overflow-hidden font-sans">
      {/* ================= MARQUEE ================= */}
      <div className="flex flex-col md:flex-row items-start md:items-center mb-16 md:my-24  sm:px-0 lg:px-0 gap-4">
        <span className="text-[11px] pl-2 md:pl-5 md:text-[12px] font-bold uppercase whitespace-nowrap">
          The agency behind...
        </span>

        <div
          ref={tickerRef}
          className="relative flex-1 w-full overflow-hidden pointer-events-none"
        >
          {/* The Scrolling Track */}
          <div className="ticker-track flex h-16 md:h-20 items-center whitespace-nowrap">
            {[...logos, ...logos, ...logos].map((logo, idx) => (
              <span
                key={idx}
                className="ticker-item text-lg md:text-2xl font-black mr-10 md:mr-16"
              >
                {logo}
              </span>
            ))}
          </div>

          {/* Left Blur/Fade */}
          <div className="absolute left-0 top-0 z-10 h-full w-2 md:w-0 bg-gradient-to-r from-[#EFEEEC] via-[#E0E0DF]/90 to-transparent backdrop-blur-xl" />

          {/* Right Blur/Fade */}
          <div className="absolute right-0 top-0 z-10 h-full w-2 md:w-3 bg-gradient-to-l from-[#EFEEEC] via-[#E0E0DF]/90 to-transparent backdrop-blur-xl" />
        </div>
      </div>

      {/* ================= CONTENT ================= */}
      <div className="container mx-auto px-4 sm:px-6 flex flex-col md:flex-row justify-between gap-10 md:gap-16">
        {/* LEFT TEXT */}
        <div className="order-2 md:order-1 max-w-full md:max-w-sm">
          <p className="text-base md:text-2xl hidden md:block font-medium leading-tight text-black">
            A global team of search-first content marketers engineering semantic
            relevancy & category signals for both the internet and people
          </p>
        </div>

        {/* RIGHT CONTENT */}
        <div className="order-1 md:order-2 flex-1 md:max-w-2xl flex flex-col min-h-100">
          {/* TITLE + IMAGE INLINE */}
          <div className="flex items-start gap-3">
            <h1 className="text-4xl md:text-7xl font-black leading-[0.95]">
              Driving Demand &{" "}
              <span className="inline-flex items-center gap-2">
                Discovery
                <img
                  src="https://images.unsplash.com/photo-1520975916090-3105956dac38?w=200&h=200&fit=crop"
                  alt="demo"
                  className="w-10 h-10 md:w-14 md:h-14 rounded-md object-cover"
                />
              </span>
            </h1>
          </div>

          {/* MOBILE PARAGRAPH (ONLY MOBILE) */}
          <p className="block md:hidden mt-6 text-black text-base leading-relaxed">
            A global team of search-first content marketers engineering semantic
            relevancy & category signals for both the internet and people
          </p>

          {/* BUTTONS */}
          <div className=" flex flex-col  mt-2 sm:flex-row items-center md:items-center justify-center md:justify-start gap-4 sm:gap-6 pt-10 md:pt-0 w-full">
            {/* BTN 1 */}
            <a
              href="#"
              onMouseEnter={() =>
                animateEnter(topRef.current, bottomRef.current)
              }
              onMouseLeave={() =>
                animateLeave(topRef.current, bottomRef.current)
              }
              className="group bg-white text-black px-6 sm:px-8 py-3 sm:py-4 rounded-full font-bold text-xs sm:text-sm border border-black/5 flex items-center overflow-hidden w-full sm:w-auto justify-center"
            >
              <span className="relative h-5 w-full sm:w-30 overflow-hidden flex items-center justify-center">
                <span
                  ref={topRef}
                  className="absolute inset-0 flex items-center justify-center"
                >
                  Our Story ↗
                </span>

                <span
                  ref={bottomRef}
                  className="absolute inset-0 flex items-center justify-center"
                  style={{ transform: "translateY(100%)", opacity: 0 }}
                >
                  Our Story ↗
                </span>
              </span>
            </a>

            {/* BTN 2 */}
            <a
              href="#"
              onMouseEnter={() =>
                animateEnter(topRef2.current, bottomRef2.current)
              }
              onMouseLeave={() =>
                animateLeave(topRef2.current, bottomRef2.current)
              }
              className="text-black font-bold text-xs sm:text-sm flex items-center overflow-hidden w-full sm:w-auto justify-center"
            >
              <span className="relative h-5 w-full sm:w-35 overflow-hidden flex justify-center">
                <span
                  ref={topRef2}
                  className="absolute inset-0 flex items-center justify-center gap-1"
                >
                  Our Services ↗
                </span>

                <span
                  ref={bottomRef2}
                  className="absolute inset-0 flex items-center justify-center gap-1"
                  style={{ transform: "translateY(100%)", opacity: 0 }}
                >
                  Our Services ↗
                </span>
              </span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BrandTicker;
