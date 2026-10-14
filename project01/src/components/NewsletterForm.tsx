"use client";

import { useState } from "react";
import { Button } from "./ui/Button";
import { Icon } from "./ui/icons";

type Status = "idle" | "loading" | "success" | "error";

export default function NewsletterForm({
  tone = "dark",
}: {
  tone?: "dark" | "light";
}) {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<Status>("idle");
  const [message, setMessage] = useState("");

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("loading");
    setMessage("");

    try {
      const res = await fetch("/api/newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      const data = await res.json();

      if (!res.ok) {
        setStatus("error");
        setMessage(data.error ?? "Something went wrong.");
        return;
      }

      setStatus("success");
      setMessage("You're subscribed! Watch your inbox for exclusive deals.");
      setEmail("");
    } catch {
      setStatus("error");
      setMessage("Network error. Please try again.");
    }
  }

  const inputTone =
    tone === "dark"
      ? "border-white/20 bg-white/10 text-white placeholder:text-white/50"
      : "border-navy-200 bg-white text-navy-900 placeholder:text-navy-400";

  return (
    <form onSubmit={handleSubmit} className="w-full">
      <div className="flex flex-col gap-3 sm:flex-row">
        <div className="relative flex-1">
          <Icon
            name="mail"
            size={18}
            className={`pointer-events-none absolute top-1/2 left-3.5 -translate-y-1/2 ${
              tone === "dark" ? "text-white/50" : "text-navy-400"
            }`}
          />
          <input
            type="email"
            required
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            placeholder="Enter your email address"
            aria-label="Email address"
            className={`w-full rounded-full border py-3 pr-4 pl-11 text-sm outline-none transition focus:border-royal-400 ${inputTone}`}
          />
        </div>
        <Button type="submit" size="md" variant="primary" disabled={status === "loading"}>
          {status === "loading" ? "Subscribing..." : "Subscribe"}
        </Button>
      </div>

      {message && (
        <p
          role="status"
          className={`mt-3 text-sm ${
            status === "success"
              ? tone === "dark"
                ? "text-emerald-300"
                : "text-emerald-600"
              : tone === "dark"
                ? "text-rose-300"
                : "text-red-500"
          }`}
        >
          {message}
        </p>
      )}
    </form>
  );
}
