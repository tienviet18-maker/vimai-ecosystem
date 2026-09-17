"use client";

import { useState } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export function PasswordForm() {
  const [loading, setLoading] = useState(false);

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    const password = String(form.get("password") ?? "");
    const confirm = String(form.get("confirm") ?? "");
    if (password !== confirm) {
      toast.error("Passwords do not match");
      return;
    }
    setLoading(true);
    const response = await fetch("/api/admin/me", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ password }),
    });
    setLoading(false);
    if (!response.ok) {
      toast.error("Could not update password");
      return;
    }
    toast.success("Password updated");
    event.currentTarget.reset();
  }

  return (
    <form onSubmit={onSubmit} className="max-w-md space-y-3 rounded-2xl border bg-white p-6">
      <h2 className="text-sm font-semibold">Change your password</h2>
      <div className="space-y-2">
        <Label htmlFor="password">New password</Label>
        <Input id="password" name="password" type="password" minLength={6} required className="min-h-11" />
      </div>
      <div className="space-y-2">
        <Label htmlFor="confirm">Confirm</Label>
        <Input id="confirm" name="confirm" type="password" minLength={6} required className="min-h-11" />
      </div>
      <Button type="submit" disabled={loading} className="min-h-11">
        {loading ? "Saving…" : "Update password"}
      </Button>
    </form>
  );
}
