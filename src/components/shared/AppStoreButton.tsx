import { Apple } from "lucide-react";
import { Button } from "@/components/ui/button";
import { safeHref } from "@/lib/safe-url";
import { cn } from "@/lib/utils";

export function AppStoreButton({
  href,
  label,
  linkLabel = "App Store",
  className,
}: {
  href?: string | null;
  label: string;
  linkLabel?: string;
  className?: string;
}) {
  const url = safeHref(href);
  if (!url) {
    return (
      <Button variant="outline" disabled className={cn("justify-start", className)}>
        <Apple className="h-4 w-4" />
        {label}
      </Button>
    );
  }

  return (
    <Button asChild variant="outline" className={cn("justify-start", className)}>
      <a href={url} target="_blank" rel="noopener noreferrer">
        <Apple className="h-4 w-4" />
        {linkLabel}
      </a>
    </Button>
  );
}
