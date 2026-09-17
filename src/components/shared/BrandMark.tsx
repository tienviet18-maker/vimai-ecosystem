import Image from "next/image";
import { Link } from "@/lib/i18n/navigation";
import { cn } from "@/lib/utils";

export function BrandMark({
  className,
  compact = false,
}: {
  className?: string;
  compact?: boolean;
}) {
  return (
    <Link
      href="/"
      className={cn(
        "group inline-flex shrink-0 items-center no-underline",
        className,
      )}
      aria-label="ViMai home"
    >
      <Image
        src="/brand/vimai-logo.jpg"
        alt="ViMai"
        width={compact ? 132 : 176}
        height={compact ? 54 : 72}
        className={cn(
          "w-auto object-contain object-left transition-opacity duration-300 group-hover:opacity-80",
          compact ? "h-10" : "h-12 sm:h-[3.35rem]",
        )}
        priority
      />
    </Link>
  );
}
