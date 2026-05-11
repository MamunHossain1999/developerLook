/* eslint-disable react-hooks/set-state-in-effect */
import React, { useEffect, useRef, useState } from "react";
import { Outlet } from "react-router-dom";
import ScrollToTop from "../ScrollTop/ScrollTop";
import Navbar from "../navber/Navbar";
import Footer from "../footer/Footer";

const MainLayOut: React.FC = () => {
  const overlayRef = useRef<HTMLDivElement>(null);
  const [done, setDone] = useState(false);
  const isMobile = window.innerWidth < 768;

  useEffect(() => {
    // mobile animation skip
    if (isMobile) {
      setDone(true);
      return;
    }

    const el = overlayRef.current;
    if (!el) return;

    const handleAnimationEnd = () => setDone(true);
    el.addEventListener("animationend", handleAnimationEnd);

    return () => el.removeEventListener("animationend", handleAnimationEnd);
  }, []);

  return (
    <div className="mx-2 relative overflow-hidden">
      {!done && (
        <div
          ref={overlayRef}
          className="fixed inset-0 z-[99999] bg-[#B2F5E8]"
          style={{
            clipPath:
              "polygon(0% 0%, 100% 0%, 100% 100%, 50% 100%, 0% 100%)",
            animation: "wipeUp 1.6s ease-in-out 0.3s forwards",
          }}
        />
      )}

      <style>{`
        @keyframes wipeUp {
          0% {
            clip-path: polygon(0% 0%, 100% 0%, 100% 100%, 50% 130%, 0% 100%);
            transform: translateY(0%);
          }
          40% {
            clip-path: polygon(0% 0%, 100% 0%, 100% 100%, 50% 100%, 0% 100%);
            transform: translateY(0%);
          }
          100% {
            clip-path: polygon(0% 10%, 100% 20%, 100% 100%, 50% 70%, 0% 100%);
            transform: translateY(-110%);
          }
        }
      `}</style>

      <ScrollToTop />
      <Navbar />

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