/* eslint-disable react-hooks/set-state-in-effect */
"use client";
import { useEffect, useRef, useState } from "react";
import hero1 from "../../assets/hero1.png";
import { gsap } from "gsap";
import LogoMarquee from "./LogoMarquee";
const heroImages = [
  "https://i.ibb.co.com/1t64j9kR/Emirates-airpline-in-flight.webp",
  "https://i.ibb.co.com/9HYzqJSr/Red-Bull-Instagram-Post-45.webp",
  "https://i.ibb.co.com/hFJx9nqm/spaseekers.webp",
  "https://i.ibb.co.com/mVRbJhRK/Screenshot-2025-07-01-at-21-36-35.webp",
  "https://i.ibb.co.com/hRkPXTgb/unnamed-6.webp",
];

const HeroSection = () => {
  const [bgImage, setBgImage] = useState("");
  const leftRef = useRef(null);
  const rightRef = useRef(null);
  const imgRef = useRef(null);
  const containerRef = useRef(null);
  useEffect(() => {
    if (!bgImage) return;

    // 🔥 mobile check
    const isMobile = window.innerWidth < 768;
    if (isMobile) return;

    const tl = gsap.timeline();

    tl.from(containerRef.current, {
      y: 80,
      opacity: 0,
      duration: 1.2,
      ease: "power3.out",
    })

      .from(imgRef.current, {
        scale: 0,
        opacity: 0,
        duration: 1,
        ease: "power2.out",
      })

      .to(
        leftRef.current,
        {
          x: -40,
          duration: 0.8,
          ease: "power2.out",
        },
        "-=0.6",
      )

      .to(
        rightRef.current,
        {
          x: 40,
          duration: 0.8,
          ease: "power2.out",
        },
        "<",
      );
  }, [bgImage]);

  useEffect(() => {
    const random = heroImages[Math.floor(Math.random() * heroImages.length)];

    setBgImage(random);
  }, []);

  return (
    <div className="relative w-full mx-auto min-h-screen flex flex-col items-center justify-center overflow-hidden rounded-2xl text-white  pt-4 md:pt-2">
      {/* BACKGROUND */}

      <div
        className="absolute inset-0 z-0 transition-opacity duration-700"
        style={{
          backgroundImage: `url(${bgImage})`,
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
          backgroundPosition: "center",
          filter: "blur(10px)",
          transform: "scale(1.1)",
        }}
      />

      {/* CONTENT */}
      <div className="relative z-10 flex flex-col items-center text-center px-4 sm:px-6 md:px-8 lg:px-0 max-w-5xl mx-auto">
        {/* BADGE */}
        <div className="mb-5 flex flex-col items-center">
          <p className="text-white text-[9px] sm:text-[14px] font-bold tracking-[0.2em] uppercase mb-2 text-center">
            #1 Most Recommended <br />
            Content Marketing Agency
          </p>

          <div className="flex flex-wrap justify-center mt-2 gap-2 sm:gap-3 opacity-80">
            <img src={hero1} alt="Award" className="w-96 h-14" />
          </div>
        </div>

        {/* MAIN TITLE */}
        <div className="text-5xl md:text-8xl font-black leading-none tracking-tighter text-white">
          <span>We</span> <span>Create</span>
        </div>

        {/* CATEGORY ROW */}
        <div
          ref={containerRef}
          className="flex flex-wrap items-center text-center justify-center gap-3 my-3"
        >
          <h1
            ref={leftRef}
            className="font-black text-5xl md:text-8xl leading-none text-white"
          >
            Category
          </h1>

          {/* IMAGE */}
          <div className="w-[60px] sm:w-[80px] md:w-[100px]  h-[60px] sm:h-[80px] md:h-[100px] rounded-2xl overflow-hidden flex items-center justify-center">
            <img
              ref={imgRef}
              src={bgImage}
              alt="Emirates"
              className="w-full h-full object-cover"
            />
          </div>

          <h1
            ref={rightRef}
            className="text-5xl md:text-8xl font-black leading-none  text-white"
          >
            Leaders
          </h1>
        </div>

        {/* SUB TITLE */}
        <p className="text-white/90 text-sm sm:text-lg mt-3 md:text-4xl font-medium mb-10 md:mb-1">
          on every searchable platform
        </p>
      </div>
      <div className="hidden md:block">
        <LogoMarquee />
      </div>
      {/* BOTTOM BAR */}
      <div className="absolute bottom-0 left-0 right-0 w-full flex flex-col md:flex-row md:items-end justify-between z-10 gap-3 px-4 md:px-10 pb-5 md:pb-16">
        {/* LEFT */}
        <p className="hidden md:block text-white text-md max-w-lg">
          Organic media planners creating, distributing & optimising
          search-first content for SEO, Social, PR, AI and LLM search.
        </p>

        {/* RIGHT */}
        <p className="text-white/60 text-md text-center md:text-right">
          4 Global Offices serving <br />
          <span className="text-white/80 font-semibold">UK, USA &amp; EU</span>
        </p>
      </div>
    </div>
  );
};

export default HeroSection;
