import Link from "next/link";
import type { ReactNode } from "react";
import { Icon, type IconName } from "../ui/icons";

const highlights: { icon: IconName; text: string }[] = [
  { icon: "truck", text: "Fast, reliable delivery on every order" },
  { icon: "tag", text: "Exclusive member-only deals and discounts" },
  { icon: "package", text: "Track your orders and manage returns easily" },
];

export default function AuthShell({
  title,
  subtitle,
  children,
  footer,
}: {
  title: string;
  subtitle: string;
  children: ReactNode;
  footer: ReactNode;
}) {
  return (
    <div className="grid min-h-[calc(100vh-9rem)] lg:grid-cols-2">
      <div className="relative hidden overflow-hidden bg-gradient-to-br from-navy-950 via-navy-900 to-royal-800 p-12 lg:flex lg:flex-col">
        <div className="pointer-events-none absolute -top-20 -right-20 h-80 w-80 rounded-full bg-royal-500/30 blur-3xl" />
        <Link href="/" className="relative flex items-center gap-2.5">
          <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-royal-500 to-royal-700 text-lg font-black text-white">
            S
          </span>
          <span className="text-lg font-extrabold text-white">
            Shop<span className="text-royal-400">Zone</span>
          </span>
        </Link>

        <div className="relative mt-auto max-w-md">
          <h2 className="text-3xl font-bold text-white">
            Your next favorite thing is waiting.
          </h2>
          <ul className="mt-8 space-y-4">
            {highlights.map((item) => (
              <li key={item.text} className="flex items-center gap-3 text-white/80">
                <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-white/10 text-royal-300">
                  <Icon name={item.icon} size={18} />
                </span>
                <span className="text-sm">{item.text}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="flex items-center justify-center px-4 py-14 sm:px-8">
        <div className="w-full max-w-md">
          <div className="text-center lg:text-left">
            <h1 className="text-2xl font-bold tracking-tight text-navy-900">
              {title}
            </h1>
            <p className="mt-2 text-sm text-navy-500">{subtitle}</p>
          </div>
          <div className="mt-8">{children}</div>
          <div className="mt-6 text-center text-sm text-navy-500">{footer}</div>
        </div>
      </div>
    </div>
  );
}
