import Image from "next/image";
import { cn } from "@/lib/utils";

export function ProductMark({
  src,
  alt,
  size = "md",
}: {
  src: string;
  alt: string;
  size?: "sm" | "md" | "lg";
}) {
  return (
    <span
      className={cn(
        "flex items-center justify-center overflow-hidden bg-transparent",
        size === "sm" && "h-[4.25rem] w-[4.25rem] sm:h-20 sm:w-20",
        size === "md" && "h-[6.75rem] w-[6.75rem] sm:h-[7.5rem] sm:w-[7.5rem]",
        size === "lg" && "h-40 w-40 sm:h-44 sm:w-44",
      )}
    >
      <Image
        src={src}
        alt={alt}
        width={size === "lg" ? 320 : 160}
        height={size === "lg" ? 320 : 160}
        className="h-full w-full object-contain"
      />
    </span>
  );
}
