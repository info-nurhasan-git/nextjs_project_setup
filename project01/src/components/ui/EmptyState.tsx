import type { ReactNode } from "react";
import { Icon, type IconName } from "./icons";

export default function EmptyState({
  icon = "package",
  title,
  description,
  action,
  className = "",
}: {
  icon?: IconName;
  title: string;
  description?: string;
  action?: ReactNode;
  className?: string;
}) {
  return (
    <div
      className={`flex flex-col items-center justify-center rounded-3xl border border-dashed border-navy-200 bg-white px-6 py-16 text-center ${className}`}
    >
      <span className="flex h-16 w-16 items-center justify-center rounded-2xl bg-navy-50 text-navy-400">
        <Icon name={icon} size={28} />
      </span>
      <h3 className="mt-5 text-lg font-semibold text-navy-900">{title}</h3>
      {description && (
        <p className="mt-2 max-w-md text-sm text-navy-500">{description}</p>
      )}
      {action && <div className="mt-6">{action}</div>}
    </div>
  );
}
