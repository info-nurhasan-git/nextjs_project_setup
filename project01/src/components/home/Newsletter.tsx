import Container from "../ui/Container";
import NewsletterForm from "../NewsletterForm";
import { Icon } from "../ui/icons";

export default function Newsletter() {
  return (
    <section className="py-14 sm:py-20">
      <Container>
        <div className="relative overflow-hidden rounded-[2rem] border border-navy-100 bg-white px-6 py-12 shadow-sm sm:px-12 sm:py-16">
          <div className="pointer-events-none absolute -top-20 -right-16 h-64 w-64 rounded-full bg-royal-100/70 blur-3xl" />
          <div className="pointer-events-none absolute -bottom-24 -left-16 h-64 w-64 rounded-full bg-navy-100/70 blur-3xl" />

          <div className="relative mx-auto max-w-2xl text-center">
            <span className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-royal-600 text-white shadow-lg shadow-royal-600/25">
              <Icon name="mail" size={26} />
            </span>
            <h2 className="mt-5 text-2xl font-bold tracking-tight text-navy-900 sm:text-3xl">
              Stay in the Loop
            </h2>
            <p className="mt-3 text-sm leading-relaxed text-navy-500 sm:text-base">
              Subscribe to our newsletter to receive updates about new arrivals,
              exclusive offers, and special discounts.
            </p>
            <div className="mx-auto mt-8 max-w-xl">
              <NewsletterForm tone="light" />
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
