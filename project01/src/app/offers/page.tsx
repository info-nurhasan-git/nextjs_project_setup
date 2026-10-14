import PageHeader from "@/components/PageHeader";
import Container from "@/components/ui/Container";
import ProductGrid from "@/components/ProductGrid";
import { ButtonLink } from "@/components/ui/Button";
import { Icon } from "@/components/ui/icons";
import { getProducts } from "@/lib/products";
import { formatPrice } from "@/lib/format";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "Special Offers",
  description: "Grab the best deals and limited-time discounts at ShopZone.",
};

export default async function OffersPage() {
  let products: Awaited<ReturnType<typeof getProducts>> = [];
  let error = false;

  try {
    products = await getProducts({ onSale: true, sort: "price-asc" });
  } catch {
    error = true;
  }

  const biggestSaving = products.reduce((max, product) => {
    if (!product.discountPrice) return max;
    return Math.max(max, product.price - product.discountPrice);
  }, 0);

  return (
    <>
      <PageHeader
        title="Special Offers"
        description="Limited-time deals on your favorite products — while stocks last."
        crumbs={[{ label: "Offers" }]}
      />

      <Container className="py-10">
        <div className="mb-8 flex flex-col items-start gap-4 overflow-hidden rounded-3xl bg-gradient-to-br from-royal-600 via-royal-700 to-navy-900 p-8 text-white sm:flex-row sm:items-center sm:justify-between">
          <div>
            <span className="inline-flex items-center gap-1.5 rounded-full bg-white/15 px-3 py-1 text-xs font-semibold">
              <Icon name="sparkles" size={14} />
              Deals of the week
            </span>
            <h2 className="mt-3 text-2xl font-bold">Save big on top picks</h2>
            <p className="mt-1 max-w-md text-sm text-white/75">
              {products.length > 0
                ? `Shop ${products.length} discounted products and save up to ${formatPrice(biggestSaving)} on a single item.`
                : "Check back soon for fresh discounts and seasonal sales."}
            </p>
          </div>
          <ButtonLink href="/products" variant="white" className="shrink-0">
            Shop all products
          </ButtonLink>
        </div>

        {error ? (
          <div className="rounded-3xl border border-amber-200 bg-amber-50 px-6 py-10 text-center text-sm text-amber-700">
            We couldn&apos;t load the current offers. Please refresh the page.
          </div>
        ) : (
          <ProductGrid
            products={products}
            emptyTitle="No active offers right now"
            emptyDescription="Our deals sell out fast. Browse the full catalog for more great products."
            emptyAction={
              <ButtonLink href="/products" variant="primary">
                Browse products
              </ButtonLink>
            }
          />
        )}
      </Container>
    </>
  );
}
