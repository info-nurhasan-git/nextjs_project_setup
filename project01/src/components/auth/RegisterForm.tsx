"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "../ui/Button";
import { Icon } from "../ui/icons";
import { useAuth } from "@/context/AuthContext";

export default function RegisterForm() {
  const router = useRouter();
  const { setUser } = useAuth();
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    confirm: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  function update(field: keyof typeof form, value: string) {
    setForm((prev) => ({ ...prev, [field]: value }));
  }

  async function handleSubmit(event: React.FormEvent) {
    event.preventDefault();

    if (form.password !== form.confirm) {
      setError("Passwords do not match.");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const res = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: form.name,
          email: form.email,
          password: form.password,
        }),
      });
      const data = await res.json();

      if (!res.ok) {
        setError(data.error ?? "Unable to create your account.");
        return;
      }

      setUser(data.user);
      router.push("/");
      router.refresh();
    } catch {
      setError("Network error. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <label className="block">
        <span className="mb-1.5 block text-sm font-medium text-navy-700">
          Full name
        </span>
        <input
          required
          value={form.name}
          onChange={(event) => update("name", event.target.value)}
          placeholder="Jane Doe"
          className="input"
          autoComplete="name"
        />
      </label>

      <label className="block">
        <span className="mb-1.5 block text-sm font-medium text-navy-700">
          Email address
        </span>
        <input
          required
          type="email"
          value={form.email}
          onChange={(event) => update("email", event.target.value)}
          placeholder="you@example.com"
          className="input"
          autoComplete="email"
        />
      </label>

      <label className="block">
        <span className="mb-1.5 block text-sm font-medium text-navy-700">
          Password
        </span>
        <span className="relative block">
          <input
            required
            type={showPassword ? "text" : "password"}
            value={form.password}
            onChange={(event) => update("password", event.target.value)}
            placeholder="At least 6 characters"
            className="input pr-11"
            autoComplete="new-password"
          />
          <button
            type="button"
            onClick={() => setShowPassword((value) => !value)}
            className="absolute top-1/2 right-3 -translate-y-1/2 text-navy-400 transition hover:text-navy-600"
            aria-label={showPassword ? "Hide password" : "Show password"}
          >
            <Icon name="eye" size={18} />
          </button>
        </span>
      </label>

      <label className="block">
        <span className="mb-1.5 block text-sm font-medium text-navy-700">
          Confirm password
        </span>
        <input
          required
          type={showPassword ? "text" : "password"}
          value={form.confirm}
          onChange={(event) => update("confirm", event.target.value)}
          placeholder="Repeat your password"
          className="input"
          autoComplete="new-password"
        />
      </label>

      {error && (
        <p className="rounded-xl bg-red-50 px-4 py-3 text-sm text-red-600">
          {error}
        </p>
      )}

      <Button
        type="submit"
        variant="primary"
        size="lg"
        className="w-full"
        disabled={loading}
      >
        {loading ? "Creating account..." : "Create Account"}
      </Button>

      <p className="text-center text-xs text-navy-400">
        By creating an account you agree to our Terms &amp; Conditions and
        Privacy Policy.
      </p>
    </form>
  );
}
