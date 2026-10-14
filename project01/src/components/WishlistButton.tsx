"use client";

import { useWishlist } from "@/context/WishlistContext";
import { Icon } from "./ui/icons";

export default function WishlistButton({
  productId,
  className = "",
  showLabel = false,
}: {
  productId: string;
  className?: string;
  showLabel?: boolean;
}) {
  const { has, toggle } = useWishlist();
  const active = has(productId);

  return (
    <button
      type="button"
      onClick={() => toggle(productId)}
      aria-pressed={active}
      aria-label={active ? "Remove from wishlist" : "Add to wishlist"}
      className={`inline-flex items-center justify-center gap-2 rounded-full border transition-all duration-200 ${
        active
          ? "border-rose-200 bg-rose-50 text-rose-500"
          : "border-navy-200 bg-white text-navy-500 hover:border-rose-200 hover:text-rose-500"
      } ${showLabel ? "px-4 py-2 text-sm font-semibold" : "h-9 w-9"} ${className}`}
    >
      <Icon
        name="heart"
        size={showLabel ? 16 : 18}
        className={active ? "fill-current" : ""}
      />
      {showLabel && (active ? "Saved" : "Wishlist")}
    </button>
  );
}
