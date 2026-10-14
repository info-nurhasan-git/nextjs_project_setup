import HeroSection from "@/components/home/HeroSection";
import SpecialOffers from "@/components/home/SpecialOffers";
import WhyChooseUs from "@/components/home/WhyChooseUs";
import Newsletter from "@/components/home/Newsletter";
import CustomerReviews from "@/components/home/CustomerReviews";
import CategoryCard from "@/components/CategoryCard";
import ProductSection from "@/components/ProductSection";
import Container from "@/components/ui/Container";
import SectionHeader from "@/components/ui/SectionHeader";
import { ButtonLink } from "@/components/ui/Button";
import { Icon } from "@/components/ui/icons";
import { getProducts, getCategoryCounts } from "@/lib/products";
import { CATEGORIES } from "@/lib/catalog";
import type { ProductData } from "@/lib/types";

export const dynamic = "force-dynamic";

export default async function Home() {
  let featured: ProductData[] = [];
  let trending: ProductData[] = [];
  let newArrivals: ProductData[] = [];
  let counts: Record<string, number> = {};
  let dbError = false;

  try {
    [featured, trending, newArrivals, counts] = await Promise.all([
      getProducts({ featured: true, limit: 8 }),
      getProducts({ trending: true, limit: 8 }),
      getProducts({ isNew: true, sort: "newest", limit: 8 }),
      getCategoryCounts(),
    ]);
  } catch {
    dbError = true;
  }

  const dbNotice = dbError ? (
    <Container className="pt-10">
      <div className="flex items-start gap-3 rounded-2xl border border-amber-200 bg-amber-50 p-4 text-sm text-amber-800">
        <Icon name="shield" size={18} className="mt-0.5 shrink-0" />
        <p>
          We could not reach the product database. Make sure{" "}
          <code className="rounded bg-amber-100 px-1">MONGODB_URI</code> is set in{" "}
          <code className="rounded bg-amber-100 px-1">.env.local</code> and run{" "}
          <code className="rounded bg-amber-100 px-1">npm run seed</code> to add
          sample products.
        </p>
      </div>
    </Container>
  ) : null;

  return (
    <>
      <HeroSection />

      {dbNotice}

      <section className="py-14 sm:py-20">
        <Container>
          <SectionHeader
            eyebrow="Browse"
            title="Shop by Category"
            description="Find exactly what you need across our most popular departments."
            action={
              <ButtonLink href="/categories" variant="outline" size="sm" iconRight="arrow-right">
                All categories
              </ButtonLink>
            }
          />
          <div className="mt-10 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {CATEGORIES.map((category) => (
              <CategoryCard
                key={category.slug}
                category={category}
                count={counts[category.slug]}
              />
            ))}
          </div>
        </Container>
      </section>

      <ProductSection
        background
        eyebrow="Handpicked"
        title="Featured Products"
        description="Our team's favorite picks, chosen for quality and value."
        action={
          <ButtonLink href="/products" variant="ghost" size="sm" iconRight="arrow-right">
            View all
          </ButtonLink>
        }
        products={featured}
        emptyTitle="No featured products yet"
        emptyDescription="Add products from the admin dashboard and mark them as featured."
      />

      <SpecialOffers />

      <ProductSection
        eyebrow="Popular right now"
        title="Trending Now"
        description="The products everyone is talking about this week."
        action={
          <ButtonLink href="/products?sort=popular" variant="ghost" size="sm" iconRight="arrow-right">
            View all
          </ButtonLink>
        }
        products={trending}
        emptyTitle="Nothing trending yet"
        emptyDescription="Mark products as trending from the admin dashboard to feature them here."
      />

      <ProductSection
        background
        eyebrow="Just dropped"
        title="Fresh Finds, Just for You"
        description="The latest products added to the store."
        action={
          <ButtonLink href="/products?sort=newest" variant="primary" size="sm" iconRight="arrow-right">
            View All
          </ButtonLink>
        }
        products={newArrivals}
        emptyTitle="No new arrivals yet"
        emptyDescription="Newly added products will appear here."
      />

      <WhyChooseUs />

      <Newsletter />

      <CustomerReviews />
    </>
  );
}
