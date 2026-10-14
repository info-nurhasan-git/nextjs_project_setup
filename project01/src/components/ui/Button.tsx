import Link from "next/link";
import type { ButtonHTMLAttributes, ReactNode } from "react";
import { Icon, type IconName } from "./icons";

export type ButtonVariant =
  | "primary"
  | "dark"
  | "outline"
  | "ghost"
  | "white"
  | "danger";
export type ButtonSize = "sm" | "md" | "lg";

const base =
  "inline-flex items-center justify-center gap-2 rounded-full font-semibold transition-all duration-200 disabled:cursor-not-allowed disabled:opacity-60 active:scale-[0.98] whitespace-nowrap";

const variants: Record<ButtonVariant, string> = {
  primary:
    "bg-royal-600 text-white shadow-lg shadow-royal-600/25 hover:bg-royal-700 hover:shadow-royal-700/30",
  dark: "bg-navy-900 text-white shadow-lg shadow-navy-900/20 hover:bg-navy-800",
  outline:
    "border border-navy-200 bg-white text-navy-800 hover:border-royal-400 hover:text-royal-700",
  ghost: "text-navy-700 hover:bg-navy-100",
  white:
    "bg-white text-navy-900 shadow-lg shadow-navy-900/10 hover:bg-navy-50",
  danger: "bg-red-600 text-white hover:bg-red-700",
};

const sizes: Record<ButtonSize, string> = {
  sm: "px-4 py-2 text-sm",
  md: "px-5 py-2.5 text-sm",
  lg: "px-7 py-3.5 text-base",
};

export function buttonClasses({
  variant = "primary",
  size = "md",
  className = "",
}: {
  variant?: ButtonVariant;
  size?: ButtonSize;
  className?: string;
} = {}): string {
  return `${base} ${variants[variant]} ${sizes[size]} ${className}`;
}

type CommonProps = {
  variant?: ButtonVariant;
  size?: ButtonSize;
  icon?: IconName;
  iconRight?: IconName;
  className?: string;
  children: ReactNode;
};

export function Button({
  variant,
  size,
  icon,
  iconRight,
  className,
  children,
  ...props
}: CommonProps & ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button className={buttonClasses({ variant, size, className })} {...props}>
      {icon && <Icon name={icon} size={size === "sm" ? 16 : 18} />}
      {children}
      {iconRight && <Icon name={iconRight} size={size === "sm" ? 16 : 18} />}
    </button>
  );
}

export function ButtonLink({
  href,
  variant,
  size,
  icon,
  iconRight,
  className,
  children,
  prefetch,
}: CommonProps & { href: string; prefetch?: boolean }) {
  return (
    <Link
      href={href}
      prefetch={prefetch}
      className={buttonClasses({ variant, size, className })}
    >
      {icon && <Icon name={icon} size={size === "sm" ? 16 : 18} />}
      {children}
      {iconRight && <Icon name={iconRight} size={size === "sm" ? 16 : 18} />}
    </Link>
  );
}
