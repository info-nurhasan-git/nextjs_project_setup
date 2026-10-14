"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "../ui/Button";
import { useAuth } from "@/context/AuthContext";

type ProfileFields = {
  name: string;
  phone: string;
  address: string;
  city: string;
};

export default function ProfileForm({ initial }: { initial: ProfileFields }) {
  const router = useRouter();
  const { user, setUser } = useAuth();
  const [form, setForm] = useState(initial);
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");
  const [message, setMessage] = useState("");

  function update(field: keyof ProfileFields, value: string) {
    setForm((prev) => ({ ...prev, [field]: value }));
  }

  async function handleSubmit(event: React.FormEvent) {
    event.preventDefault();
    setLoading(true);
    setStatus("idle");
    setMessage("");

    try {
      const res = await fetch("/api/users/profile", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json();

      if (!res.ok) {
        setStatus("error");
        setMessage(data.error ?? "Could not save your changes.");
        return;
      }

      if (user) setUser({ ...user, name: form.name });
      setStatus("success");
      setMessage("Profile updated successfully.");
      router.refresh();
    } catch {
      setStatus("error");
      setMessage("Network error. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid gap-4 sm:grid-cols-2">
        <label className="block">
          <span className="mb-1.5 block text-sm font-medium text-navy-700">
            Full name
          </span>
          <input
            required
            value={form.name}
            onChange={(event) => update("name", event.target.value)}
            className="input"
          />
        </label>
        <label className="block">
          <span className="mb-1.5 block text-sm font-medium text-navy-700">
            Phone
          </span>
          <input
            value={form.phone}
            onChange={(event) => update("phone", event.target.value)}
            placeholder="+1 555 000 0000"
            className="input"
          />
        </label>
        <label className="block sm:col-span-2">
          <span className="mb-1.5 block text-sm font-medium text-navy-700">
            Address
          </span>
          <input
            value={form.address}
            onChange={(event) => update("address", event.target.value)}
            placeholder="123 Main Street"
            className="input"
          />
        </label>
        <label className="block">
          <span className="mb-1.5 block text-sm font-medium text-navy-700">
            City
          </span>
          <input
            value={form.city}
            onChange={(event) => update("city", event.target.value)}
            placeholder="New York"
            className="input"
          />
        </label>
      </div>

      {message && (
        <p
          className={`rounded-xl px-4 py-3 text-sm ${
            status === "success"
              ? "bg-emerald-50 text-emerald-600"
              : "bg-red-50 text-red-600"
          }`}
        >
          {message}
        </p>
      )}

      <Button type="submit" variant="primary" disabled={loading}>
        {loading ? "Saving..." : "Save Changes"}
      </Button>
    </form>
  );
}
