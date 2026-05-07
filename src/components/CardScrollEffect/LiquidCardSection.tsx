import React, { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';

const cards = [
  { id: 1, title: "Ryan McNamara is Now Rise at Seven", img: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?q=80&w=2070" },
  { id: 2, title: "Rise at Seven Appointed by Coneys", img: "https://images.unsplash.com/photo-1552664730-d307ca884978?q=80&w=2070" },
  { id: 3, title: "Rise at Seven Appointed by Langtree", img: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=2070" },
];

const CleanLiquidSection: React.FC = () => {
  const cursorRef = useRef<HTMLDivElement>(null);
  const { contextSafe } = useGSAP();

  // মাউস ট্র্যাকিং (কার্সার)
  const onMouseMove = (e: React.MouseEvent) => {
    gsap.to(cursorRef.current, {
      x: e.clientX,
      y: e.clientY,
      xPercent: -50,
      yPercent: -50,
      duration: 0.2,
      ease: "power2.out"
    });
  };

  // হোভার এন্টার - ইফেক্ট শুরু হবে
  const onHoverEnter = contextSafe((e: React.MouseEvent) => {
    const overlay = e.currentTarget.querySelector(".liquid-overlay");
    
    // কাস্টম কার্সর বড় হবে
    gsap.to("#custom-cursor", { scale: 1, duration: 0.3 });

    // এনিমেশন: শুরুতে অপাসিটি ১ হবে এবং বাবল বড় হবে সাথে ব্লার বাড়বে
    gsap.fromTo(overlay, 
      { 
        opacity: 0,
        clipPath: "circle(0% at 50% 100%)",
        backdropFilter: "blur(0px)",
        WebkitBackdropFilter: "blur(0px)" 
      }, 
      { 
        opacity: 1,
        clipPath: "circle(150% at 50% 100%)",
        backdropFilter: "blur(12px)",
        WebkitBackdropFilter: "blur(12px)",
        duration: 0.8, 
        ease: "power3.inOut" 
      }
    );
  });

  // হোভার লিভ - সব ইফেক্ট চলে যাবে
  const onHoverLeave = contextSafe((e: React.MouseEvent) => {
    const overlay = e.currentTarget.querySelector(".liquid-overlay");
    
    gsap.to("#custom-cursor", { scale: 0, duration: 0.3 });

    gsap.to(overlay, { 
      opacity: 0,
      clipPath: "circle(0% at 50% 100%)",
      backdropFilter: "blur(0px)",
      WebkitBackdropFilter: "blur(0px)",
      duration: 0.6, 
      ease: "power3.in" 
    });
  });

  return (
    <div onMouseMove={onMouseMove} className="relative bg-[#f0f0f0] min-h-screen py-20 overflow-hidden">
      {/* Custom Cursor */}
      <div 
        ref={cursorRef} 
        id="custom-cursor"
        className="fixed top-0 left-0 w-20 h-20 bg-[#14cfb1] rounded-full pointer-events-none z-[999] flex items-center justify-center text-white font-bold text-xs scale-0 shadow-xl"
      >
        VIEW
      </div>

      <section className="mx-auto px-10 ">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {cards.map((card) => (
            <div 
              key={card.id}
              className="group relative w-full cursor-none" 
              onMouseEnter={onHoverEnter}
              onMouseLeave={onHoverLeave}
            >
              {/* Image Container */}
              <div className="relative aspect-[4/5] overflow-hidden rounded-[2.5rem] bg-white shadow-sm">
                <img 
                  src={card.img} 
                  alt={card.title} 
                  className="h-full w-full object-cover "
                />

                {/* --- Liquid Animation Overlay --- */}
                {/* শুরুতে opacity-0 এবং pointer-events-none নিশ্চিত করা হয়েছে */}
                <div 
                  className="liquid-overlay absolute inset-0 bg-blue-200/50 opacity-0 pointer-events-none flex flex-col items-center justify-center p-6 text-center text-white"
                  style={{ backdropFilter: "blur(0px)", WebkitBackdropFilter: "blur(0px)" }}
                >
                  
                </div>
              </div>

              {/* Title Section */}
              <div className="mt-6 px-2">
                <h3 className="text-xl font-bold text-gray-900 ">
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