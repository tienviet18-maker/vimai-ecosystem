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
        "group inline-flex items-center no-underline transition-opacity duration-300 hover:opacity-80",
        className,
      )}
      aria-label="ViMai home"
    >
      <Image
        src="/brand/vimai-logo.jpg"
        alt="ViMai"
        width={compact ? 120 : 156}
        height={compact ? 48 : 64}
        className={cn(
          "w-auto object-contain object-left",
          compact ? "h-9" : "h-11 sm:h-12",
        )}
        priority
      />
    </Link>
  );
}
