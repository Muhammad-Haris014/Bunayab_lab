"use client";

import { Space_Grotesk, DM_Sans } from "next/font/google";
import { cn } from "@/lib/utils";
import { Mail, Phone, ArrowUpRight } from "lucide-react";
import { Logomark } from "@/components/ui/logomark";

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  weight: ["500", "600", "700"],
  variable: "--font-heading",
});

const dmSans = DM_Sans({
  subsets: ["latin"],
  weight: ["300", "400", "500"],
  variable: "--font-body",
});

const CONTACT_EMAIL = "bunyadlab@gmail.com";
const PHONE_DISPLAY = "0328 6679186";
const PHONE_TEL = "+923286679186";
const INSTAGRAM_URL = "https://www.instagram.com/bunyadlab.online";
const INSTAGRAM_HANDLE = "@bunyadlab.online";

// lucide dropped brand icons; drawn to match its 24px / stroke-2 style
const InstagramIcon = ({ className }: { className?: string }) => (
  <svg
    className={className}
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
    <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
  </svg>
);

const SECTION_LINKS = [
  { label: "Overview", href: "#overview" },
  { label: "About", href: "#about" },
  { label: "Services", href: "#services" },
  { label: "Work", href: "#work" },
  { label: "Contact", href: "#contact" },
];

const SERVICE_LINKS = [
  "Website Development",
  "Digital Marketing",
  "SEO",
  "Branding & Design",
  "Web Applications",
];

export const SiteFooter = () => {
  return (
    <footer
      className={cn(
        spaceGrotesk.variable,
        dmSans.variable,
        "font-[family-name:var(--font-body)] relative border-t border-white/10 bg-black"
      )}
    >
      <div className="mx-auto max-w-6xl px-6 py-14 md:py-16 xl:px-8">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-2 lg:grid-cols-4">
          {/* Brand */}
          <div className="lg:col-span-2 lg:pr-12">
            <div className="flex items-center gap-2.5">
              <Logomark />
              <span
                className={cn(
                  spaceGrotesk.className,
                  "text-sm uppercase tracking-[0.25em] text-white"
                )}
              >
                Bunyad Lab
              </span>
            </div>
            <p className="mt-4 max-w-sm text-sm leading-relaxed text-white/50">
              A digital agency crafting websites, marketing, and growth
              solutions — built to perform. From first pixel to full-scale
              growth.
            </p>
            <div className="mt-6 flex items-center gap-3">
              <a
                href={INSTAGRAM_URL}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`Instagram ${INSTAGRAM_HANDLE}`}
                className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/5 text-white/60 transition-all duration-300 hover:border-red-500/50 hover:bg-red-500 hover:text-white hover:shadow-[0_0_20px_-4px_rgba(239,68,68,0.7)] cursor-pointer"
              >
                <InstagramIcon className="h-4.5 w-4.5" />
              </a>
              <a
                href={`tel:${PHONE_TEL}`}
                aria-label={`Call ${PHONE_DISPLAY}`}
                className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/5 text-white/60 transition-all duration-300 hover:border-red-500/50 hover:bg-red-500 hover:text-white hover:shadow-[0_0_20px_-4px_rgba(239,68,68,0.7)] cursor-pointer"
              >
                <Phone className="h-4 w-4" aria-hidden="true" />
              </a>
              <a
                href={`mailto:${CONTACT_EMAIL}`}
                aria-label={`Email ${CONTACT_EMAIL}`}
                className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/5 text-white/60 transition-all duration-300 hover:border-red-500/50 hover:bg-red-500 hover:text-white hover:shadow-[0_0_20px_-4px_rgba(239,68,68,0.7)] cursor-pointer"
              >
                <Mail className="h-4 w-4" aria-hidden="true" />
              </a>
            </div>
          </div>

          {/* Explore */}
          <div>
            <h4
              className={cn(
                spaceGrotesk.className,
                "text-xs uppercase tracking-[0.25em] text-red-500"
              )}
            >
              Explore
            </h4>
            <ul className="mt-4 space-y-2.5">
              {SECTION_LINKS.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="text-sm text-white/50 transition-colors hover:text-white cursor-pointer"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Services + contact */}
          <div>
            <h4
              className={cn(
                spaceGrotesk.className,
                "text-xs uppercase tracking-[0.25em] text-red-500"
              )}
            >
              Services
            </h4>
            <ul className="mt-4 space-y-2.5">
              {SERVICE_LINKS.map((label) => (
                <li key={label}>
                  <a
                    href="#services"
                    className="text-sm text-white/50 transition-colors hover:text-white cursor-pointer"
                  >
                    {label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-white/10 pt-7 sm:flex-row">
          <p
            className={cn(
              spaceGrotesk.className,
              "text-xs uppercase tracking-[0.25em] text-white/40"
            )}
          >
            Bunyad Lab © {new Date().getFullYear()}
          </p>
          <a
            href="#contact"
            className="group/link flex items-center gap-1.5 text-sm text-white/50 transition-colors hover:text-red-400 cursor-pointer"
          >
            Start your project
            <ArrowUpRight
              className="h-4 w-4 transition-transform duration-300 group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5"
              aria-hidden="true"
            />
          </a>
        </div>
      </div>
    </footer>
  );
};

export default SiteFooter;
