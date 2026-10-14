import type { ReactNode } from "react";
import ProductCard from "./ProductCard";
import EmptyState from "./ui/EmptyState";
import type { ProductData } from "@/lib/types";

export default function ProductGrid({
  products,
  emptyTitle = "No products found",
  emptyDescription = "Try adjusting your filters or search to find what you're looking for.",
  emptyAction,
  className = "",
}: {
  products: ProductData[];
  emptyTitle?: string;
  emptyDescription?: string;
  emptyAction?: ReactNode;
  className?: string;
}) {
  if (products.length === 0) {
    return (
      <EmptyState
        icon="package"
        title={emptyTitle}
        description={emptyDescription}
        action={emptyAction}
      />
    );
  }

  return (
    <div
      className={`grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 ${className}`}
    >
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
}
