"use client";

import { toast } from "sonner";
import { Button } from "@/components/ui/button";

export function RecordDelete({
  endpoint,
  id,
  label = "Delete",
}: {
  endpoint: string;
  id: string;
  label?: string;
}) {
  async function onDelete() {
    if (!confirm("Delete this item?")) return;
    const response = await fetch(endpoint, {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id }),
    });
    if (!response.ok) {
      toast.error("Could not delete");
      return;
    }
    window.location.reload();
  }

  return (
    <Button type="button" variant="destructive" onClick={onDelete}>
      {label}
    </Button>
  );
}
