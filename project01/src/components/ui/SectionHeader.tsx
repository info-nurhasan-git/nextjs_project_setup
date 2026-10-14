import type { ReactNode } from "react";

export default function SectionHeader({
  eyebrow,
  title,
  description,
  action,
  align = "left",
  className = "",
}: {
  eyebrow?: string;
  title: string;
  description?: string;
  action?: ReactNode;
  align?: "left" | "center";
  className?: string;
}) {
  const isCenter = align === "center";

  return (
    <div
      className={`flex flex-col gap-5 ${
        isCenter
          ? "items-center text-center"
          : "sm:flex-row sm:items-end sm:justify-between"
      } ${className}`}
    >
      <div className={isCenter ? "max-w-2xl" : "max-w-2xl"}>
        {eyebrow && (
          <span className="mb-3 inline-flex items-center gap-2 rounded-full bg-royal-50 px-3 py-1 text-xs font-semibold tracking-wide text-royal-700 uppercase">
            {eyebrow}
          </span>
        )}
        <h2 className="text-2xl font-bold tracking-tight text-navy-900 sm:text-3xl">
          {title}
        </h2>
        {description && (
          <p className="mt-3 text-sm leading-relaxed text-navy-500 sm:text-base">
            {description}
          </p>
        )}
      </div>
      {action && <div className="shrink-0">{action}</div>}
    </div>
  );
}
