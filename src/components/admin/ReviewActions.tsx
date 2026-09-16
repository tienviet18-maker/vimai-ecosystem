"use client";

import { toast } from "sonner";
import { useTranslations } from "next-intl";
import { Button } from "@/components/ui/button";
import type { Review } from "@/types";

export function ReviewActions({ review }: { review: Review }) {
  const t = useTranslations("admin");

  async function patch(status: Review["status"]) {
    if (status !== "approved" && !window.confirm(t("confirmDelete"))) return;
    const response = await fetch("/api/admin/reviews", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id: review.id, status }),
    });
    if (!response.ok) {
      toast.error(t("couldNotSave"));
      return;
    }
    toast.success(t("saved"));
    window.location.reload();
  }

  return (
    <div className="flex flex-wrap gap-2">
      <Button size="sm" className="min-h-11" onClick={() => patch("approved")}>
        {t("published")}
      </Button>
      <Button size="sm" variant="outline" className="min-h-11" onClick={() => patch("rejected")}>
        {t("remove")}
      </Button>
      <Button size="sm" variant="ghost" className="min-h-11" onClick={() => patch("archived")}>
        {t("archived")}
      </Button>
    </div>
  );
}
