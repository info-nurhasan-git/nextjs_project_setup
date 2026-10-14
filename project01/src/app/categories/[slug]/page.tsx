import { notFound } from "next/navigation";
import type { Metadata } from "next";
import PageHeader from "@/components/PageHeader";
import Container from "@/components/ui/Container";
import ProductGrid from "@/components/ProductGrid";
import { ButtonLink } from "@/components/ui/Button";
import { CATEGORIES, getCategoryBySlug } from "@/lib/catalog";
import { getProducts } from "@/lib/products";
import type { ProductData } from "@/lib/types";

export const dynamic = "force-dynamic";

export function generateStaticParams() {
  return CATEGORIES.map((category) => ({ slug: category.slug }));
}

export async function generateMetadata({
  params,
}: PageProps<"/categories/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const category = getCategoryBySlug(slug);
  if (!category) return { title: "Category not found" };
  return { title: category.name, description: category.description };
}

export default async function CategoryPage({
  params,
}: PageProps<"/categories/[slug]">) {
  const { slug } = await params;
  const category = getCategoryBySlug(slug);
  if (!category) notFound();

  let products: ProductData[] = [];
  try {
    products = await getProducts({ category: slug, sort: "newest" });
  } catch {
    products = [];
  }

  return (
    <>
      <PageHeader
        title={category.name}
        description={category.description}
        crumbs={[
          { href: "/categories", label: "Categories" },
          { label: category.name },
        ]}
      >
        <ButtonLink href="/products" variant="outline" size="sm">
          View all products
        </ButtonLink>
      </PageHeader>

      <Container className="py-10">
        <p className="mb-6 text-sm text-navy-500">
          <span className="font-semibold text-navy-900">{products.length}</span>{" "}
          {products.length === 1 ? "product" : "products"} in {category.name}
        </p>
        <ProductGrid
          products={products}
          emptyTitle={`No products in ${category.name} yet`}
          emptyDescription="Check back soon or browse another category."
          emptyAction={
            <ButtonLink href="/categories" variant="primary" size="sm">
              Browse categories
            </ButtonLink>
          }
        />
      </Container>
    </>
  );
}
