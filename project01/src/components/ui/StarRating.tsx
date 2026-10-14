import { Icon } from "./icons";

export default function StarRating({
  value,
  size = 16,
  showValue = false,
  count,
  className = "",
}: {
  value: number;
  size?: number;
  showValue?: boolean;
  count?: number;
  className?: string;
}) {
  const clamped = Math.max(0, Math.min(5, value));
  const percent = (clamped / 5) * 100;

  return (
    <div className={`flex items-center gap-2 ${className}`}>
      <span className="relative inline-flex" aria-label={`Rated ${clamped} out of 5`}>
        <span className="flex text-navy-200">
          {Array.from({ length: 5 }).map((_, index) => (
            <Icon key={index} name="star" size={size} />
          ))}
        </span>
        <span
          className="absolute inset-0 flex overflow-hidden text-amber-400"
          style={{ width: `${percent}%` }}
        >
          {Array.from({ length: 5 }).map((_, index) => (
            <Icon
              key={index}
              name="star"
              size={size}
              className="shrink-0 fill-current"
            />
          ))}
        </span>
      </span>
      {showValue && (
        <span className="text-xs font-semibold text-navy-600">
          {clamped.toFixed(1)}
          {typeof count === "number" && (
            <span className="font-normal text-navy-400"> ({count})</span>
          )}
        </span>
      )}
    </div>
  );
}
