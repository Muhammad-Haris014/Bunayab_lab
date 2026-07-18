"use client";

import { useRef, useState } from "react";
import { Space_Grotesk, DM_Sans } from "next/font/google";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import { DotPattern } from "@/components/ui/dot-pattern-1";
import { Calendar, BentoCard } from "@/components/ui/calendar-bento";
import { Mail, Phone, Copy, Check } from "lucide-react";

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
const INSTAGRAM_URL = "https://www.instagram.com/bunyad_lab";
const INSTAGRAM_HANDLE = "@bunyad_lab";

const fadeUp = {
  initial: { opacity: 0, y: 28 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-60px" },
};

const CopyEmailCard = () => {
  const [copied, setCopied] = useState(false);
  const resetTimer = useRef<NodeJS.Timeout | null>(null);

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(CONTACT_EMAIL);
    } catch {
      // clipboard API unavailable (e.g. non-secure context) — fall back to mail client
      window.location.href = `mailto:${CONTACT_EMAIL}`;
      return;
    }
    setCopied(true);
    if (resetTimer.current) clearTimeout(resetTimer.current);
    resetTimer.current = setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div
      role="button"
      tabIndex={0}
      aria-label={`Copy email address ${CONTACT_EMAIL}`}
      onClick={copyEmail}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          copyEmail();
        }
      }}
      className="h-full cursor-pointer"
    >
      <BentoCard height="h-full">
        <div className="flex h-full flex-col">
          <div className="flex h-12 w-12 items-center justify-center rounded-xl border border-white/10 bg-white/5 transition-all duration-300 group-hover:border-red-500/50 group-hover:bg-red-500 group-hover:shadow-[0_0_24px_-4px_rgba(239,68,68,0.7)]">
            <Mail
              className="h-5 w-5 text-red-500 transition-colors duration-300 group-hover:text-white"
              aria-hidden="true"
            />
          </div>
          <h3
            className={cn(
              spaceGrotesk.className,
              "mt-5 text-lg font-semibold text-white md:text-2xl"
            )}
          >
            Drop us an email
          </h3>
          <p className="mt-2 text-sm text-white/50">
            Share your idea, budget, or just a rough sketch — we&apos;ll take
            it from there.
          </p>
          <div className="mt-4 flex flex-wrap items-center gap-3">
            <p
              className={cn(
                spaceGrotesk.className,
                "break-all text-sm text-red-400 md:text-base"
              )}
            >
              {CONTACT_EMAIL}
            </p>
            <AnimatePresence mode="wait" initial={false}>
              {copied ? (
                <motion.span
                  key="copied"
                  initial={{ opacity: 0, scale: 0.85 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.85 }}
                  transition={{ duration: 0.15 }}
                  className="flex items-center gap-1.5 rounded-full bg-red-500 px-3 py-1 text-xs font-medium text-white shadow-[0_0_16px_-4px_rgba(239,68,68,0.8)]"
                >
                  <Check className="h-3.5 w-3.5" aria-hidden="true" />
                  Copied!
                </motion.span>
              ) : (
                <motion.span
                  key="copy"
                  initial={{ opacity: 0, scale: 0.85 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.85 }}
                  transition={{ duration: 0.15 }}
                  className="flex items-center gap-1.5 rounded-full border border-white/15 bg-white/5 px-3 py-1 text-xs text-white/50 transition-colors group-hover:border-red-500/40 group-hover:text-white"
                >
                  <Copy className="h-3.5 w-3.5" aria-hidden="true" />
                  Click to copy
                </motion.span>
              )}
            </AnimatePresence>
          </div>
        </div>
      </BentoCard>
    </div>
  );
};

export const ContactSection = () => {
  return (
    <section
      id="contact"
      className={cn(
        spaceGrotesk.variable,
        dmSans.variable,
        "font-[family-name:var(--font-body)] relative overflow-hidden bg-black py-24 md:py-32"
      )}
    >
      {/* ambient background */}
      <DotPattern width={22} height={22} className="fill-white/[0.04]" />
      <div className="pointer-events-none absolute bottom-0 left-1/2 h-[420px] w-[780px] -translate-x-1/2 rounded-full bg-red-600/[0.08] blur-[140px]" />

      <div className="relative mx-auto max-w-6xl px-6 xl:px-8">
        {/* Header */}
        <motion.div
          {...fadeUp}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="mx-auto max-w-2xl text-center"
        >
          <p
            className={cn(
              spaceGrotesk.className,
              "text-sm uppercase tracking-[0.3em] text-red-500 md:text-base"
            )}
          >
            Contact Us
          </p>
          <h2
            className={cn(
              spaceGrotesk.className,
              "mt-4 text-3xl font-bold leading-tight text-white md:text-5xl"
            )}
          >
            Let&apos;s build something{" "}
            <span className="text-white/40">great together.</span>
          </h2>
          <p className="mt-5 text-base text-white/50 md:text-lg">
            Tell us about your project — we usually reply within a few hours.
          </p>
        </motion.div>

        {/* Bento grid */}
        <div className="mt-14 grid grid-cols-1 gap-5 md:mt-20 lg:grid-cols-2">
          {/* Left column: direct contact cards */}
          <div className="flex flex-col gap-5">
            <motion.div
              {...fadeUp}
              transition={{ duration: 0.5, delay: 0.1, ease: "easeOut" }}
              className="flex-1"
            >
              <CopyEmailCard />
            </motion.div>

            <motion.div
              {...fadeUp}
              transition={{ duration: 0.5, delay: 0.2, ease: "easeOut" }}
            >
              <BentoCard linkTo={`tel:${PHONE_TEL}`}>
                <div className="flex items-center gap-5">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border border-white/10 bg-white/5 transition-all duration-300 group-hover:border-red-500/50 group-hover:bg-red-500 group-hover:shadow-[0_0_24px_-4px_rgba(239,68,68,0.7)]">
                    <Phone
                      className="h-5 w-5 text-red-500 transition-colors duration-300 group-hover:text-white"
                      aria-hidden="true"
                    />
                  </div>
                  <div>
                    <h3
                      className={cn(
                        spaceGrotesk.className,
                        "text-base font-semibold text-white md:text-lg"
                      )}
                    >
                      Give us a call
                    </h3>
                    <p
                      className={cn(
                        spaceGrotesk.className,
                        "mt-1 text-sm text-red-400 md:text-base"
                      )}
                    >
                      {PHONE_DISPLAY}
                    </p>
                  </div>
                </div>
              </BentoCard>
            </motion.div>

            <motion.div
              {...fadeUp}
              transition={{ duration: 0.5, delay: 0.3, ease: "easeOut" }}
            >
              <BentoCard linkTo={INSTAGRAM_URL}>
                <div className="flex items-center gap-5">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border border-white/10 bg-white/5 transition-all duration-300 group-hover:border-red-500/50 group-hover:bg-red-500 group-hover:shadow-[0_0_24px_-4px_rgba(239,68,68,0.7)]">
                    <InstagramIcon className="h-5 w-5 text-red-500 transition-colors duration-300 group-hover:text-white" />
                  </div>
                  <div>
                    <h3
                      className={cn(
                        spaceGrotesk.className,
                        "text-base font-semibold text-white md:text-lg"
                      )}
                    >
                      Follow our work
                    </h3>
                    <p
                      className={cn(
                        spaceGrotesk.className,
                        "mt-1 text-sm text-red-400 md:text-base"
                      )}
                    >
                      {INSTAGRAM_HANDLE}
                    </p>
                  </div>
                </div>
              </BentoCard>
            </motion.div>
          </div>

          {/* Right column: booking calendar */}
          <motion.div
            {...fadeUp}
            transition={{ duration: 0.5, delay: 0.2, ease: "easeOut" }}
          >
            <Calendar />
          </motion.div>
        </div>

      </div>
    </section>
  );
};

export default ContactSection;
