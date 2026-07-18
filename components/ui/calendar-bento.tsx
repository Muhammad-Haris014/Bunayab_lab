"use client";

import React from "react";
import Link from "next/link";
import { Space_Grotesk } from "next/font/google";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  weight: ["500", "600", "700"],
});

const dayNames = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];

const BOOKING_LINK = "https://cal.com/bunyadlab";

const CalendarDay: React.FC<{
  day: number | string;
  isHeader?: boolean;
  isHighlighted?: boolean;
  isToday?: boolean;
  index?: number;
}> = ({ day, isHeader, isHighlighted, isToday, index = 0 }) => {
  return (
    <motion.div
      initial={isHeader ? false : { opacity: 0, scale: 0.6 }}
      whileInView={isHeader ? undefined : { opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.25, delay: 0.2 + index * 0.012 }}
      className={cn(
        "col-span-1 row-span-1 flex h-8 w-8 items-center justify-center",
        !isHeader && "rounded-xl",
        isHighlighted && "bg-red-500 text-white shadow-[0_0_12px_-2px_rgba(239,68,68,0.8)]",
        isToday && !isHighlighted && "ring-1 ring-red-500/70 text-white",
        !isHighlighted && !isToday && (isHeader ? "text-white/40" : "text-white/50")
      )}
    >
      <span className={cn("font-medium", isHeader ? "text-xs" : "text-sm")}>
        {day}
      </span>
    </motion.div>
  );
};

export function Calendar() {
  const currentDate = new Date();
  const currentMonth = currentDate.toLocaleString("default", { month: "long" });
  const currentYear = currentDate.getFullYear();
  const firstDayOfMonth = new Date(currentYear, currentDate.getMonth(), 1);
  const firstDayOfWeek = firstDayOfMonth.getDay();
  const daysInMonth = new Date(
    currentYear,
    currentDate.getMonth() + 1,
    0
  ).getDate();

  // deterministic "busy day" pattern (no Math.random — keeps SSR and client in sync)
  const isBusy = (day: number) =>
    (day * 7 + currentDate.getMonth() * 3) % 9 === 0;

  const renderCalendarDays = () => {
    const days: React.ReactNode[] = [
      ...dayNames.map((day) => (
        <CalendarDay key={`header-${day}`} day={day} isHeader />
      )),
      ...Array(firstDayOfWeek)
        .fill(null)
        .map((_, i) => (
          <div
            key={`empty-start-${i}`}
            className="col-span-1 row-span-1 h-8 w-8"
          />
        )),
      ...Array(daysInMonth)
        .fill(null)
        .map((_, i) => (
          <CalendarDay
            key={`date-${i + 1}`}
            day={i + 1}
            index={i}
            isHighlighted={isBusy(i + 1)}
            isToday={i + 1 === currentDate.getDate()}
          />
        )),
    ];

    return days;
  };

  return (
    <BentoCard height="h-full" linkTo={BOOKING_LINK}>
      <div className="grid h-full gap-6">
        <div>
          <h3
            className={cn(
              spaceGrotesk.className,
              "mb-3 text-lg font-semibold text-white md:text-2xl"
            )}
          >
            Prefer to talk it through?
          </h3>
          <p className="mb-2 text-sm text-white/50">
            Book a free 30-minute strategy call — no commitment, just ideas.
          </p>
          <Button className="mt-3 rounded-2xl bg-red-500 text-white hover:bg-red-600 cursor-pointer">
            Book a Call
          </Button>
        </div>

        <div className="transition-all duration-500 ease-out">
          <div className="w-full max-w-[550px] rounded-[24px] border border-white/10 p-2 transition-colors duration-200 group-hover:border-red-500/50">
            <div className="rounded-2xl border-2 border-white/5 bg-white/[0.02] p-4">
              <div className="flex items-center space-x-2">
                <p className="text-sm text-white">
                  <span className={cn(spaceGrotesk.className, "font-medium")}>
                    {currentMonth}, {currentYear}
                  </span>
                </p>
                <span className="h-1 w-1 rounded-full bg-red-500">&nbsp;</span>
                <p className="text-xs text-white/40">30 min call</p>
              </div>
              <div className="mt-4 grid grid-cols-7 gap-2 px-1 sm:px-4">
                {renderCalendarDays()}
              </div>
            </div>
          </div>
        </div>
      </div>
    </BentoCard>
  );
}

interface BentoCardProps {
  children: React.ReactNode;
  height?: string;
  className?: string;
  showHoverGradient?: boolean;
  hideOverflow?: boolean;
  linkTo?: string;
}

export function BentoCard({
  children,
  height = "h-auto",
  className = "",
  showHoverGradient = true,
  hideOverflow = true,
  linkTo,
}: BentoCardProps) {
  const cardContent = (
    <div
      className={cn(
        "group relative flex flex-col rounded-2xl border border-white/10 bg-white/[0.03] p-6 backdrop-blur-md",
        "transition-all duration-300 hover:-translate-y-1 hover:border-red-500/40 hover:bg-white/[0.05]",
        "hover:shadow-[0_0_40px_-8px_rgba(239,68,68,0.3)]",
        hideOverflow && "overflow-hidden",
        height,
        className
      )}
    >
      {linkTo && (
        <div className="absolute bottom-4 right-6 z-40 flex h-12 w-12 rotate-6 items-center justify-center rounded-full bg-white opacity-0 transition-all duration-300 ease-in-out group-hover:translate-y-[-8px] group-hover:rotate-0 group-hover:opacity-100">
          <svg
            className="h-6 w-6 text-red-600"
            width="24"
            height="24"
            fill="none"
            viewBox="0 0 24 24"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M17.25 15.25V6.75H8.75"
            ></path>
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M17 7L6.75 17.25"
            ></path>
          </svg>
        </div>
      )}
      {showHoverGradient && (
        <div className="user-select-none pointer-events-none absolute inset-0 z-30 bg-gradient-to-tl from-red-500/15 via-transparent to-transparent opacity-0 transition-opacity duration-300 ease-in-out group-hover:opacity-100"></div>
      )}
      {children}
    </div>
  );

  if (linkTo) {
    return linkTo.startsWith("/") ? (
      <Link href={linkTo} className="block h-full cursor-pointer">
        {cardContent}
      </Link>
    ) : (
      <a
        href={linkTo}
        target="_blank"
        rel="noopener noreferrer"
        className="block h-full cursor-pointer"
      >
        {cardContent}
      </a>
    );
  }

  return cardContent;
}
