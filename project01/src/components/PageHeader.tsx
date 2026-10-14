import Link from "next/link";
import type { ReactNode } from "react";
import Container from "./ui/Container";
import { Icon } from "./ui/icons";

export type Crumb = { href?: string; label: string };

export default function PageHeader({
  title,
  description,
  crumbs = [],
  children,
}: {
  title: string;
  description?: string;
  crumbs?: Crumb[];
  children?: ReactNode;
}) {
  return (
    <section className="border-b border-navy-100 bg-white">
      <Container className="py-8 sm:py-10">
        <nav aria-label="Breadcrumb" className="flex items-center gap-1.5 text-sm text-navy-400">
          <Link href="/" className="transition hover:text-royal-700">
            Home
          </Link>
          {crumbs.map((crumb) => (
            <span key={crumb.label} className="flex items-center gap-1.5">
              <Icon name="chevron-right" size={14} />
              {crumb.href ? (
                <Link href={crumb.href} className="transition hover:text-royal-700">
                  {crumb.label}
                </Link>
              ) : (
                <span className="font-medium text-navy-700">{crumb.label}</span>
              )}
            </span>
          ))}
        </nav>

        <div className="mt-4 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <h1 className="text-2xl font-bold tracking-tight text-navy-900 sm:text-3xl">
              {title}
            </h1>
            {description && (
              <p className="mt-2 max-w-2xl text-sm text-navy-500 sm:text-base">
                {description}
              </p>
            )}
          </div>
          {children && <div className="shrink-0">{children}</div>}
        </div>
      </Container>
    </section>
  );
}
