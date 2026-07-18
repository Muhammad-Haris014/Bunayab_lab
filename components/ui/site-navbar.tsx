"use client";

import React, { useState, useRef, useEffect } from "react";
import { Space_Grotesk, DM_Sans } from "next/font/google";
import { cn } from "@/lib/utils";
import { Logomark } from "@/components/ui/logomark";

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  weight: ["500", "600", "700"],
  variable: "--font-heading",
});

const dmSans = DM_Sans({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-body",
});

const COMPANY_NAME = "Bunyad Lab";

const NAV_LINKS = [
  { label: "Overview", href: "#overview" },
  { label: "About", href: "#about" },
  { label: "Services", href: "#services" },
  { label: "Work", href: "#work" },
];

const AnimatedNavLink = ({
  href,
  children,
}: {
  href: string;
  children: React.ReactNode;
}) => {
  return (
    <a
      href={href}
      className="group relative inline-block overflow-hidden h-5 text-sm cursor-pointer"
    >
      <div className="flex flex-col transition-transform duration-300 ease-out group-hover:-translate-y-1/2">
        <span className="h-5 leading-5 text-gray-300">{children}</span>
        <span className="h-5 leading-5 text-white">{children}</span>
      </div>
    </a>
  );
};

export const SiteNavbar = ({ className }: { className?: string }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [headerShapeClass, setHeaderShapeClass] = useState("rounded-full");
  const shapeTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const setMenuOpen = (open: boolean) => {
    setIsOpen(open);
    if (shapeTimeoutRef.current) {
      clearTimeout(shapeTimeoutRef.current);
    }
    if (open) {
      setHeaderShapeClass("rounded-xl");
    } else {
      // keep the panel corners squared until the collapse animation finishes
      shapeTimeoutRef.current = setTimeout(() => {
        setHeaderShapeClass("rounded-full");
      }, 300);
    }
  };

  const toggleMenu = () => setMenuOpen(!isOpen);

  useEffect(() => {
    return () => {
      if (shapeTimeoutRef.current) {
        clearTimeout(shapeTimeoutRef.current);
      }
    };
  }, []);

  const contactButton = (
    <div className="relative group w-full sm:w-auto">
      <div
        className="absolute inset-0 -m-2 rounded-full
                   hidden sm:block
                   bg-gray-100
                   opacity-40 filter blur-lg pointer-events-none
                   transition-all duration-300 ease-out
                   group-hover:opacity-60 group-hover:blur-xl group-hover:-m-3"
      />
      <a
        href="#contact"
        className="relative z-10 inline-flex justify-center px-4 py-2 sm:px-4 text-xs sm:text-sm font-semibold text-black bg-gradient-to-br from-gray-100 to-gray-300 rounded-full hover:from-gray-200 hover:to-gray-400 transition-all duration-200 w-full sm:w-auto cursor-pointer"
      >
        Contact Us
      </a>
    </div>
  );

  return (
    <header
      className={cn(
        spaceGrotesk.variable,
        dmSans.variable,
        "font-[family-name:var(--font-body)]",
        "fixed top-6 left-1/2 -translate-x-1/2 z-40",
        "flex flex-col items-center",
        "pl-5 pr-5 py-3 backdrop-blur-sm",
        headerShapeClass,
        "border border-[#333] bg-[#1f1f1f57]",
        "w-[calc(100%-2rem)] sm:w-auto",
        "transition-[border-radius] duration-300 ease-in-out",
        className
      )}
    >
      <div className="flex items-center justify-between w-full gap-x-6 sm:gap-x-8">
        <a href="#" className="flex items-center gap-2.5 cursor-pointer">
          <Logomark />
          <span className="font-[family-name:var(--font-heading)] text-xs sm:text-sm tracking-[0.25em] text-white uppercase whitespace-nowrap">
            {COMPANY_NAME}
          </span>
        </a>

        <nav className="hidden sm:flex items-center space-x-4 lg:space-x-6 text-sm">
          {NAV_LINKS.map((link) => (
            <AnimatedNavLink key={link.href} href={link.href}>
              {link.label}
            </AnimatedNavLink>
          ))}
        </nav>

        <div className="hidden sm:flex items-center">{contactButton}</div>

        <button
          className="sm:hidden flex items-center justify-center w-8 h-8 text-gray-300 focus:outline-none cursor-pointer"
          onClick={toggleMenu}
          aria-label={isOpen ? "Close Menu" : "Open Menu"}
          aria-expanded={isOpen}
        >
          {isOpen ? (
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          ) : (
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          )}
        </button>
      </div>

      <div
        className={`sm:hidden flex flex-col items-center w-full transition-all ease-in-out duration-300 overflow-hidden
                    ${isOpen ? "max-h-[1000px] opacity-100 pt-4" : "max-h-0 opacity-0 pt-0 pointer-events-none"}`}
      >
        <nav className="flex flex-col items-center space-y-4 text-base w-full">
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={() => setMenuOpen(false)}
              className="text-gray-300 hover:text-white transition-colors w-full text-center cursor-pointer"
            >
              {link.label}
            </a>
          ))}
        </nav>
        <div className="flex flex-col items-center space-y-4 mt-4 w-full">
          {contactButton}
        </div>
      </div>
    </header>
  );
};

export default SiteNavbar;
