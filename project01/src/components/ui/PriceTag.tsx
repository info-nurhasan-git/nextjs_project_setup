import { discountPercent, effectivePrice, formatPrice } from "@/lib/format";

export default function PriceTag({
  price,
  discountPrice,
  size = "md",
  className = "",
}: {
  price: number;
  discountPrice?: number | null;
  size?: "sm" | "md" | "lg";
  className?: string;
}) {
  const current = effectivePrice(price, discountPrice);
  const percent = discountPercent(price, discountPrice);

  const priceClass =
    size === "lg"
      ? "text-2xl"
      : size === "sm"
        ? "text-sm"
        : "text-lg";

  return (
    <div className={`flex flex-wrap items-baseline gap-2 ${className}`}>
      <span className={`font-bold text-navy-900 ${priceClass}`}>
        {formatPrice(current)}
      </span>
      {percent > 0 && (
        <>
          <span className="text-sm text-navy-400 line-through">
            {formatPrice(price)}
          </span>
          <span className="rounded-full bg-emerald-50 px-2 py-0.5 text-xs font-semibold text-emerald-600">
            -{percent}%
          </span>
        </>
      )}
    </div>
  );
}
