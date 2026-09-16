"use client";

import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import type { Review } from "@/types";

export function ReviewActions({ review }: { review: Review }) {
  async function patch(status: Review["status"]) {
    const response = await fetch("/api/admin/reviews", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id: review.id, status }),
    });
    if (!response.ok) {
      toast.error("Could not update");
      return;
    }
    toast.success("Updated");
    window.location.reload();
  }

  return (
    <div className="flex flex-wrap gap-2">
      <Button size="sm" onClick={() => patch("approved")}>
        Approve
      </Button>
      <Button size="sm" variant="outline" onClick={() => patch("rejected")}>
        Reject
      </Button>
      <Button size="sm" variant="ghost" onClick={() => patch("archived")}>
        Archive
      </Button>
    </div>
  );
}
