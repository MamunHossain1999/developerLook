/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";

const socialLinks = [
  {
    name: "Facebook",
    href: "#",
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
        <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
      </svg>
    ),
  },
  {
    name: "X",
    href: "#",
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
      </svg>
    ),
  },
  {
    name: "LinkedIn",
    href: "#",
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
        <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6zM2 9h4v12H2z" />
        <circle cx="4" cy="4" r="2" />
      </svg>
    ),
  },
  {
    name: "YouTube",
    href: "#",
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
        <path d="M22.54 6.42a2.78 2.78 0 0 0-1.95-1.96C18.88 4 12 4 12 4s-6.88 0-8.59.46a2.78 2.78 0 0 0-1.95 1.96A29 29 0 0 0 1 12a29 29 0 0 0 .46 5.58 2.78 2.78 0 0 0 1.95 1.95C5.12 20 12 20 12 20s6.88 0 8.59-.47a2.78 2.78 0 0 0 1.95-1.95A29 29 0 0 0 23 12a29 29 0 0 0-.46-5.58z" />
        <polygon fill="#000" points="9.75 15.02 15.5 12 9.75 8.98 9.75 15.02" />
      </svg>
    ),
  },
  {
    name: "TikTok",
    href: "#",
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
        <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-2.88 2.5 2.89 2.89 0 0 1-2.89-2.89 2.89 2.89 0 0 1 2.89-2.89c.28 0 .54.04.79.1V9.01a6.32 6.32 0 0 0-.79-.05 6.34 6.34 0 0 0-6.34 6.34 6.34 6.34 0 0 0 6.34 6.34 6.34 6.34 0 0 0 6.33-6.34V8.69a8.18 8.18 0 0 0 4.78 1.52V6.76a4.85 4.85 0 0 1-1.01-.07z" />
      </svg>
    ),
  },
  {
    name: "Instagram",
    href: "#",
    icon: (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        className="w-4 h-4"
      >
        <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
        <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
        <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
      </svg>
    ),
  },
];

const navLinks = {
  col1: [
    { label: "Services", href: "#" },
    { label: "Work", href: "#" },
    { label: "About", href: "#" },
    { label: "Culture", href: "#" },
    { label: "Meet The Risers", href: "#" },
  ],
  col2: [
    { label: "Testimonials", href: "#" },
    { label: "Blog", href: "#" },
    { label: "Webinars", href: "#" },
    { label: "Careers", href: "#" },
  ],
  col3: [
    { label: "Sheffield", href: "#" },
    { label: "Manchester", href: "#" },
    { label: "London", href: "#" },
    { label: "New York", href: "#" },
    { label: "Contact", href: "#" },
  ],
};

export default function Footer() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: any) => {
    e.preventDefault();
    if (email.trim()) {
      setSubmitted(true);
      setTimeout(() => setSubmitted(false), 3000);
      setEmail("");
    }
  };

  return (
    <footer className="bg-[#0a0a0a] text-white font-sans w-full">
      {/* Top Section */}
      <div className="px-6 md:px-10 lg:px-14 pt-14 pb-10 border-b border-white/10">
        <div className="flex flex-col lg:flex-row gap-12 lg:gap-0 justify-between">
          {/* Newsletter */}
          <div className="lg:w-64 flex-shrink-0">
            <h3 className="text-base font-semibold text-white mb-5 leading-snug">
              Stay updated with Rise news
            </h3>

            {/* Email Input */}
            <form onSubmit={handleSubmit} className="relative mb-6">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Your Email Address"
                className="w-full bg-white/10 text-white placeholder-white/40 text-sm px-4 py-3 pr-14 rounded-full border border-white/15 focus:outline-none focus:border-[#5dffc2]/60 transition-colors duration-200"
              />
              <button
                type="submit"
                className="absolute right-1.5 top-1/2 -translate-y-1/2 w-9 h-9 bg-[#5dffc2] hover:bg-[#3debaa] transition-colors duration-200 rounded-full flex items-center justify-center flex-shrink-0 group"
                aria-label="Subscribe"
              >
                <svg
                  className="w-4 h-4 text-black -rotate-45 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-150"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M5 12h14M12 5l7 7-7 7"
                  />
                </svg>
              </button>
            </form>

            {submitted && (
              <p className="text-[#5dffc2] text-sm -mt-3 mb-4 animate-pulse">
                Thanks for subscribing!
              </p>
            )}

            {/* Social Icons */}
            <div className="flex flex-wrap gap-2">
              {socialLinks.map((s) => (
                <a
                  key={s.name}
                  href={s.href}
                  aria-label={s.name}
                  className="w-8 h-8 rounded-full border border-white/20 flex items-center justify-center text-white/60 hover:text-white hover:border-white/50 transition-all duration-200"
                >
                  {s.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Nav Columns */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-8 lg:gap-16 lg:ml-auto">
            {/* Col 1 */}
            <div>
              <ul className="space-y-3">
                {navLinks.col1.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      className="text-white/80 hover:text-white text-sm font-medium tracking-wide transition-colors duration-200"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Col 2 */}
            <div>
              <ul className="space-y-3">
                {navLinks.col2.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      className="text-white/80 hover:text-white text-sm font-medium tracking-wide transition-colors duration-200"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Col 3 */}
            <div>
              <ul className="space-y-3">
                {navLinks.col3.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      className="text-white/80 hover:text-white text-sm font-medium tracking-wide transition-colors duration-200"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Giant Brand Name */}
      <div className="px-4 sm:px-6 py-6 overflow-hidden">
        <h1
          className="text-[clamp(72px,15vw,200px)] font-black leading-none tracking-tighter text-white select-none"
          style={{
            fontFamily: "'Arial Black', 'Arial', sans-serif",
            letterSpacing: "-0.03em",
          }}
        >
          Rise at Seven
          <span className="text-[0.55em] align-super">®</span>
        </h1>
      </div>

      {/* Bottom Bar */}
      <div className="px-6 md:px-10 lg:px-14 py-4 border-t border-white/10 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 text-white/40 text-xs">
        <div className="flex flex-wrap gap-x-4 gap-y-1 items-center">
          <span>© 2025 Rise at Seven Ltd. All rights reserved</span>
          <span className="hidden sm:inline">•</span>
          <span>Company Number 11955187</span>
          <span className="hidden sm:inline">•</span>
          <span>VAT Registered GB 322402945</span>
          <span className="hidden sm:inline">•</span>
          <a
            href="#"
            className="hover:text-white/70 transition-colors duration-200"
          >
            Privacy Policy
          </a>
          <span className="hidden sm:inline">•</span>
          <a
            href="#"
            className="hover:text-white/70 transition-colors duration-200"
          >
            Terms &amp; conditions
          </a>
        </div>
        <span className="text-white/30 hover:text-white/50 transition-colors duration-200 cursor-default">
          Website MadeByShape
        </span>
      </div>
    </footer>
  );
}
