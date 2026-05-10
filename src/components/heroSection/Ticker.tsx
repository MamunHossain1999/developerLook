import { useRef } from "react";
import gsap from "gsap";

const Ticker = () => {
  const topRef = useRef<HTMLDivElement>(null);
  const bottomRef = useRef<HTMLDivElement>(null);

  const handleEnter = () => {
    const tl = gsap.timeline();

    tl.to(topRef.current, {
      y: "-100%",
      opacity: 0,
      duration: 0.5,
      ease: "power2.inOut",
    }).fromTo(
      bottomRef.current,
      { y: "100%", opacity: 0 },
      {
        y: "0%",
        opacity: 1,
        duration: 0.5,
        ease: "power2.inOut",
      },
      0,
    );
  };

  const handleLeave = () => {
    gsap.to(topRef.current, {
      y: "0%",
      opacity: 1,
      duration: 0.4,
      ease: "power2.inOut",
    });

    gsap.to(bottomRef.current, {
      y: "100%",
      opacity: 0,
      duration: 0.4,
      ease: "power2.inOut",
    });
  };

  return (
    <div
      onMouseEnter={handleEnter}
      onMouseLeave={handleLeave}
      className="bg-[#b2f5e8] text-black text-xs font-semibold rounded-2xl my-3 flex items-center justify-center overflow-hidden h-8 px-4"
    >
      <div className="flex items-center justify-center gap-2 w-full relative h-5 overflow-hidden">
        {/* TOP TEXT */}
        <div
          ref={topRef}
          className="absolute flex items-center justify-center gap-2 w-full text-center"
        >
          <span>🔴</span>
          The Category Leaderboard – Live Now
        </div>

        {/* BOTTOM TEXT */}
        <div
          ref={bottomRef}
          className="absolute flex items-center justify-center gap-2 w-full text-center"
          style={{ transform: "translateY(100%)", opacity: 0 }}
        >
          <span>🔴</span>
          The Category Leaderboard – Live Now
        </div>
      </div>
    </div>
  );
};

export default Ticker;
