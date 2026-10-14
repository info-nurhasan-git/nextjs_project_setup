import Container from "../ui/Container";
import { ButtonLink } from "../ui/Button";
import { Icon } from "../ui/icons";

export default function SpecialOffers() {
  return (
    <section className="py-14 sm:py-20">
      <Container>
        <div className="relative overflow-hidden rounded-[2rem] bg-gradient-to-r from-navy-950 via-royal-800 to-royal-600 px-6 py-12 sm:px-12 sm:py-16">
          <div className="pointer-events-none absolute -top-16 -right-10 h-64 w-64 rounded-full bg-white/10 blur-3xl" />
          <div className="pointer-events-none absolute right-10 bottom-0 hidden text-[12rem] leading-none font-black text-white/5 select-none lg:block">
            %
          </div>

          <div className="relative max-w-2xl">
            <span className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-1.5 text-xs font-semibold tracking-wide text-white uppercase backdrop-blur">
              <Icon name="tag" size={14} />
              Limited time
            </span>
            <h2 className="mt-5 text-3xl font-bold tracking-tight text-white sm:text-4xl">
              Exclusive Deals You Don&apos;t Want to Miss!
            </h2>
            <p className="mt-4 text-base leading-relaxed text-white/75">
              Discover amazing deals on your favorite products and enjoy great
              value on every purchase.
            </p>
            <div className="mt-8">
              <ButtonLink href="/offers" size="lg" variant="white" iconRight="arrow-right">
                Explore Offers
              </ButtonLink>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
