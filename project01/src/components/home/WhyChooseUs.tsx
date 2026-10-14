import Container from "../ui/Container";
import SectionHeader from "../ui/SectionHeader";
import { Icon, type IconName } from "../ui/icons";
import { FEATURES, type FeatureIcon } from "@/lib/catalog";

const iconFor: Record<FeatureIcon, IconName> = {
  truck: "truck",
  shield: "shield",
  refresh: "refresh",
  headset: "headset",
  tag: "tag",
};

export default function WhyChooseUs() {
  return (
    <section className="bg-white py-14 sm:py-20">
      <Container>
        <SectionHeader
          align="center"
          eyebrow="Why ShopZone"
          title="Why Choose Us?"
          description="We are committed to giving you a shopping experience that is fast, secure and always worth it."
        />

        <div className="mt-12 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {FEATURES.map((feature) => (
            <div
              key={feature.title}
              className="group flex gap-4 rounded-2xl border border-navy-100 bg-navy-50/40 p-6 transition-all duration-300 hover:-translate-y-1 hover:border-royal-200 hover:bg-white hover:shadow-lg hover:shadow-navy-900/5"
            >
              <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-royal-600 text-white shadow-lg shadow-royal-600/25 transition-transform duration-300 group-hover:scale-110">
                <Icon name={iconFor[feature.icon]} size={22} />
              </span>
              <div>
                <h3 className="font-semibold text-navy-900">{feature.title}</h3>
                <p className="mt-1 text-sm leading-relaxed text-navy-500">
                  {feature.description}
                </p>
              </div>
            </div>
          ))}

          <div className="flex items-center justify-center rounded-2xl border border-dashed border-royal-200 bg-royal-50/50 p-6 text-center">
            <div>
              <p className="text-2xl font-bold text-royal-700">98.5%</p>
              <p className="mt-1 text-sm font-medium text-navy-600">
                Customer satisfaction rate
              </p>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
