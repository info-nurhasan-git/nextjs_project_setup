import Link from "next/link";
import PageHeader from "@/components/PageHeader";
import ProductGrid from "@/components/ProductGrid";
import Container from "@/components/ui/Container";
import SortSelect from "@/components/products/SortSelect";
import { Icon } from "@/components/ui/icons";
import { getProducts, getCategoryCounts } from "@/lib/products";
import { CATEGORIES } from "@/lib/catalog";
import type { ProductData, SortOption } from "@/lib/types";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "All Products",
  description:
    "Browse the full ShopZone catalog — electronics, fashion, home essentials and more.",
};

const SORTS: SortOption[] = ["newest", "popular", "rating", "price-asc", "price-desc"];

export default async function ProductsPage({
  searchParams,
}: PageProps<"/products">) {
  const params = await searchParams;
  const q = typeof params.q === "string" ? params.q : undefined;
  const category = typeof params.category === "string" ? params.category : undefined;
  const sortParam = typeof params.sort === "string" ? params.sort : undefined;
  const sort = SORTS.includes(sortParam as SortOption)
    ? (sortParam as SortOption)
    : "newest";

  let products: ProductData[] = [];
  let counts: Record<string, number> = {};
  try {
    [products, counts] = await Promise.all([
      getProducts({ search: q, category, sort }),
      getCategoryCounts(),
    ]);
  } catch {
    products = [];
  }

  const activeCategory = CATEGORIES.find((entry) => entry.slug === category);

  return (
    <>
      <PageHeader
        title={activeCategory ? activeCategory.name : "All Products"}
        description={
          activeCategory
            ? activeCategory.description
            : "Browse our full catalog of quality products at great prices."
        }
        crumbs={[
          { href: "/products", label: "Products" },
          ...(activeCategory ? [{ label: activeCategory.name }] : []),
        ]}
      />

      <Container className="py-10">
        <div className="grid gap-8 lg:grid-cols-[260px_1fr]">
          <aside className="lg:sticky lg:top-40 lg:self-start">
            <div className="hidden rounded-2xl border border-navy-100 bg-white p-5 lg:block">
              <h2 className="flex items-center gap-2 text-sm font-semibold text-navy-900">
                <Icon name="filter" size={16} className="text-royal-600" />
                Categories
              </h2>
              <ul className="mt-4 space-y-1">
                <li>
                  <Link
                    href="/products"
                    className={`flex items-center justify-between rounded-xl px-3 py-2 text-sm transition ${
                      !category
                        ? "bg-royal-50 font-semibold text-royal-700"
                        : "text-navy-600 hover:bg-navy-50"
                    }`}
                  >
                    All Products
                  </Link>
                </li>
                {CATEGORIES.map((entry) => (
                  <li key={entry.slug}>
                    <Link
                      href={`/products?category=${entry.slug}`}
                      className={`flex items-center justify-between rounded-xl px-3 py-2 text-sm transition ${
                        category === entry.slug
                          ? "bg-royal-50 font-semibold text-royal-700"
                          : "text-navy-600 hover:bg-navy-50"
                      }`}
                    >
                      <span>{entry.name}</span>
                      <span className="text-xs text-navy-400">
                        {counts[entry.slug] ?? 0}
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div className="no-scrollbar -mx-4 flex gap-2 overflow-x-auto px-4 lg:hidden">
              <Link
                href="/products"
                className={`shrink-0 rounded-full border px-4 py-2 text-sm font-medium transition ${
                  !category
                    ? "border-royal-600 bg-royal-600 text-white"
                    : "border-navy-200 bg-white text-navy-600"
                }`}
              >
                All
              </Link>
              {CATEGORIES.map((entry) => (
                <Link
                  key={entry.slug}
                  href={`/products?category=${entry.slug}`}
                  className={`shrink-0 rounded-full border px-4 py-2 text-sm font-medium transition ${
                    category === entry.slug
                      ? "border-royal-600 bg-royal-600 text-white"
                      : "border-navy-200 bg-white text-navy-600"
                  }`}
                >
                  {entry.name}
                </Link>
              ))}
            </div>
          </aside>

          <div>
            <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
              <p className="text-sm text-navy-500">
                <span className="font-semibold text-navy-900">{products.length}</span>{" "}
                {products.length === 1 ? "product" : "products"} found
                {q && (
                  <>
                    {" "}
                    for <span className="font-semibold text-navy-900">“{q}”</span>
                  </>
                )}
              </p>
              <SortSelect value={sort} />
            </div>

            <ProductGrid
              products={products}
              emptyTitle="No products match your filters"
              emptyDescription="Try a different search term or browse another category."
            />
          </div>
        </div>
      </Container>
    </>
  );
}
