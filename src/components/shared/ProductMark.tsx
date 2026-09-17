import Image from "next/image";
import { cn } from "@/lib/utils";

export function ProductMark({
  src,
  alt,
  size = "md",
}: {
  src: string;
  alt: string;
  size?: "sm" | "md";
}) {
  return (
    <span
      className={cn(
        "flex items-center justify-center overflow-hidden rounded-2xl bg-white",
        size === "sm" && "h-[4.25rem] w-[4.25rem] sm:h-20 sm:w-20",
        size === "md" && "h-[6.75rem] w-[6.75rem] sm:h-[7.5rem] sm:w-[7.5rem]",
      )}
    >
      <Image
        src={src}
        alt={alt}
        width={160}
        height={160}
        className="h-full w-full object-contain p-1.5"
      />
    </span>
  );
}
