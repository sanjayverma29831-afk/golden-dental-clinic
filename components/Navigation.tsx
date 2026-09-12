"use client";

import React, { useState, useEffect } from "react";

const navLinks = [
  { name: "Home", href: "#home" },
  { name: "About", href: "#about" },
  { name: "Treatments", href: "#services" },
  { name: "Doctor", href: "#doctor" },
  { name: "Contact", href: "#contact" },
];

export function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("home");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Handle scroll logic for sticky bg and active sections
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }

      const sections = navLinks.map(link => link.href.substring(1));
      
      let current = "home";

      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          if (rect.top <= 120) {
            current = section;
          }
        }
      }
      
      setActiveSection(current);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleScrollTo = (e: React.MouseEvent<HTMLAnchorElement>, targetId: string) => {
    e.preventDefault();
    setMobileMenuOpen(false);
    
    const target = document.getElementById(targetId);
    if (target) {
      const headerOffset = 80;
      const elementPosition = target.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.scrollY - headerOffset;
  
      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth"
      });
    }
  };

  return (
    <nav 
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ease-in-out ${
        isScrolled 
          ? "bg-[#0A0A0A]/95 backdrop-blur-md border-b border-white/5 py-4 shadow-lg" 
          : "bg-transparent py-4 md:py-6"
      }`}
      aria-label="Main navigation"
    >
      <div className="max-w-[1400px] mx-auto px-4 md:px-12 flex justify-between items-center w-full">
        
        {/* Logo Text */}
        <a 
          href="#home" 
          onClick={(e) => handleScrollTo(e, "home")}
          className="flex flex-col group flex-shrink-0 z-50"
        >
          <span className="text-[#CBA135] font-semibold tracking-[0.15em] sm:tracking-[0.2em] uppercase text-xs sm:text-sm md:text-base group-hover:text-white transition-colors duration-300">
            Golden Dental Clinic
          </span>
        </a>

        {/* Desktop Links - STRICTLY HIDDEN ON MOBILE */}
        <div className="hidden lg:flex items-center space-x-8">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              onClick={(e) => handleScrollTo(e, link.href.substring(1))}
              className={`text-xs xl:text-sm tracking-widest uppercase font-medium transition-colors duration-300 ${
                activeSection === link.href.substring(1)
                  ? "text-[#CBA135]"
                  : "text-neutral-300 hover:text-white"
              }`}
            >
              {link.name}
            </a>
          ))}
          
          <a
            href="#booking"
            onClick={(e) => handleScrollTo(e, "booking")}
            className="bg-[#CBA135] hover:bg-[#D4AF37] text-[#0A0A0A] font-semibold uppercase tracking-wider text-xs px-6 py-3 rounded-sm transition-colors duration-300 shadow-lg ml-4 whitespace-nowrap"
          >
            BOOK APPOINTMENT
          </a>
        </div>

        {/* Mobile Hamburger Button */}
        <button
          className="lg:hidden text-white flex items-center justify-center w-[44px] h-[44px] z-50 rounded-md focus:outline-none focus:ring-2 focus:ring-[#CBA135] transition-colors bg-black/20"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-expanded={mobileMenuOpen}
          aria-label="Toggle navigation menu"
        >
          <div className="w-6 h-5 flex flex-col justify-between items-center relative">
            <span className={`w-full h-[2px] bg-white rounded transition-all duration-300 origin-center ${mobileMenuOpen ? "rotate-45 translate-y-[9px]" : ""}`} />
            <span className={`w-full h-[2px] bg-[#CBA135] rounded transition-all duration-300 ${mobileMenuOpen ? "opacity-0 scale-x-0" : ""}`} />
            <span className={`w-full h-[2px] bg-white rounded transition-all duration-300 origin-center ${mobileMenuOpen ? "-rotate-45 -translate-y-[9px]" : ""}`} />
          </div>
        </button>

      </div>

      {/* Mobile Menu Dropdown */}
      <div 
        className={`lg:hidden absolute top-0 left-0 w-full bg-[#0A0A0A] border-b border-white/10 transition-transform duration-500 ease-in-out shadow-2xl ${
          mobileMenuOpen ? "translate-y-0" : "-translate-y-full"
        }`}
        style={{ zIndex: 40 }}
      >
        <div className="flex flex-col px-6 pt-24 pb-8 space-y-6 max-w-full overflow-hidden">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              onClick={(e) => handleScrollTo(e, link.href.substring(1))}
              className={`text-sm tracking-widest uppercase font-medium transition-colors border-b border-white/5 pb-2 w-full block ${
                activeSection === link.href.substring(1)
                  ? "text-[#CBA135]"
                  : "text-neutral-300 hover:text-white"
              }`}
            >
              {link.name}
            </a>
          ))}
          <a
            href="#booking"
            onClick={(e) => handleScrollTo(e, "booking")}
            className="bg-[#CBA135] hover:bg-[#D4AF37] text-[#0A0A0A] font-semibold uppercase tracking-wider text-xs px-6 py-4 rounded-sm transition-colors duration-300 text-center shadow-lg mt-4 block w-full truncate"
          >
            BOOK APPOINTMENT
          </a>
        </div>
      </div>
    </nav>
  );
}
