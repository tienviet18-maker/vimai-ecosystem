"use client";

import { toast } from "sonner";
import { Button } from "@/components/ui/button";

export function MessageActions({ id, status }: { id: string; status: string }) {
  async function setStatus(next: string) {
    const response = await fetch("/api/admin/messages", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id, status: next }),
    });
    if (!response.ok) {
      toast.error("Could not update");
      return;
    }
    window.location.reload();
  }

  async function remove() {
    if (!confirm("Delete this message?")) return;
    const response = await fetch("/api/admin/messages", {
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
    <div className="flex flex-wrap gap-2">
      {status !== "read" ? (
        <Button type="button" variant="outline" onClick={() => setStatus("read")}>
          Mark read
        </Button>
      ) : (
        <Button type="button" variant="outline" onClick={() => setStatus("unread")}>
          Mark unread
        </Button>
      )}
      <Button type="button" variant="destructive" onClick={remove}>
        Delete
      </Button>
    </div>
  );
}
