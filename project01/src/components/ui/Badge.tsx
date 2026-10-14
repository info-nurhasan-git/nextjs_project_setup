import type { ReactNode } from "react";
import { Icon, type IconName } from "./icons";

export type BadgeVariant =
  | "royal"
  | "navy"
  | "success"
  | "warning"
  | "danger"
  | "neutral";

const variants: Record<BadgeVariant, string> = {
  royal: "bg-royal-50 text-royal-700",
  navy: "bg-navy-100 text-navy-700",
  success: "bg-emerald-50 text-emerald-600",
  warning: "bg-amber-50 text-amber-600",
  danger: "bg-red-50 text-red-600",
  neutral: "bg-navy-50 text-navy-500",
};

export default function Badge({
  variant = "royal",
  icon,
  children,
  className = "",
}: {
  variant?: BadgeVariant;
  icon?: IconName;
  children: ReactNode;
  className?: string;
}) {
  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-semibold ${variants[variant]} ${className}`}
    >
      {icon && <Icon name={icon} size={13} />}
      {children}
    </span>
  );
}
