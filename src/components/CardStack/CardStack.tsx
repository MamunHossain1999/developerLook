import { useEffect, useRef, type JSX } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const cards = [
  {
    title: "Pioneers",
    color: "#000000",
    textColor: "#ffffff",
    image: "https://images.unsplash.com/photo-1520975916090-3105956dac38?w=600",
  },
  {
    title: "Award Winning",
    color: "#B6FCD5",
    textColor: "#000000",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600",
  },
  {
    title: "Strategy",
    color: "#312e81",
    textColor: "#ffffff",
    image: "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?w=600",
  },
  {
    title: "Growth",
    color: "#4b5563",
    textColor: "#ffffff",
    image: "https://images.unsplash.com/photo-1520975956371-0c1b3b0f0a34?w=600",
  },
];

export default function CardStack(): JSX.Element {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const cardsRef = useRef<HTMLDivElement[]>([]);
  const rotateValues = [-4, -1, 2, 4];

  useEffect(() => {
    if (!containerRef.current) return;

    const ctx = gsap.context(() => {
      const cardElements = cardsRef.current;
      const totalCards = cardElements.length;
      const isMobile = window.innerWidth < 768;

      // --- MOBILE: NO GSAP NEEDED FOR SNAP SCROLL ---
      // Mobile version browser-er native snap scroll bebohar korbe smoother experience-er jonno
      if (isMobile) return;

      // --- DESKTOP ANIMATION (STACKING) ---
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: `+=${totalCards * 600}`,
          scrub: 0.5,
          pin: true,
          anticipatePin: 1,
          pinSpacing: true,
        },
      });

      cardElements.forEach((card, i) => {
        tl.to(
          card,
          {
            y: -1000,
            rotate: -50,
            opacity: 0,
            ease: "power2.inOut",
          },
          i * 0.31,
        );
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={containerRef}
      className="py-16 md:py-24 w-full bg-[#f0f0f0] overflow-x-hidden"
    >
      <div className="text-center mb-12 md:mb-16 px-4">
        <h4 className="text-3xl md:text-2xl font-black tracking-tight ">
          Legacy In The Making
        </h4>
      </div>

      {/* MOBILE: Horizontal Snap Scroll (overflow-x-auto + snap-x)
          DESKTOP: Relative Stacking (md:relative)
      */}
      <div
        className="
          flex flex-row overflow-x-auto snap-x snap-mandatory scrollbar-hide px-6 gap-5
          md:grid md:relative md:w-[450px] md:h-[550px] md:mx-auto md:px-0 md:overflow-visible
        "
      >
        {cards.map((card, i) => (
          <div
            key={i}
            ref={(el) => {
              if (el) cardsRef.current[i] = el;
            }}
            className="
              min-w-[85vw] sm:min-w-[350px] snap-center 
              md:min-w-0 md:absolute md:inset-0 
              rounded-[40px] p-10 md:p-12 flex flex-col lg:rotate-12 items-center shadow-xl
            "
            style={{
              backgroundColor: card.color,
              color: card.textColor,
              zIndex: cards.length - i,
              // Desktop-e stack feel anar jonno rotation
              transform: `rotate(${typeof window !== "undefined" && window.innerWidth > 768 ? rotateValues[i % 4] : 0}deg)`,
            }}
          >
            {/* Image Box */}
            <div className="w-48 h-48 md:w-56 md:h-56 overflow-hidden rounded-2xl mb-8 shrink-0 shadow-lg">
              <img
                src={card.image}
                alt={card.title}
                className="w-full h-full object-cover"
              />
            </div>

            {/* Content Section */}
            <div className="text-center">
              <h2 className="text-4xl md:text-5xl font-bold mb-4 tracking-tighter leading-tight">
                {card.title}
              </h2>
              <p className="text-sm md:text-base opacity-85 leading-relaxed max-w-[280px] mx-auto">
                We're dedicated to creating the industry narrative that others
                follow 3 years from now.
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Mobile Indicator (Optional) */}
      <div className="flex justify-center gap-2 md:hidden">
        {cards.map((_, i) => (
          <div key={i} className=" rounded-2xl " />
        ))}
      </div>
    </section>
  );
}
