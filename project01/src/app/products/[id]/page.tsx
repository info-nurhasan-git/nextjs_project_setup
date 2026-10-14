import { notFound } from "next/navigation";
import type { Metadata } from "next";
import PageHeader from "@/components/PageHeader";
import Container from "@/components/ui/Container";
import ProductDetail from "@/components/products/ProductDetail";
import ProductSection from "@/components/ProductSection";
import { getProductBySlugOrId, getRelatedProducts } from "@/lib/products";

export const dynamic = "force-dynamic";

export async function generateMetadata({
  params,
}: PageProps<"/products/[id]">): Promise<Metadata> {
  const { id } = await params;
  const product = await getProductBySlugOrId(id).catch(() => null);
  if (!product) return { title: "Product not found" };
  return {
    title: product.name,
    description: product.description || `Buy ${product.name} on ShopZone.`,
  };
}

export default async function ProductPage({ params }: PageProps<"/products/[id]">) {
  const { id } = await params;
  const product = await getProductBySlugOrId(id).catch(() => null);

  if (!product) notFound();

  const related = await getRelatedProducts(product.categorySlug, product.id, 4).catch(
    () => []
  );

  return (
    <>
      <PageHeader
        title={product.name}
        crumbs={[
          { href: "/products", label: "Products" },
          { href: `/products?category=${product.categorySlug}`, label: product.category },
          { label: product.name },
        ]}
      />

      <Container className="py-10">
        <ProductDetail product={product} />
      </Container>

      {related.length > 0 && (
        <ProductSection
          background
          eyebrow="You may also like"
          title="Related Products"
          products={related}
        />
      )}
    </>
  );
}
