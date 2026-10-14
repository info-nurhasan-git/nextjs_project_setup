import type { ReactNode } from "react";
import Container from "./ui/Container";
import SectionHeader from "./ui/SectionHeader";
import ProductGrid from "./ProductGrid";
import type { ProductData } from "@/lib/types";

export default function ProductSection({
  eyebrow,
  title,
  description,
  action,
  products,
  emptyTitle,
  emptyDescription,
  emptyAction,
  className = "",
  background = false,
}: {
  eyebrow?: string;
  title: string;
  description?: string;
  action?: ReactNode;
  products: ProductData[];
  emptyTitle?: string;
  emptyDescription?: string;
  emptyAction?: ReactNode;
  className?: string;
  background?: boolean;
}) {
  return (
    <section className={`py-14 sm:py-20 ${background ? "bg-white" : ""} ${className}`}>
      <Container>
        <SectionHeader
          eyebrow={eyebrow}
          title={title}
          description={description}
          action={action}
        />
        <div className="mt-10">
          <ProductGrid
            products={products}
            emptyTitle={emptyTitle}
            emptyDescription={emptyDescription}
            emptyAction={emptyAction}
          />
        </div>
      </Container>
    </section>
  );
}
