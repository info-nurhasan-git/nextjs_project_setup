import Image from "next/image";
import Container from "../ui/Container";
import { ButtonLink } from "../ui/Button";
import { Icon } from "../ui/icons";
import StarRating from "../ui/StarRating";

export default function HeroSection() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-navy-950 via-navy-900 to-royal-800">
      <div className="pointer-events-none absolute -top-24 -right-24 h-96 w-96 rounded-full bg-royal-500/30 blur-3xl" />
      <div className="pointer-events-none absolute bottom-0 left-1/4 h-72 w-72 rounded-full bg-royal-400/20 blur-3xl" />

      <Container className="relative grid items-center gap-12 py-16 lg:grid-cols-2 lg:py-24">
        <div className="animate-fade-up">
          <span className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-4 py-1.5 text-xs font-semibold tracking-wide text-white/90 uppercase backdrop-blur">
            <Icon name="sparkles" size={14} />
            New season, new finds
          </span>

          <h1 className="mt-6 text-4xl leading-[1.05] font-bold tracking-tight text-white sm:text-5xl lg:text-6xl">
            Discover Your Next{" "}
            <span className="bg-gradient-to-r from-royal-300 to-cyan-200 bg-clip-text text-transparent">
              Favorite Thing.
            </span>
          </h1>

          <p className="mt-6 max-w-xl text-base leading-relaxed text-white/70 sm:text-lg">
            Shop the latest trends in electronics, fashion, and everyday
            essentials — all in one place.
          </p>

          <div className="mt-8 flex flex-wrap items-center gap-3">
            <ButtonLink href="/products" size="lg" variant="white" iconRight="arrow-right">
              Shop Now
            </ButtonLink>
            <ButtonLink
              href="/categories"
              size="lg"
              variant="outline"
              className="border-white/25 bg-white/5 text-white hover:border-white/50 hover:text-white"
            >
              Explore Categories
            </ButtonLink>
          </div>

          <div className="mt-10 flex flex-wrap items-center gap-x-8 gap-y-4">
            <div className="flex items-center gap-3">
              <StarRating value={4.9} size={16} />
              <span className="text-sm text-white/70">
                <strong className="text-white">4.9/5</strong> from 12k+ shoppers
              </span>
            </div>
            <div className="flex items-center gap-2 text-sm text-white/70">
              <Icon name="truck" size={18} className="text-royal-300" />
              Free shipping over $50
            </div>
          </div>
        </div>

        <div className="relative animate-fade-in">
          <div className="relative mx-auto aspect-[4/5] w-full max-w-md overflow-hidden rounded-[2rem] border border-white/10 shadow-2xl shadow-navy-950/50">
            <Image
              src="https://images.unsplash.com/photo-1483985988355-763728e1935b?auto=format&fit=crop&w=900&q=80"
              alt="Happy shopper with shopping bags"
              fill
              priority
              sizes="(max-width: 1024px) 100vw, 40vw"
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-navy-950/40 to-transparent" />
          </div>

          <div className="absolute -bottom-4 -left-2 flex items-center gap-3 rounded-2xl border border-navy-100 bg-white p-4 shadow-xl sm:-left-6 animate-float">
            <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600">
              <Icon name="check" size={20} />
            </span>
            <div>
              <p className="text-sm font-semibold text-navy-900">10k+ Products</p>
              <p className="text-xs text-navy-500">Curated & quality checked</p>
            </div>
          </div>

          <div className="absolute -top-4 right-0 flex items-center gap-3 rounded-2xl border border-navy-100 bg-white p-4 shadow-xl sm:right-2">
            <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-royal-50 text-royal-600">
              <Icon name="tag" size={20} />
            </span>
            <div>
              <p className="text-sm font-semibold text-navy-900">Up to 70% Off</p>
              <p className="text-xs text-navy-500">Limited time offers</p>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
