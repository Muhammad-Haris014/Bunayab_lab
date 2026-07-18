"use client";

import { Space_Grotesk, DM_Sans } from "next/font/google";
import { cn } from "@/lib/utils";
import { DotPattern } from "@/components/ui/dot-pattern-1";

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

export const AboutSection = () => {
  return (
    <section
      id="about"
      className={cn(
        spaceGrotesk.variable,
        dmSans.variable,
        "relative bg-black py-24 md:py-32"
      )}
    >
      <div className="mx-auto max-w-[51rem] px-6 xl:px-0">
        <div className="relative flex flex-col items-center border border-white/15">
          <DotPattern width={5} height={5} className="fill-white/10" />

          <div className="absolute -left-1.5 -top-1.5 h-3 w-3 bg-red-500" />
          <div className="absolute -bottom-1.5 -left-1.5 h-3 w-3 bg-red-500" />
          <div className="absolute -right-1.5 -top-1.5 h-3 w-3 bg-red-500" />
          <div className="absolute -bottom-1.5 -right-1.5 h-3 w-3 bg-red-500" />

          <div className="relative z-20 mx-auto max-w-3xl px-6 py-12 text-center md:px-12 md:py-20 xl:py-24">
            <p
              className={cn(
                spaceGrotesk.className,
                "text-sm uppercase tracking-[0.3em] text-red-500 md:text-lg"
              )}
            >
              Our Vision
            </p>

            <p className="font-[family-name:var(--font-body)] mt-6 text-xl leading-tight tracking-tight text-white/40 md:text-3xl lg:text-4xl">
              To become a{" "}
              <span className="font-medium text-white">
                trusted global digital solutions partner
              </span>
              , recognized for delivering{" "}
              <span className="font-medium text-white">
                exceptional websites
              </span>
              ,{" "}
              <span className="font-medium text-white">
                impactful marketing strategies
              </span>
              , and{" "}
              <span className="font-medium text-white">
                innovative technology
              </span>{" "}
              that helps businesses{" "}
              <span className="font-medium text-white">
                grow and succeed
              </span>{" "}
              in the digital era.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
