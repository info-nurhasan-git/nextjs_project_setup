"use client";

import { useState } from "react";
import { useCart } from "@/context/CartContext";
import { Button, type ButtonSize, type ButtonVariant } from "./ui/Button";
import type { CartItem } from "@/lib/types";

export default function AddToCartButton({
  product,
  quantity = 1,
  variant = "primary",
  size = "md",
  className = "",
  label = "Add to Cart",
}: {
  product: Omit<CartItem, "quantity">;
  quantity?: number;
  variant?: ButtonVariant;
  size?: ButtonSize;
  className?: string;
  label?: string;
}) {
  const { addToCart } = useCart();
  const [added, setAdded] = useState(false);
  const outOfStock = product.stock <= 0;

  function handleClick() {
    if (outOfStock) return;
    addToCart(product, quantity);
    setAdded(true);
    window.setTimeout(() => setAdded(false), 1400);
  }

  return (
    <Button
      type="button"
      variant={added ? "dark" : variant}
      size={size}
      icon={added ? "check" : "cart"}
      className={`w-full ${className}`}
      onClick={handleClick}
      disabled={outOfStock}
    >
      {outOfStock ? "Out of Stock" : added ? "Added to Cart" : label}
    </Button>
  );
}
