"use client";

import React, { useState, useEffect } from "react";

const navLinks = [
  { name: "Home", href: "#home" },
  { name: "About", href: "#about" },
  { name: "Services", href: "#services" },
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
      // Background transition
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }

      // Active section highlighting
      const sections = navLinks.map(link => link.href.substring(1));
      // Add 'exterior' to sections to track for active state even if not in main links
      sections.push("exterior"); 
      
      let current = "home";

      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          // Adjust this offset based on header height + some padding
          if (rect.top <= 120) {
            current = section;
          }
        }
      }
      
      // If we are deep into the exterior section, the nearest link might be doctor or contact,
      // mapping 'exterior' to keep either doctor active or nothing. Since 'exterior' isn't in navLinks,
      // we can optionally map it to 'doctor' or just let it fall through.
      setActiveSection(current);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll(); // initialize

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Smooth scroll handler
  const handleScrollTo = (e: React.MouseEvent<HTMLAnchorElement>, targetId: string) => {
    e.preventDefault();
    setMobileMenuOpen(false);
    
    const target = document.getElementById(targetId);
    if (target) {
      const headerOffset = 80; // approximate header height
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
          : "bg-transparent py-6"
      }`}
      aria-label="Main navigation"
    >
      <div className="max-w-[1400px] mx-auto px-6 md:px-12 flex justify-between items-center">
        
        {/* Logo Text */}
        <a 
          href="#home" 
          onClick={(e) => handleScrollTo(e, "home")}
          className="flex flex-col group"
        >
          <span className="text-[#CBA135] font-semibold tracking-[0.2em] uppercase text-sm md:text-base group-hover:text-white transition-colors duration-300">
            Golden Dental Clinic
          </span>
        </a>

        {/* Desktop Links */}
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
            className="bg-[#CBA135] hover:bg-[#D4AF37] text-[#0A0A0A] font-semibold uppercase tracking-wider text-xs px-6 py-3 rounded-sm transition-colors duration-300 shadow-lg ml-4"
          >
            BOOK APPOINTMENT
          </a>
        </div>

        {/* Mobile Hamburger Button */}
        <button
          className="lg:hidden text-white p-2"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-expanded={mobileMenuOpen}
          aria-label="Toggle navigation menu"
        >
          <div className="w-6 h-5 flex flex-col justify-between items-center relative">
            <span className={`w-full h-[2px] bg-white rounded transition-all duration-300 ${mobileMenuOpen ? "rotate-45 translate-y-[9px]" : ""}`} />
            <span className={`w-full h-[2px] bg-[#CBA135] rounded transition-all duration-300 ${mobileMenuOpen ? "opacity-0" : ""}`} />
            <span className={`w-full h-[2px] bg-white rounded transition-all duration-300 ${mobileMenuOpen ? "-rotate-45 -translate-y-[9px]" : ""}`} />
          </div>
        </button>

      </div>

      {/* Mobile Menu Dropdown */}
      <div 
        className={`lg:hidden absolute top-full left-0 w-full bg-[#0A0A0A]/95 backdrop-blur-lg border-b border-white/10 transition-all duration-500 ease-in-out overflow-hidden shadow-2xl ${
          mobileMenuOpen ? "max-h-[500px] opacity-100" : "max-h-0 opacity-0 pointer-events-none"
        }`}
      >
        <div className="flex flex-col px-6 py-6 space-y-6">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              onClick={(e) => handleScrollTo(e, link.href.substring(1))}
              className={`text-sm tracking-widest uppercase font-medium transition-colors ${
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
            className="bg-[#CBA135] hover:bg-[#D4AF37] text-[#0A0A0A] font-semibold uppercase tracking-wider text-xs px-6 py-4 rounded-sm transition-colors duration-300 text-center shadow-lg mt-4"
          >
            BOOK APPOINTMENT
          </a>
        </div>
      </div>
    </nav>
  );
}
