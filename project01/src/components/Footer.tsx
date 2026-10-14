import Link from "next/link";
import NewsletterForm from "./NewsletterForm";
import { Icon, type IconName } from "./ui/icons";
import {
  CUSTOMER_SERVICE_LINKS,
  LEGAL_LINKS,
  QUICK_LINKS,
} from "@/lib/catalog";

const socials: { name: string; icon: IconName; href: string }[] = [
  { name: "Facebook", icon: "facebook", href: "#" },
  { name: "Twitter", icon: "twitter", href: "#" },
  { name: "Instagram", icon: "instagram", href: "#" },
  { name: "YouTube", icon: "youtube", href: "#" },
];

function FooterLinks({
  title,
  links,
}: {
  title: string;
  links: { href: string; label: string }[];
}) {
  return (
    <div>
      <h3 className="text-sm font-semibold tracking-wide text-white uppercase">
        {title}
      </h3>
      <ul className="mt-4 space-y-2.5">
        {links.map((link) => (
          <li key={link.label}>
            <Link
              href={link.href}
              className="text-sm text-navy-300 transition hover:text-white"
            >
              {link.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default function Footer() {
  return (
    <footer className="mt-16 bg-navy-950 text-navy-200">
      <div className="container-x grid gap-10 py-14 lg:grid-cols-12">
        <div className="lg:col-span-4">
          <div className="flex items-center gap-2.5">
            <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-royal-500 to-royal-700 text-lg font-black text-white">
              S
            </span>
            <span className="text-lg font-extrabold tracking-tight text-white">
              Shop<span className="text-royal-400">Zone</span>
            </span>
          </div>
          <p className="mt-4 max-w-sm text-sm leading-relaxed text-navy-300">
            Your one-stop destination for electronics, fashion, home essentials
            and more. Quality products at great prices, delivered fast.
          </p>
          <div className="mt-5 flex gap-2.5">
            {socials.map((social) => (
              <a
                key={social.name}
                href={social.href}
                aria-label={social.name}
                className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/5 text-navy-200 transition hover:bg-royal-600 hover:text-white"
              >
                <Icon name={social.icon} size={18} />
              </a>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-2 gap-8 sm:grid-cols-3 lg:col-span-5">
          <FooterLinks title="Quick Links" links={QUICK_LINKS} />
          <FooterLinks title="Customer Service" links={CUSTOMER_SERVICE_LINKS} />
          <FooterLinks title="Legal" links={LEGAL_LINKS} />
        </div>

        <div className="lg:col-span-3">
          <h3 className="text-sm font-semibold tracking-wide text-white uppercase">
            Newsletter
          </h3>
          <p className="mt-4 text-sm text-navy-300">
            Get updates about new arrivals, offers and discounts.
          </p>
          <div className="mt-4">
            <NewsletterForm tone="dark" />
          </div>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="container-x flex flex-col items-center justify-between gap-3 py-6 text-xs text-navy-400 sm:flex-row">
          <p>&copy; 2026 ShopZone. All rights reserved.</p>
          <p className="flex items-center gap-1.5">
            <Icon name="shield" size={14} />
            Secure payments &amp; buyer protection
          </p>
        </div>
      </div>
    </footer>
  );
}
