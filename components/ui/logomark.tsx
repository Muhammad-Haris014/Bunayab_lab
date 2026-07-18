import Image from "next/image";
import { cn } from "@/lib/utils";

interface LogomarkProps {
  className?: string;
  size?: number;
}

export const Logomark = ({ className, size = 34 }: LogomarkProps) => (
  <span
    className={cn(
      "relative inline-block shrink-0 overflow-hidden rounded-md",
      className
    )}
    style={{ width: size, height: size }}
  >
    <Image
      src="/logo.jpg"
      alt="Bunyad Lab"
      fill
      sizes={`${size}px`}
      className="object-cover"
      priority
    />
  </span>
);

export default Logomark;
