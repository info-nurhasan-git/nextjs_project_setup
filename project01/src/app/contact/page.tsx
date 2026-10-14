import PageHeader from "@/components/PageHeader";
import Container from "@/components/ui/Container";
import ContactForm from "@/components/contact/ContactForm";
import { Icon, type IconName } from "@/components/ui/icons";

export const metadata = {
  title: "Contact Us",
  description: "Get in touch with the ShopZone team — we're here to help.",
};

const details: { icon: IconName; label: string; value: string; href?: string }[] = [
  { icon: "mail", label: "Email us", value: "support@shopzone.com", href: "mailto:support@shopzone.com" },
  { icon: "phone", label: "Call us", value: "+1 (555) 012-3456", href: "tel:+15550123456" },
  { icon: "map-pin", label: "Visit us", value: "123 Market Street, San Francisco, CA" },
  { icon: "clock", label: "Working hours", value: "Mon – Sat, 9:00 AM – 6:00 PM" },
];

export default function ContactPage() {
  return (
    <>
      <PageHeader
        title="Contact Us"
        description="Questions, feedback, or need a hand? We'd love to hear from you."
        crumbs={[{ label: "Contact" }]}
      />

      <Container className="py-10">
        <div className="grid gap-8 lg:grid-cols-[380px_1fr]">
          <div className="space-y-4">
            {details.map((detail) => (
              <div
                key={detail.label}
                className="flex items-start gap-4 rounded-3xl border border-navy-100 bg-white p-5"
              >
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-royal-50 text-royal-600">
                  <Icon name={detail.icon} size={20} />
                </span>
                <div>
                  <p className="text-sm font-semibold text-navy-900">
                    {detail.label}
                  </p>
                  {detail.href ? (
                    <a
                      href={detail.href}
                      className="text-sm text-navy-500 transition hover:text-royal-700"
                    >
                      {detail.value}
                    </a>
                  ) : (
                    <p className="text-sm text-navy-500">{detail.value}</p>
                  )}
                </div>
              </div>
            ))}

            <div className="rounded-3xl bg-gradient-to-br from-navy-900 to-royal-800 p-6 text-white">
              <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-white/10 text-royal-200">
                <Icon name="headset" size={20} />
              </span>
              <h3 className="mt-4 font-semibold">Need faster support?</h3>
              <p className="mt-1 text-sm text-white/70">
                Our live chat is available during working hours for instant
                answers to your questions.
              </p>
            </div>
          </div>

          <section className="rounded-3xl border border-navy-100 bg-white p-6 sm:p-8">
            <h2 className="text-lg font-semibold text-navy-900">
              Send us a message
            </h2>
            <p className="mt-1 text-sm text-navy-500">
              Fill in the form below and we&apos;ll respond as soon as possible.
            </p>
            <div className="mt-6">
              <ContactForm />
            </div>
          </section>
        </div>
      </Container>
    </>
  );
}
