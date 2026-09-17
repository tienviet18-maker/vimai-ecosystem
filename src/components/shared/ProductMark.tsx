import Image from "next/image";
import { cn } from "@/lib/utils";

const frames = {
  sm: "h-[4.5rem] w-[4.5rem] rounded-[18px] border-[2px] p-2",
  md: "h-[6.5rem] w-[6.5rem] rounded-[20px] border-[2.5px] p-2.5 sm:h-[7rem] sm:w-[7rem]",
  lg: "h-[6.75rem] w-[6.75rem] rounded-[22px] border-[2.5px] p-2.5 sm:h-[7rem] sm:w-[7rem]",
} as const;

export function ProductMark({
  src,
  alt,
  size = "md",
  priority = false,
}: {
  src: string;
  alt: string;
  size?: keyof typeof frames;
  priority?: boolean;
}) {
  return (
    <span
      className={cn(
        "inline-flex shrink-0 items-center justify-center overflow-hidden border-[#111111] bg-white shadow-[0_1px_2px_rgba(17,17,17,0.08)]",
        frames[size],
      )}
    >
      <Image
        src={src}
        alt={alt}
        width={160}
        height={160}
        priority={priority}
        className="h-full w-full object-contain"
      />
    </span>
  );
}
