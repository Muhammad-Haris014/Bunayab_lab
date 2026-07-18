"use client";

import { Space_Grotesk, DM_Sans } from "next/font/google";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { Card } from "@/components/ui/card";
import { DotPattern } from "@/components/ui/dot-pattern-1";
import {
  Code2,
  Share2,
  Megaphone,
  Search,
  Palette,
  AppWindow,
  LifeBuoy,
  Gauge,
  Rocket,
  ArrowUpRight,
  type LucideIcon,
} from "lucide-react";

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

interface Service {
  title: string;
  description: string;
  icon: LucideIcon;
}

const SERVICES: Service[] = [
  {
    title: "Website Development",
    description:
      "Fast, responsive, pixel-perfect websites engineered to convert visitors into customers.",
    icon: Code2,
  },
  {
    title: "Social Media Marketing",
    description:
      "Scroll-stopping content and campaigns that grow your audience and keep them engaged.",
    icon: Share2,
  },
  {
    title: "Digital Marketing",
    description:
      "Full-funnel strategies across paid and organic channels, built around measurable ROI.",
    icon: Megaphone,
  },
  {
    title: "Search Engine Optimization",
    description:
      "Technical and content SEO that puts your brand on page one — and keeps it there.",
    icon: Search,
  },
  {
    title: "Branding & Graphic Design",
    description:
      "Identities, visuals, and design systems that make your brand instantly recognizable.",
    icon: Palette,
  },
  {
    title: "Web Application Development",
    description:
      "Scalable, secure web apps — from dashboards to full SaaS platforms — built to last.",
    icon: AppWindow,
  },
  {
    title: "Maintenance & Support",
    description:
      "Proactive updates, monitoring, and fixes so your site stays secure and always online.",
    icon: LifeBuoy,
  },
  {
    title: "Performance Optimization",
    description:
      "Speed audits and Core Web Vitals tuning that make every page load feel instant.",
    icon: Gauge,
  },
  {
    title: "Business Growth Solutions",
    description:
      "Data-driven consulting that turns digital presence into predictable business growth.",
    icon: Rocket,
  },
];

const ServiceCard = ({
  service,
  index,
}: {
  service: Service;
  index: number;
}) => {
  const Icon = service.icon;

  return (
    <motion.div
      initial={{ opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.5, delay: (index % 3) * 0.12, ease: "easeOut" }}
      className="h-full"
    >
      <Card
        className="group relative h-full overflow-hidden rounded-2xl border-white/10 bg-white/[0.03] p-7 backdrop-blur-md
                   transition-all duration-300
                   hover:-translate-y-1.5 hover:border-red-500/40 hover:bg-white/[0.05]
                   hover:shadow-[0_0_40px_-8px_rgba(239,68,68,0.35)]"
      >
        {/* red glow that breathes in on hover */}
        <div
          className="pointer-events-none absolute -right-16 -top-16 h-40 w-40 rounded-full bg-red-500/0 blur-3xl
                     transition-all duration-500 group-hover:bg-red-500/20"
        />

        {/* index watermark */}
        <span
          className={cn(
            spaceGrotesk.className,
            "pointer-events-none absolute -top-1 right-5 text-6xl font-bold text-white/[0.05] transition-colors duration-300 group-hover:text-red-500/15"
          )}
        >
          {String(index + 1).padStart(2, "0")}
        </span>

        <div className="relative z-10 flex h-full flex-col">
          <div
            className="flex h-12 w-12 items-center justify-center rounded-xl border border-white/10 bg-white/5
                       transition-all duration-300
                       group-hover:border-red-500/50 group-hover:bg-red-500 group-hover:shadow-[0_0_24px_-4px_rgba(239,68,68,0.7)]"
          >
            <Icon
              className="h-5 w-5 text-red-500 transition-colors duration-300 group-hover:text-white"
              aria-hidden="true"
            />
          </div>

          <h3
            className={cn(
              spaceGrotesk.className,
              "mt-6 text-lg font-semibold leading-snug text-white md:text-xl"
            )}
          >
            {service.title}
          </h3>

          <p className="font-[family-name:var(--font-body)] mt-3 flex-1 text-sm leading-relaxed text-white/50">
            {service.description}
          </p>

          <div
            className="mt-6 flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-white/30
                       transition-colors duration-300 group-hover:text-red-400"
          >
            <span className={spaceGrotesk.className}>Learn more</span>
            <ArrowUpRight
              className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
              aria-hidden="true"
            />
          </div>
        </div>
      </Card>
    </motion.div>
  );
};

export const ServicesSection = () => {
  return (
    <section
      id="services"
      className={cn(
        spaceGrotesk.variable,
        dmSans.variable,
        "relative overflow-hidden bg-black py-24 md:py-32"
      )}
    >
      {/* ambient background: faint dots + red center glow */}
      <DotPattern width={22} height={22} className="fill-white/[0.04]" />
      <div className="pointer-events-none absolute left-1/2 top-0 h-[480px] w-[820px] -translate-x-1/2 rounded-full bg-red-600/[0.07] blur-[140px]" />

      <div className="relative mx-auto max-w-7xl px-6 xl:px-8">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="mx-auto max-w-2xl text-center"
        >
          <p
            className={cn(
              spaceGrotesk.className,
              "text-sm uppercase tracking-[0.3em] text-red-500 md:text-base"
            )}
          >
            Our Services
          </p>
          <h2
            className={cn(
              spaceGrotesk.className,
              "mt-4 text-3xl font-bold leading-tight text-white md:text-5xl"
            )}
          >
            Everything your brand needs{" "}
            <span className="text-white/40">to win online.</span>
          </h2>
          <p className="font-[family-name:var(--font-body)] mt-5 text-base text-white/50 md:text-lg">
            From first pixel to full-scale growth — nine specialties, one team,
            built to perform.
          </p>
        </motion.div>

        {/* Cards grid */}
        <div className="mt-14 grid grid-cols-1 gap-5 sm:grid-cols-2 md:mt-20 lg:grid-cols-3">
          {SERVICES.map((service, index) => (
            <ServiceCard key={service.title} service={service} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
