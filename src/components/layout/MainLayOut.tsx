import React, { useEffect, useRef, useState } from "react";
import { Outlet } from "react-router-dom";
import gsap from "gsap";
import ScrollToTop from "../ScrollTop/ScrollTop";
import Navbar from "../navber/Navbar";
import Footer from "../footer/Footer";

const MainLayOut: React.FC = () => {
  const overlayRef = useRef<HTMLDivElement>(null);
  const [isDone, setIsDone] = useState(false);

useEffect(() => {
  if (!overlayRef.current) return;

  const tl = gsap.timeline({
    onComplete: () => {
      setIsDone(true);
    },
  });

  tl.set(overlayRef.current, {
    // শুরুতে পুরো স্ক্রিন ৪টি কোণা দিয়ে ঢেকে থাকবে
    clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
    visibility: "visible",
  })
  .to(overlayRef.current, {
    // ৪টি কোণা সংকুচিত হয়ে উপরে মাঝখানে চলে যাবে (Revealing from corners)
    clipPath: "polygon(50% 0%, 50% 0%, 50% 0%, 50% 0%)", 
    duration: 1.8,
    ease: "expo.inOut",
    delay: 0.5,
  });
}, []);

  return (
    <div className="mx-2 relative overflow-hidden">
      {/* Loader Overlay - এটি মেইন পেজকে ঢেকে রাখবে */}
      {!isDone && (
        <div
          ref={overlayRef}
          className="fixed inset-0 z-[9999] pointer-events-none"
          style={{ backgroundColor: "#b45309" }} // আপনার থিম কালার
        />
      )}

      <ScrollToTop />
      <Navbar />

      {/* মেইন পেজ কন্টেন্ট - যা নিচ থেকে বের হবে */}
      <main>
        <div className="min-h-[calc(100vh-380px)] bg-white rounded-2xl overflow-hidden">
          <Outlet />
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default MainLayOut;