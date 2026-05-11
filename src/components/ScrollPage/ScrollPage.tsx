import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function RiseAtSeven() {
  const containerRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);

  const text = "Ready to Rise at Seven?";

  useEffect(() => {
    const isMobile = window.innerWidth < 768;

    const ctx = gsap.context(() => {
      if (!containerRef.current || !trackRef.current || !textRef.current)
        return;

      const chars = textRef.current.querySelectorAll(".char");

      gsap.set(chars, {
        y: -250,
        opacity: 0,
        rotate: 15,
      });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: isMobile ? "+=1500" : "+=3000",
          scrub: 1,
          pin: true,
        },
      });

      // letter নেমে আসবে
      tl.to(
        chars,
        {
          x: 0,
          y: 0,
          opacity: 1,
          rotate: 0,
          ease: "back.out(2.9)",
          stagger: {
            each: isMobile ? 0.05 : 0.08,
            from: "start",
          },
          duration: isMobile ? 0.5 : 0.8,
        },
        0
      );

      // right থেকে left এ scroll
      tl.to(
        trackRef.current,
        {
          x: () => -(trackRef.current!.scrollWidth - window.innerWidth),
          ease: "none",
          duration: 1.5,
        },
        isMobile ? 0.5 : 0.8
      );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={containerRef} className="overflow-hidden">
      <section className="h-screen flex items-center relative">
        <div ref={trackRef} className="flex will-change-transform">
          <div
            ref={textRef}
            className="flex whitespace-nowrap"
            style={{
              fontSize: "clamp(2rem, 11vw, 11vw)",
              letterSpacing: "-0.04em",
              color: "#111",
              paddingLeft: "100vw",
              paddingRight: "100vw",
            }}
          >
            {text.split("").map((char, i) => (
              <span key={i} className="inline-block char">
                {char === " " ? "\u00A0" : char}
              </span>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}