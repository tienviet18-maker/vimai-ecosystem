"use client";

import { useState } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { PROTECTED_SUPER_ADMIN_EMAIL, type AdminRole, type AdminStatus } from "@/lib/rbac";

type AdminRow = {
  id: string;
  email: string;
  role: AdminRole;
  status: AdminStatus;
  created_at: string;
};

export function UsersManager({ users }: { users: AdminRow[] }) {
  const [pending, setPending] = useState<string | null>(null);

  async function createUser(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    setPending("create");
    const response = await fetch("/api/admin/users", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email: form.get("email"),
        password: form.get("password"),
        role: form.get("role"),
      }),
    });
    setPending(null);
    const json = (await response.json().catch(() => ({}))) as { error?: string };
    if (!response.ok) {
      toast.error(json.error ?? "Could not create user");
      return;
    }
    toast.success("User created");
    window.location.reload();
  }

  async function patch(id: string, body: Record<string, string>) {
    setPending(id);
    const response = await fetch("/api/admin/users", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id, ...body }),
    });
    setPending(null);
    const json = (await response.json().catch(() => ({}))) as { error?: string };
    if (!response.ok) {
      toast.error(json.error ?? "Update failed");
      return;
    }
    toast.success("Updated");
    window.location.reload();
  }

  async function remove(id: string) {
    if (!confirm("Delete this admin user?")) return;
    setPending(id);
    const response = await fetch("/api/admin/users", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id }),
    });
    setPending(null);
    const json = (await response.json().catch(() => ({}))) as { error?: string };
    if (!response.ok) {
      toast.error(json.error ?? "Delete failed");
      return;
    }
    toast.success("Deleted");
    window.location.reload();
  }

  return (
    <div className="space-y-6">
      <form onSubmit={createUser} className="grid gap-3 rounded-2xl border bg-white p-6 sm:grid-cols-4">
        <Input name="email" type="email" placeholder="Email" required className="min-h-11" />
        <Input name="password" type="password" placeholder="Temporary password" minLength={6} required className="min-h-11" />
        <select name="role" className="min-h-11 rounded-xl border px-3 text-sm" defaultValue="EDITOR">
          <option value="EDITOR">EDITOR</option>
          <option value="ADMIN">ADMIN</option>
          <option value="SUPER_ADMIN">SUPER_ADMIN</option>
        </select>
        <Button type="submit" disabled={pending === "create"} className="min-h-11">
          Create user
        </Button>
      </form>
      <div className="overflow-x-auto rounded-2xl border bg-white">
        <table className="w-full min-w-[640px] text-left text-sm">
          <thead className="border-b bg-navy-50/80 text-slate-500">
            <tr>
              <th className="px-4 py-3 font-medium">Email</th>
              <th className="px-4 py-3 font-medium">Role</th>
              <th className="px-4 py-3 font-medium">Status</th>
              <th className="px-4 py-3 font-medium">Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.id} className="border-b last:border-0">
                <td className="px-4 py-3">
                  {user.email}
                  {user.email === PROTECTED_SUPER_ADMIN_EMAIL ? (
                    <span className="ml-2 text-[11px] uppercase text-primary">protected</span>
                  ) : null}
                </td>
                <td className="px-4 py-3">
                  <select
                    defaultValue={user.role}
                    className="min-h-11 rounded-xl border px-2"
                    disabled={pending === user.id}
                    onChange={(event) => patch(user.id, { role: event.target.value })}
                  >
                    <option value="EDITOR">EDITOR</option>
                    <option value="ADMIN">ADMIN</option>
                    <option value="SUPER_ADMIN">SUPER_ADMIN</option>
                  </select>
                </td>
                <td className="px-4 py-3">
                  <Button
                    type="button"
                    variant="outline"
                    disabled={pending === user.id}
                    onClick={() =>
                      patch(user.id, { status: user.status === "ACTIVE" ? "DISABLED" : "ACTIVE" })
                    }
                  >
                    {user.status}
                  </Button>
                </td>
                <td className="px-4 py-3">
                  <div className="flex flex-wrap gap-2">
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => {
                        const password = prompt("New password (min 6 characters)");
                        if (password) patch(user.id, { password });
                      }}
                    >
                      Reset password
                    </Button>
                    <Button type="button" variant="destructive" onClick={() => remove(user.id)}>
                      Delete
                    </Button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
