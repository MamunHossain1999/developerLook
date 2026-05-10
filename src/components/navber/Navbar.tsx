/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react-hooks/rules-of-hooks */
import { useState, useEffect, useRef } from "react";
import gsap from "gsap";
import { useLocation } from "react-router-dom";
import Ticker from "../heroSection/Ticker";
import { FiArrowUpRight } from "react-icons/fi";

// navItems
const navItems = [
  { label: "Services", hasPlus: true },
  { label: "Industries", hasPlus: true },
  { label: "International", hasPlus: true },
  { label: "About", hasPlus: true },
  { label: "Work", badge: "25" },
  { label: "Careers" },
  { label: "Blog" },
  { label: "Webinar" },
];

// dropdown image and data
type ServiceItem = {
  name: string;
  imgDefault: string;
  imgHover: string;
};

type DropdownDataType = {
  label: string;
  services: ServiceItem[][];
  imgDefault: string;
  imgHover: string;
  imgDefaultAlt: string;
  imgHoverAlt: string;
  tickerBg: string;
};

const dropdownData: Record<string, DropdownDataType> = {
  Services: {
    label: "Core Services",

    services: [
      [
        {
          name: "Search & Growth Strategy",
          imgDefault:
            "https://images.unsplash.com/photo-1551836022-deb4988cc6c0?w=500&q=80",
          imgHover:
            "https://images.unsplash.com/photo-1556761175-4b46a572b786?w=500&q=80",
        },
        {
          name: "Onsite SEO",
          imgDefault:
            "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=500&q=80",
          imgHover:
            "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=500&q=80",
        },
        {
          name: "Content Experience",
          imgDefault:
            "https://images.unsplash.com/photo-1529333166437-7750a6dd5a70?w=500&q=80",
          imgHover:
            "https://images.unsplash.com/photo-1553877522-43269d4ea984?w=500&q=80",
        },
        {
          name: "B2B Marketing",
          imgDefault:
            "https://images.unsplash.com/photo-1521791136064-7986c2920216?w=500&q=80",
          imgHover:
            "https://images.unsplash.com/photo-1556742400-b5b7c5121f5b?w=500&q=80",
        },
      ],

      [
        {
          name: "Digital PR",
          imgDefault:
            "https://images.unsplash.com/photo-1557804506-669a67965ba0?w=500&q=80",
          imgHover:
            "https://images.unsplash.com/photo-1552664730-d307ca884978?w=500&q=80",
        },
        {
          name: "Social Media & Campaigns",
          imgDefault:
            "https://images.unsplash.com/photo-1557838923-2985c318be48?w=500&q=80",
          imgHover:
            "https://images.unsplash.com/photo-1523966211575-eb4a01e7dd51?w=500&q=80",
        },
        {
          name: "Data & Insights",
          imgDefault:
            "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=500&q=80",
          imgHover:
            "https://images.unsplash.com/photo-1518770660439-4636190af475?w=500&q=80",
        },
        {
          name: "Social SEO/Search",
          imgDefault:
            "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=500&q=80",
          imgHover:
            "https://images.unsplash.com/photo-1523966211575-eb4a01e7dd51?w=500&q=80",
        },
      ],
    ],

    imgDefault:
      "https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=500&q=80",
    imgHover:
      "https://images.unsplash.com/photo-1556761175-4b46a572b786?w=500&q=80",
    imgDefaultAlt: "Rise at Seven team working",
    imgHoverAlt: "Rise at Seven collaborative meeting",
    tickerBg: "#b2f5e8",
  },

  Industries: {
    label: "Industries We Serve",
    services: [
      [
        {
          name: "eCommerce",
          imgDefault:
            "https://images.unsplash.com/photo-1515165562835-c3b8c2c4f1c7?w=500&q=80",
          imgHover:
            "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500&q=80",
        },
      ],
    ],
    imgDefault:
      "https://images.unsplash.com/photo-1497366216548-37526070297c?w=500&q=80",
    imgHover:
      "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=500&q=80",
    imgDefaultAlt: "Modern industrial workspace",
    imgHoverAlt: "Industry expertise focus",
    tickerBg: "#ffd7d7",
  },

  International: {
    label: "Global Reach",
    services: [
      [
        {
          name: "USA",
          imgDefault:
            "https://images.unsplash.com/photo-1526778548025-fa2f459cd5c1?w=500&q=80",
          imgHover:
            "https://images.unsplash.com/photo-1541190461-a03988b0ebc4?w=500&q=80",
        },
      ],
    ],
    imgDefault:
      "https://images.unsplash.com/photo-1526778548025-fa2f459cd5c1?w=500&q=80",
    imgHover:
      "https://images.unsplash.com/photo-1541190461-a03988b0ebc4?w=500&q=80",
    imgDefaultAlt: "Global operations map",
    imgHoverAlt: "International network",
    tickerBg: "#d1e9ff",
  },

  About: {
    label: "About Rise at Seven",
    services: [
      [
        {
          name: "Our Story",
          imgDefault:
            "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=500&q=80",
          imgHover:
            "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=500&q=80",
        },
      ],
    ],
    imgDefault:
      "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=500&q=80",
    imgHover:
      "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=500&q=80",
    imgDefaultAlt: "Agency culture",
    imgHoverAlt: "Team collaboration",
    tickerBg: "#e9d5ff",
  },
};

// dropdown ticker
const TickerItem = ({
  title,
  isHovered,
}: {
  title: string;
  isHovered: boolean;
}) => {
  const topRef = useRef<HTMLDivElement>(null);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const tl = gsap.timeline({ overwrite: true });

    if (isHovered) {
      tl.to(topRef.current, {
        y: "-100%",
        opacity: 0,
        duration: 0.3,
        ease: "power2.inOut",
      }).fromTo(
        bottomRef.current,
        { y: "100%", opacity: 0 },
        { y: "0%", opacity: 1, duration: 0.3, ease: "power2.inOut" },
        0,
      );
    } else {
      // hover sorale reverse hobe
      tl.to(topRef.current, {
        y: "0%",
        opacity: 1,
        duration: 0.3,
        ease: "power2.inOut",
      }).to(
        bottomRef.current,
        { y: "100%", opacity: 0, duration: 0.3, ease: "power2.inOut" },
        0,
      );
    }
  }, [isHovered]);

  return (
    <div className="relative h-6 overflow-hidden flex items-center">
      {/* main text*/}
      <div
        ref={topRef}
        className="text-base font-semibold text-black/70 whitespace-nowrap"
      >
        {title}
      </div>
      {/* duplicated text buttom to top hobe*/}
      <div
        ref={bottomRef}
        className="absolute inset-0 text-base font-semibold text-black whitespace-nowrap"
        style={{ transform: "translateY(100%)", opacity: 0 }}
      >
        {title}
      </div>
    </div>
  );
};

const DropdownPanel = ({ activeItem }: { activeItem: string }) => {
  const data = dropdownData[activeItem];
  if (!data) return null;

  const imgTopRef = useRef<HTMLImageElement>(null);
  const imgBottomRef = useRef<HTMLImageElement>(null);
  const [hoveredService, setHoveredService] = useState<string | null>(null);

  // image logic animtion
  const swapImage = (img1: string, img2: string) => {
    gsap.killTweensOf([imgTopRef.current, imgBottomRef.current]);

    if (!imgTopRef.current || !imgBottomRef.current) return;

    imgTopRef.current.src = img1;
    imgBottomRef.current.src = img2;

    gsap.to(imgTopRef.current, {
      y: "-100%",
      opacity: 0,
      duration: 0.35,
    });

    gsap.fromTo(
      imgBottomRef.current,
      { y: "100%", opacity: 0 },
      { y: "0%", opacity: 1, duration: 0.35 },
    );
  };

  return (
    <div className="absolute top-full left-0 right-0 mt-2 z-40 flex justify-center px-6">
      <div className="bg-[#f0efeb] rounded-2xl p-8 flex gap-12 shadow-xl">
        {/* LEFT SIDE */}
        <div className="flex-1">
          <p className="text-[10px] uppercase tracking-widest text-black/40 mb-6 font-bold">
            {data.label}
          </p>

          <div className="flex gap-16">
            {data.services.map((col, ci) => (
              <ul key={ci} className="flex flex-col gap-4">
                {col.map((service, si) => {
                  const index = ci * 10 + si;

                  function animateItem(_index: number, _arg1: boolean) {
                    throw new Error("Function not implemented.");
                  }

                  return (
                    <li
                      key={service.name}
                      className="cursor-pointer"
                      onMouseEnter={() => {
                        setHoveredService(service.name);
                        swapImage(service.imgDefault, service.imgHover);
                        animateItem(index, true);
                      }}
                      onMouseLeave={() => {
                        setHoveredService(null);
                        swapImage(data.imgDefault, data.imgHover);
                        animateItem(index, false);
                      }}
                    >
                      {/* 🔥 TICKER TEXT */}
                      <TickerItem
                        title={service.name}
                        isHovered={hoveredService === service.name}
                      />
                    </li>
                  );
                })}
              </ul>
            ))}
          </div>
        </div>

        {/* RIGHT IMAGE */}
        <div className="relative w-64 h-52 rounded-2xl overflow-hidden flex-shrink-0">
          <img
            ref={imgTopRef}
            src={data.imgDefault}
            className="absolute inset-0 w-full h-full object-cover"
          />

          <img
            ref={imgBottomRef}
            src={data.imgHover}
            className="absolute inset-0 w-full h-full object-cover"
            style={{ transform: "translateY(100%)", opacity: 0 }}
          />
        </div>
      </div>
    </div>
  );
};

// ── Main Navbar ──────────────────────────────────────────────────────────────
export default function Navbar() {
  const location = useLocation();
  const [navVisible, setNavVisible] = useState(true);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [scrolled, setScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false); // ← Mobile Menu State

  const lastScrollY = useRef(0);
  const ticking = useRef(false);
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const topRef = useRef<HTMLSpanElement>(null);
  const bottomRef = useRef<HTMLSpanElement>(null);
  const iconTopRef = useRef<SVGSVGElement>(null);
  const iconBottomRef = useRef<SVGSVGElement>(null);

  // Scroll Handler
  useEffect(() => {
    const handleScroll = () => {
      if (!ticking.current) {
        window.requestAnimationFrame(() => {
          const currentY = window.scrollY;
          setScrolled(currentY > 40);

          if (currentY < 60) {
            setNavVisible(true);
          } else if (currentY > lastScrollY.current + 15) {
            setNavVisible(false);
            setActiveDropdown(null);
          } else if (currentY < lastScrollY.current - 15) {
            setNavVisible(true);
          }
          lastScrollY.current = currentY;
          ticking.current = false;
        });
        ticking.current = true;
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mobile menu when clicking outside or scrolling
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isMobileMenuOpen]);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
    setActiveDropdown(null); // Close desktop dropdown if open
  };

  // CTA Button Animation Logic
  const handleEnter = () => {
    const tl = gsap.timeline({ overwrite: true });

    // text animation (Get In Touch)
    tl.to(topRef.current, {
      y: "-100%",
      opacity: 0,
      duration: 0.3,
      ease: "power2.inOut",
    }).fromTo(
      bottomRef.current,
      { y: "100%", opacity: 0 },
      { y: "0%", opacity: 1, duration: 0.3, ease: "power2.inOut" },
      0,
    );

    // icon animation(Arrow)
    tl.to(
      iconTopRef.current,
      {
        y: "-100%",
        x: "100%",
        opacity: 0,
        duration: 0.3,
        ease: "power2.inOut",
      },
      0,
    ).fromTo(
      iconBottomRef.current,
      { y: "100%", x: "-100%", opacity: 0 },
      { y: "0%", x: "0%", opacity: 1, duration: 0.3, ease: "power2.inOut" },
      0,
    );
  };

  // hover leave hole text and icon reverse hobe
  const handleLeave = () => {
    const tl = gsap.timeline({ overwrite: true });

    // text reverse
    tl.to(topRef.current, {
      y: "0%",
      opacity: 1,
      duration: 0.3,
      ease: "power2.inOut",
    }).to(
      bottomRef.current,
      { y: "100%", opacity: 0, duration: 0.3, ease: "power2.inOut" },
      0,
    );

    // icon reverse
    tl.to(
      iconTopRef.current,
      {
        y: "0%",
        x: "0%",
        opacity: 1,
        duration: 0.3,
        ease: "power2.inOut",
      },
      0,
    ).to(
      iconBottomRef.current,
      {
        y: "100%",
        x: "-100%",
        opacity: 0,
        duration: 0.3,
        ease: "power2.inOut",
      },
      0,
    );
  };

  const handleNavEnter = (label: string) => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    if (dropdownData[label]) setActiveDropdown(label);
  };

  const handleNavLeave = () => {
    closeTimer.current = setTimeout(() => setActiveDropdown(null), 120);
  };

  const handleDropdownEnter = () => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
  };

  const handleDropdownLeave = () => {
    closeTimer.current = setTimeout(() => setActiveDropdown(null), 120);
  };

  const hasTicker =
    location.pathname === "/" || location.pathname === "/ticker";

  return (
    <div className="font-sans">
      <div className="relative z-[60]">
        <Ticker />
      </div>
      {/* Backdrop */}
      <div
        className={`fixed inset-0 bg-black/10 backdrop-blur-md transition-opacity duration-300 z-30 pointer-events-none ${
          activeDropdown ? "opacity-100" : "opacity-0"
        }`}
      />

      {/* Navbar */}
      <div
        className={`fixed left-0 right-0 z-50 mx-2 transition-all duration-500 ease-in-out rounded-3xl
        ${
          scrolled
            ? "bg-white/10 backdrop-blur-lg shadow-xl border border-black/10"
            : "bg-transparent shadow-none border-transparent"
        }`}
        style={{
          top: hasTicker && !scrolled ? "58px" : "0px",
          transform: navVisible ? "translateY(0)" : "translateY(-200%)",
        }}
      >
        <nav className="px-6 lg:px-10 h-14 flex items-center justify-between relative">
          {/* Logo */}
          <a
            href="#"
            className="text-xl font-black tracking-tight text-white flex items-center gap-0.5"
            style={{ fontFamily: "'Arial Black', sans-serif" }}
          >
            Rise at Seven
            <span className="text-[#5dffc2] text-2xl leading-none -mt-1">
              ╲
            </span>
          </a>

          {/* Desktop Nav Links */}
          <div className="hidden lg:flex items-center gap-6">
            {navItems.map((item) => (
              <a
                key={item.label}
                href="#"
                onMouseEnter={() => handleNavEnter(item.label)}
                onMouseLeave={handleNavLeave}
                className={`text-lg font-medium transition-colors duration-150 relative flex items-center gap-1 ${
                  activeDropdown === item.label
                    ? "text-white"
                    : "text-white hover:text-white"
                }`}
              >
                {item.label}
                {item.hasPlus && (
                  <span className="text-white text-md font-bold">+</span>
                )}
                {item.badge && (
                  <span className="ml-1 bg-[#5dffc2] text-black text-[10px] font-bold rounded-full w-4 h-4 flex items-center justify-center leading-none">
                    {item.badge}
                  </span>
                )}
              </a>
            ))}
          </div>

          {/* CTA Button */}
          <a
            href="#"
            onMouseEnter={handleEnter}
            onMouseLeave={handleLeave}
            className="group hidden lg:flex items-center gap-2 bg-white  text-black text-sm font-semibold px-5 py-2 rounded-full overflow-hidden transition-all duration-100 hover:rounded-[14px] hover:border-black/60 will-change-transform"
          >
            <span className="relative h-5 w-[110px] overflow-hidden flex items-center">
              <span
                ref={topRef}
                className="absolute inset-0 flex gap-1 items-center justify-center"
              >
                Get In Touch
                <FiArrowUpRight className=" -rotate-5 text-xl" />
              </span>
              <span
                ref={bottomRef}
                className="absolute inset-0 flex  gap-1 items-center justify-center"
                style={{ transform: "translateY(100%)", opacity: 0 }}
              >
                Get In Touch
                <FiArrowUpRight className=" -rotate-5 text-xl" />
              </span>
            </span>
          </a>

          {/* Mobile Hamburger Button */}
          <button
            onClick={toggleMobileMenu}
            className="lg:hidden p-2 rounded-xl text-4xl hover:bg-black/5 transition-colors z-50"
          >
            =
          </button>

          {/* Dropdown (Desktop) */}
          {activeDropdown && (
            <div
              onMouseEnter={handleDropdownEnter}
              onMouseLeave={handleDropdownLeave}
              className="absolute top-full left-0 right-0 z-40 px-0 hidden lg:block"
            >
              <DropdownPanel activeItem={activeDropdown} />
            </div>
          )}
        </nav>
      </div>

      {/* ===================== MOBILE MENU ===================== */}
      {isMobileMenuOpen && (
        <>
          {/* Dark Blur Background */}
          <div
            onClick={() => setIsMobileMenuOpen(false)}
            className="fixed inset-0 bg-black/40 backdrop-blur-md z-40"
          />

          {/* Floating Menu Card */}
          <div className="fixed top-6 left-4 right-4 z-50 lg:hidden">
            <div className="bg-[#2b2b2b]/90 backdrop-blur-xl rounded-3xl p-6 text-white shadow-2xl">
              {/* Header */}
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-lg font-semibold">Rise at Seven</h2>
                <button onClick={() => setIsMobileMenuOpen(false)}>✕</button>
              </div>

              {/* Menu Items */}
              <div className="flex flex-col gap-5">
                {navItems.map((item) => (
                  <div
                    key={item.label}
                    className="flex items-center justify-between text-2xl font-semibold"
                  >
                    <span>{item.label}</span>

                    {/* Arrow Icon */}
                    {item.hasPlus && (
                      <span className="text-white border rounded-full text-sm">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          stroke-width="2"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          className="lucide lucide-chevron-down-icon lucide-chevron-down"
                        >
                          <path d="m6 9 6 6 6-6" />
                        </svg>
                      </span>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
