"use client";

import { useEffect, useState } from "react";
import ProductGrid from "../ProductGrid";
import Skeleton from "../ui/Skeleton";
import EmptyState from "../ui/EmptyState";
import { ButtonLink, Button } from "../ui/Button";
import { Icon } from "../ui/icons";
import { useWishlist } from "@/context/WishlistContext";
import type { ProductData } from "@/lib/types";

export default function WishlistView() {
  const { ids, ready, clear, count } = useWishlist();
  const [products, setProducts] = useState<ProductData[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!ready) return;

    if (ids.length === 0) {
      setProducts([]);
      setLoading(false);
      return;
    }

    let active = true;
    setLoading(true);

    fetch(`/api/products?ids=${ids.join(",")}`)
      .then((res) => res.json())
      .then((data) => {
        if (!active) return;
        setProducts(Array.isArray(data.products) ? data.products : []);
      })
      .catch(() => {
        if (active) setProducts([]);
      })
      .finally(() => {
        if (active) setLoading(false);
      });

    return () => {
      active = false;
    };
  }, [ids, ready]);

  if (loading) {
    return (
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {Array.from({ length: 4 }).map((_, index) => (
          <div key={index} className="space-y-3">
            <Skeleton className="aspect-square w-full" />
            <Skeleton className="h-4 w-3/4" />
            <Skeleton className="h-4 w-1/2" />
          </div>
        ))}
      </div>
    );
  }

  if (count === 0) {
    return (
      <EmptyState
        icon="heart"
        title="Your wishlist is empty"
        description="Save your favorite products and find them here anytime."
        action={
          <ButtonLink href="/products" variant="primary">
            Explore products
          </ButtonLink>
        }
      />
    );
  }

  return (
    <div>
      <div className="mb-5 flex items-center justify-between">
        <p className="text-sm text-navy-500">
          {count} {count === 1 ? "item" : "items"} saved
        </p>
        <Button
          variant="ghost"
          size="sm"
          icon="trash"
          onClick={clear}
          className="text-red-500 hover:bg-red-50"
        >
          Clear wishlist
        </Button>
      </div>
      <ProductGrid products={products} />
      <div className="mt-8 flex items-center justify-center gap-2 rounded-2xl border border-dashed border-navy-200 bg-white px-4 py-4 text-sm text-navy-500">
        <Icon name="heart" size={16} className="text-royal-500" />
        Add items to your cart to check out whenever you&apos;re ready.
      </div>
    </div>
  );
}
