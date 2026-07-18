"use client";

import { Space_Grotesk, DM_Sans } from "next/font/google";
import { cn } from "@/lib/utils";
import { HeroParallax } from "@/components/ui/hero-parallax";

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

interface Project {
  title: string;
  link: string;
  thumbnail: string;
}

const PROJECTS: Project[] = [
  {
    title: "Pizza M21 Kitchen",
    link: "https://m21kitchen.pk",
    thumbnail: "/projects/m21kitchen.jpg",
  },
  {
    title: "Velirra Store",
    link: "https://velirra.store",
    thumbnail: "/projects/velirra.jpg",
  },
  {
    title: "Third Culture",
    link: "https://enjoythirdculture.com",
    thumbnail: "/projects/thirdculture.jpg",
  },
  {
    title: "The Greatest Mithai",
    link: "https://thegreatestmithai.pk",
    thumbnail: "/projects/greatestmithai.jpg",
  },
  {
    title: "TwoOne",
    link: "https://twoone.pk",
    thumbnail: "/projects/twoone.jpg",
  },
];

// HeroParallax lays out three rows of five; cycle the five projects in a
// different order per row so every row is full without looking repeated.
const rotate = (arr: Project[], by: number) => [
  ...arr.slice(by),
  ...arr.slice(0, by),
];

const PARALLAX_PRODUCTS = [
  ...PROJECTS,
  ...rotate(PROJECTS, 2),
  ...rotate(PROJECTS, 4),
];

const WorkHeader = () => {
  return (
    <div className="relative z-10 mx-auto w-full max-w-7xl px-6 py-20 md:py-40 xl:px-8">
      <p
        className={cn(
          spaceGrotesk.className,
          "text-sm uppercase tracking-[0.3em] text-red-500 md:text-base"
        )}
      >
        Our Work
      </p>
      <h2
        className={cn(
          spaceGrotesk.className,
          "mt-4 text-3xl font-bold leading-tight text-white md:text-6xl"
        )}
      >
        Real projects. <br />
        <span className="text-white/40">Real results.</span>
      </h2>
      <p className="font-[family-name:var(--font-body)] mt-6 max-w-2xl text-base text-white/50 md:text-xl">
        From restaurants to e-commerce brands, these are live products we
        designed, built, and grew. Scroll through — every one of them is out
        there working right now.
      </p>
    </div>
  );
};

export const WorkSection = () => {
  return (
    <section
      id="work"
      className={cn(
        spaceGrotesk.variable,
        dmSans.variable,
        "relative bg-black"
      )}
    >
      <HeroParallax products={PARALLAX_PRODUCTS} header={<WorkHeader />} />
    </section>
  );
};

export default WorkSection;
