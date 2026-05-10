import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function RiseAtSeven() {
  const containerRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLHeadingElement>(null);
  const text = "Ready to Rise at Seven?";

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (!textRef.current || !containerRef.current) return;

      // calculation for total scroll distance
      const totalWidth = textRef.current.scrollWidth;

      gsap.to(textRef.current, {
        // Text screen theke pura ber hoye jabe
        x: () => -(totalWidth), 
        ease: "none",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: "+=2500", // Smoothness er jonno distance
          scrub: 1.5,
          pin: true,
          anticipatePin: 1,
          invalidateOnRefresh: true,
        },
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={containerRef} className="bg-[#f0efeb] overflow-hidden">
      {/* h-screen: Pura screen height nibe pinning er jonno
          items-center: Text ke vertical center korbe
          -mt-[10vh]: Center theke ektu upore uthanor jonno negative margin
      */}
      <section className="h-screen flex items-center justify-start overflow-hidden -mt-[5vh]">
        <h1
          ref={textRef}
          className="font-black whitespace-nowrap leading-[0.85] will-change-transform"
          style={{
            fontSize: "18vw",
            letterSpacing: "-0.04em",
            color: "#111111",
            display: "inline-block",
            // Shuru-te text-ti screen-er center-e thakbe (left side faka rakhbe)
            paddingLeft: "100vw", 
          }}
        >
          {text}
        </h1>
      </section>
    </div>
  );
}