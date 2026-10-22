import { Play } from "lucide-react";
import { Button } from "@/components/ui/button";
import { safeHref } from "@/lib/safe-url";
import { cn } from "@/lib/utils";

export function PlayStoreButton({
  href,
  label,
  className,
}: {
  href?: string | null;
  label: string;
  className?: string;
}) {
  const url = safeHref(href);
  if (!url) {
    return (
      <Button variant="outline" disabled className={cn("justify-start", className)}>
        <Play className="h-4 w-4" />
        {label}
      </Button>
    );
  }

  return (
    <Button asChild variant="outline" className={cn("justify-start", className)}>
      <a href={url} target="_blank" rel="noopener noreferrer">
        <Play className="h-4 w-4" />
        Google Play
      </a>
    </Button>
  );
}
