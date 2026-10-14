import PageHeader from "@/components/PageHeader";
import Container from "@/components/ui/Container";
import CategoryCard from "@/components/CategoryCard";
import { CATEGORIES } from "@/lib/catalog";
import { getCategoryCounts } from "@/lib/products";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "Categories",
  description: "Browse all ShopZone categories and departments.",
};

export default async function CategoriesPage() {
  let counts: Record<string, number> = {};
  try {
    counts = await getCategoryCounts();
  } catch {
    counts = {};
  }

  return (
    <>
      <PageHeader
        title="Shop by Category"
        description="Explore our departments and find exactly what you're looking for."
        crumbs={[{ label: "Categories" }]}
      />

      <Container className="py-10">
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {CATEGORIES.map((category) => (
            <CategoryCard
              key={category.slug}
              category={category}
              count={counts[category.slug]}
            />
          ))}
        </div>
      </Container>
    </>
  );
}
