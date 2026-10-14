"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "../ui/Button";
import { Icon } from "../ui/icons";
import { useAuth } from "@/context/AuthContext";

export default function LoginForm({ next }: { next: string }) {
  const router = useRouter();
  const { setUser } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(event: React.FormEvent) {
    event.preventDefault();
    setLoading(true);
    setError("");

    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      const data = await res.json();

      if (!res.ok) {
        setError(data.error ?? "Unable to sign in.");
        return;
      }

      setUser(data.user);
      router.push(next || "/");
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
          Email address
        </span>
        <input
          required
          type="email"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
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
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            placeholder="••••••••"
            className="input pr-11"
            autoComplete="current-password"
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
        {loading ? "Signing in..." : "Sign In"}
      </Button>

      <div className="rounded-xl border border-navy-100 bg-navy-50 px-4 py-3 text-xs text-navy-500">
        Demo accounts — Admin: <span className="font-medium">admin@shopzone.com</span> /
        <span className="font-medium"> admin123</span> · Customer:{" "}
        <span className="font-medium">demo@shopzone.com</span> /
        <span className="font-medium"> demo123</span>
      </div>
    </form>
  );
}
