/* eslint-disable @typescript-eslint/no-explicit-any */
import { useRef, useEffect } from "react";
import gsap from "gsap";
import { FiArrowUpRight } from "react-icons/fi";

const items = [
  { type: "text", value: "Creative Studio" },
  {
    type: "img",
    value: "https://images.unsplash.com/photo-1520975916090-3105956dac38?w=200",
  },
  { type: "text", value: "Digital Agency" },
  {
    type: "img",
    value: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=200",
  },
  { type: "text", value: "UI/UX Design" },
  {
    type: "img",
    value: "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?w=200",
  },
];

export default function Marquee() {
  const trackRef = useRef<HTMLDivElement>(null);
  const cursorRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    const width = track.scrollWidth / 2;

    gsap.set(track, { x: 0 });

    const tween = gsap.to(track, {
      x: -width,
      duration: 20,
      ease: "none",
      repeat: -1,
    });

    // 🔥 STOP ANIMATION ON SCROLL START
    const handleScroll = () => {
      tween.pause();

      clearTimeout((window as any)._marqueeTimer);

      (window as any)._marqueeTimer = setTimeout(() => {
        tween.resume();
      }, 150);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      tween.kill();
    };
  }, []);

  // CURSOR MOVE
  const handleMove = (e: React.MouseEvent) => {
    const cursor = cursorRef.current;
    if (!cursor) return;

    cursor.style.opacity = "1";

    gsap.to(cursor, {
      x: e.clientX,
      y: e.clientY,
      duration: 0.2,
      ease: "power3.out",
    });
  };

  // CURSOR HIDE
  const handleLeave = () => {
    const cursor = cursorRef.current;
    if (!cursor) return;

    cursor.style.opacity = "0";
  };

  return (
    <div
      className="relative w-full overflow-hidden py-20 cursor-none"
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
    >
      {/* CUSTOM CURSOR */}
      <div
        ref={cursorRef}
        className="fixed top-0 left-0 w-56 h-12 px-3 rounded-3xl bg-sky-300 pointer-events-none z-[100] -translate-x-1/2 -translate-y-1/2 flex items-center justify-center text-white text-xs uppercase tracking-[0.2em] opacity-0 transition-opacity duration-800"
      >
        Send Us Your Brief
        <FiArrowUpRight className="-rotate-5 text-2xl" />
      </div>

      {/* MARQUEE TRACK */}
      <div ref={trackRef} className="flex w-max whitespace-nowrap gap-10">
        {[...items, ...items].map((item, i) => (
          <div
            key={i}
            className="flex items-center gap-6 text-black text-9xl font-bold"
          >
            {item.type === "text" ? (
              <span className="px-4">{item.value}</span>
            ) : (
              <img
                src={item.value}
                className="w-40 h-40 object-cover rounded-2xl"
              />
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
