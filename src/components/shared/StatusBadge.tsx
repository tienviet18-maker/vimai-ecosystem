import { useTranslations } from "next-intl";
import type { ProductStatus } from "@/types";
import { Badge } from "@/components/ui/badge";

const variants: Record<
  ProductStatus,
  "default" | "secondary" | "outline" | "success" | "warning" | "muted"
> = {
  launched: "success",
  available: "success",
  beta: "default",
  coming_soon: "warning",
  development: "secondary",
  idea: "muted",
  paused: "muted",
  maintenance: "muted",
  discontinued: "outline",
  archived: "outline",
};

export function StatusBadge({ status }: { status: ProductStatus }) {
  const t = useTranslations("products.status");
  return <Badge variant={variants[status]}>{t(status)}</Badge>;
}
