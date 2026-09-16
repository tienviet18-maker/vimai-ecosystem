import { Play } from "lucide-react";
import { Button } from "@/components/ui/button";
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
  if (!href) {
    return (
      <Button variant="outline" disabled className={cn("justify-start", className)}>
        <Play className="h-4 w-4" />
        {label}
      </Button>
    );
  }

  return (
    <Button asChild variant="outline" className={cn("justify-start", className)}>
      <a href={href} target="_blank" rel="noopener noreferrer">
        <Play className="h-4 w-4" />
        Google Play
      </a>
    </Button>
  );
}
