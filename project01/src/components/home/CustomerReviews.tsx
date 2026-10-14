import Image from "next/image";
import Container from "../ui/Container";
import SectionHeader from "../ui/SectionHeader";
import StarRating from "../ui/StarRating";
import { Icon } from "../ui/icons";
import { REVIEWS } from "@/lib/catalog";

export default function CustomerReviews() {
  return (
    <section className="py-14 sm:py-20">
      <Container>
        <SectionHeader
          align="center"
          eyebrow="Testimonials"
          title="What Our Customers Say"
          description="Real reviews from shoppers who found exactly what they were looking for."
        />

        <div className="mt-12 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {REVIEWS.map((review) => (
            <figure
              key={review.id}
              className="flex h-full flex-col rounded-2xl border border-navy-100 bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-navy-900/5"
            >
              <div className="flex items-center justify-between">
                <StarRating value={review.rating} size={16} />
                <span className="text-royal-200">
                  <Icon name="tag" size={20} />
                </span>
              </div>
              <blockquote className="mt-4 flex-1 text-sm leading-relaxed text-navy-600">
                “{review.text}”
              </blockquote>
              <figcaption className="mt-5 flex items-center gap-3 border-t border-navy-100 pt-5">
                <span className="relative h-11 w-11 overflow-hidden rounded-full">
                  <Image
                    src={review.avatar}
                    alt={review.name}
                    fill
                    sizes="44px"
                    className="object-cover"
                  />
                </span>
                <div>
                  <p className="text-sm font-semibold text-navy-900">
                    {review.name}
                  </p>
                  <p className="text-xs text-navy-400">{review.role}</p>
                </div>
              </figcaption>
            </figure>
          ))}
        </div>
      </Container>
    </section>
  );
}
