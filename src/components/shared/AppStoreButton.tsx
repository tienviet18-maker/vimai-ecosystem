import { Apple } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export function AppStoreButton({
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
        <Apple className="h-4 w-4" />
        {label}
      </Button>
    );
  }

  return (
    <Button asChild variant="outline" className={cn("justify-start", className)}>
      <a href={href} target="_blank" rel="noopener noreferrer">
        <Apple className="h-4 w-4" />
        App Store
      </a>
    </Button>
  );
}
