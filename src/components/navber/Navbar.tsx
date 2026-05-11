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

  const textColor = scrolled ? "text-black" : "text-white";

  return (
    <div className="font-sans">
      <div className="relative ">
        <Ticker />
      </div>
      {/* Backdrop */}
      <div
        className={`fixed inset-0 bg-black/10 backdrop-blur-md transition-opacity duration-300 z-30 pointer-events-none ${
          activeDropdown ? "opacity-100 " : "opacity-0"
        }`}
      />

      {/* Navbar */}
      <div
        className={`fixed left-0 right-0 z-50 mx-2 transition-all duration-500 ease-in-out rounded-3xl
  ${
    scrolled
      ? "bg-white/10 backdrop-blur-[0.2em] text-black shadow-xl border border-black/10"
      : "bg-transparent shadow-none text-white border-transparent"
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
            className={`text-xl font-black tracking-tight flex items-center gap-0.5 ${textColor}`}
            style={{ fontFamily: "'Arial Black', sans-serif" }}
          >
               <svg
            className="w-full h-full object-contain fill-current"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 168 21"
          >
            <path d="M91.3152 5.40061C91.3152 3.94241 92.5306 2.67359 93.9881 2.67359C95.7162 2.67359 96.797 3.83419 96.797 5.56225H99.7127C99.7127 2.1873 97.3096 0 93.9874 0C90.9371 0 88.3988 2.32257 88.3988 5.42766C88.3988 9.31596 90.883 10.2344 93.9874 11.4221C95.6627 12.07 97.2007 12.5563 97.2007 14.6895C97.2007 16.634 95.9867 18.0651 93.9874 18.0651C91.8813 18.0651 90.7477 16.3905 90.7477 14.446H87.832C87.832 18.0651 90.3426 20.7381 93.9874 20.7381C97.6323 20.7381 100.118 18.2816 100.118 14.6895C100.118 7.10161 91.3145 9.64061 91.3145 5.40061H91.3152Z"></path>
            <path d="M109.209 4.99609C104.834 4.99609 101.539 8.53405 101.539 12.8539C101.539 17.1737 104.888 20.738 109.155 20.738C112.422 20.738 115.203 18.713 116.337 15.662H113.529C112.718 17.2278 111.017 18.1733 109.262 18.1733C106.806 18.1733 104.915 16.4182 104.348 14.0963H116.743C116.797 13.6371 116.823 13.1508 116.823 12.6922C116.823 8.47926 113.447 4.99609 109.209 4.99609ZM104.348 11.9361C104.509 9.47823 106.751 7.56147 109.181 7.56147C111.611 7.56147 113.853 9.47823 114.014 11.9361H104.348Z"></path>
            <path d="M127.476 5.40039L123.575 16.0941L119.673 5.40039H116.676L122.617 20.3598H124.588L130.475 5.40039H127.476Z"></path>
            <path d="M137.942 4.99609C133.567 4.99609 130.273 8.53405 130.273 12.8539C130.273 17.1737 133.621 20.738 137.888 20.738C141.155 20.738 143.936 18.713 145.071 15.662H142.262C141.453 17.2278 139.75 18.1733 137.996 18.1733C135.538 18.1733 133.649 16.4182 133.081 14.0963H145.476C145.53 13.6371 145.556 13.1508 145.556 12.6922C145.556 8.47926 142.182 4.99609 137.942 4.99609ZM133.081 11.9361C133.243 9.47823 135.484 7.56147 137.915 7.56147C140.347 7.56147 142.586 9.47823 142.749 11.9361H133.081Z"></path>
            <path d="M147.473 8.21195V8.69013V20.3618H150.032V10.1815L167.216 20.3618V17.2405L147.473 5.40039V8.21195Z"></path>
            <path d="M67.8431 7.50804H67.789C66.6818 5.80635 64.7103 4.99609 62.713 4.99609C58.1775 4.99609 54.7734 8.3981 54.7734 12.935C54.7734 17.4719 58.2296 20.7387 62.713 20.7387C64.7651 20.7387 66.7359 19.8473 67.789 18.0387H67.8431V20.3606H70.652V5.40122H67.8431V7.50804ZM62.686 18.1733C59.823 18.1733 57.5823 15.7168 57.5823 12.9073C57.5823 10.0978 59.7425 7.56079 62.7124 7.56079C65.6822 7.56079 67.8972 9.90973 67.8972 12.9073C67.8972 15.9048 65.6024 18.1733 62.6867 18.1733H62.686Z"></path>
            <path d="M77.5832 0.378906H74.7736V5.40144H72.75V7.96681H74.7736V20.3608H77.5832V7.96681H80.0403V5.40144H77.5832V0.378906Z"></path>
            <path d="M18.3089 0.378906H15.5V3.2953H18.3089V0.378906Z"></path>
            <path d="M18.3089 5.02344H15.5V19.9828H18.3089V5.02344Z"></path>
            <path d="M25.8409 10.7205C24.8142 10.3959 23.5183 10.0996 23.5183 8.77603C23.5183 7.77639 24.3279 7.18256 25.2728 7.18256C26.4077 7.18256 27.0549 7.91166 27.1895 8.99178H29.9984C29.9443 6.39935 27.9727 4.61719 25.4087 4.61719C22.8447 4.61719 20.7088 6.3723 20.7088 8.93767C20.7088 14.2307 27.5412 12.6102 27.5412 15.743C27.5412 17.0389 26.6227 17.7951 25.381 17.7951C23.707 17.7951 22.9516 16.6074 22.8427 15.0681H20.0352C20.0352 17.417 21.1951 19.2269 23.4094 20.0094C24.0303 20.2252 24.6789 20.3604 25.3262 20.3604C28.1892 20.3604 30.3494 18.5248 30.3494 15.5807C30.3494 12.6366 28.296 11.476 25.8402 10.7205H25.8409Z"></path>
            <path d="M39.3637 4.61719C34.9891 4.61719 31.6953 8.15514 31.6953 12.475C31.6953 16.7948 35.0432 20.3591 39.3096 20.3591C42.577 20.3591 45.3581 18.3341 46.493 15.2831H43.6842C42.8746 16.8489 41.1722 17.7944 39.4178 17.7944C36.96 17.7944 35.0709 16.0393 34.5028 13.7174H46.8975C46.9516 13.2582 46.978 12.7719 46.978 12.3133C46.978 8.10036 43.6037 4.61719 39.3637 4.61719ZM34.5028 11.5565C34.6651 9.09864 36.9059 7.18188 39.3373 7.18188C41.7688 7.18188 44.0075 9.09932 44.1705 11.5565H34.5028Z"></path>
            <path d="M9.55945 12.1512C12.1519 11.2327 13.3395 9.09953 13.3395 6.39957C13.3395 4.67151 12.7728 2.88934 11.5046 1.67395C10.0998 0.297591 8.07419 0 6.18314 0H0V19.9826H2.91572V13.8069L13.3389 19.9826V16.8606L6.22575 12.5949L7.61496 12.5293C8.26222 12.5293 8.96359 12.3676 9.55809 12.1512H9.55945ZM4.91499 10.3156H2.91572V2.67359H5.99444C8.317 2.67359 10.4231 3.86192 10.4231 6.40024C10.4231 9.5865 7.50742 10.3156 4.91499 10.3156Z"></path>
            <path d="M164.759 7.94414L166.061 8.71517V8.08955L165.395 7.69051C165.437 7.68172 165.48 7.66954 165.521 7.65466C165.869 7.53157 166.061 7.24209 166.061 6.84034C166.061 6.57725 165.966 6.33579 165.801 6.17753C165.583 5.9638 165.277 5.93945 165.065 5.93945H164.191V8.63807H164.758V7.94346L164.759 7.94414ZM164.908 7.22856H164.76V6.47715H165.043C165.261 6.47715 165.495 6.57251 165.495 6.84102C165.495 7.10953 165.297 7.22856 164.908 7.22856H164.908Z"></path>
            <path d="M165.127 10.1622C166.714 10.1622 168 8.87583 168 7.28913C168 5.70242 166.714 4.41602 165.127 4.41602C163.54 4.41602 162.254 5.70242 162.254 7.28913C162.254 8.87583 163.54 10.1622 165.127 10.1622ZM165.127 5.22763C166.264 5.22763 167.189 6.15219 167.189 7.28913C167.189 8.42606 166.264 9.35062 165.127 9.35062C163.99 9.35062 163.066 8.42606 163.066 7.28913C163.066 6.15219 163.99 5.22763 165.127 5.22763Z"></path>
          </svg>
          </a>

          {/* Desktop Nav Links */}
          <div className="hidden lg:flex items-center gap-6">
            {navItems.map((item) => (
              <a
                key={item.label}
                href="#"
                onMouseEnter={() => handleNavEnter(item.label)}
                onMouseLeave={handleNavLeave}
                className={`text-lg font-medium transition-colors duration-300 relative flex items-center gap-1
  ${scrolled ? "text-black hover:text-black" : "text-white hover:text-white"}
  ${activeDropdown === item.label ? "opacity-100" : "opacity-90"}
`}
              >
                {item.label}
                {item.hasPlus && (
                  <span
                    className={`text-md font-bold transition-colors duration-300 ${
                      scrolled ? "text-black" : "text-white"
                    }`}
                  >
                    +
                  </span>
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
            className={`group hidden lg:flex items-center gap-2 text-sm font-semibold px-5 py-3 rounded-full overflow-hidden transition-all duration-300 hover:rounded-[14px] hover:border-black/60 will-change-transform
  ${scrolled ? "bg-black text-white" : "bg-white text-black"}`}
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
              className="absolute top-full left-0 right-0 z-400 px-0 hidden lg:block"
            >
              <DropdownPanel activeItem={activeDropdown} />
            </div>
          )}
        </nav>
      </div>

      {/* ===================== MOBILE MENU ===================== */}
      {isMobileMenuOpen && (
        <>
          {/* Backdrop */}
          <div
            onClick={() => setIsMobileMenuOpen(false)}
            className="fixed inset-0 bg-black/40 backdrop-blur-md  z-40"
          />

          {/* Mobile Panel */}
          <div className="fixed inset-0 z-50 lg:hidden p-4">
            {/* Card */}
            <div className="h-full bg-[#2b2b2b]/90 backdrop-blur-xl rounded-3xl p-6 text-white flex flex-col">
              {/* Header */}
              <div className="flex justify-between items-center mb-8">
                <h2 className="text-lg font-semibold">Rise at Seven</h2>
                <button onClick={() => setIsMobileMenuOpen(false)}>✕</button>
              </div>

              {/* MENU ITEMS (scrollable area) */}
              <div className="flex-1 flex flex-col gap-6 overflow-y-auto">
                {navItems.map((item) => (
                  <div
                    key={item.label}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="flex items-center justify-between text-3xl font-semibold cursor-pointer"
                  >
                    <span>{item.label}</span>

                    {item.hasPlus && (
                      <span className="border rounded-full text-sm p-1">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <path d="m6 9 6 6 6-6" />
                        </svg>
                      </span>
                    )}
                  </div>
                ))}
              </div>

              {/* BOTTOM CTA (fixed feel) */}
              <a
                href="#"
                className={`mt-6 flex items-center justify-center gap-2 text-sm font-semibold px-5 py-3 rounded-full transition-all
            ${scrolled ? "bg-black text-white" : "bg-white text-black"}`}
              >
                Get In Touch
                <FiArrowUpRight className="-rotate-5 text-xl" />
              </a>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
