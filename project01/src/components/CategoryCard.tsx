import Image from "next/image";
import Link from "next/link";
import { Icon } from "./ui/icons";
import type { Category } from "@/lib/types";

export default function CategoryCard({
  category,
  count,
}: {
  category: Category;
  count?: number;
}) {
  return (
    <Link
      href={`/categories/${category.slug}`}
      className="group relative flex h-56 flex-col justify-end overflow-hidden rounded-3xl border border-navy-100 bg-navy-900 text-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-navy-900/20"
    >
      <Image
        src={category.image}
        alt={category.name}
        fill
        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
        className="object-cover opacity-70 transition-transform duration-500 group-hover:scale-110 group-hover:opacity-60"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-navy-950 via-navy-950/40 to-transparent" />

      <div className="relative p-5">
        {typeof count === "number" && (
          <span className="mb-2 inline-block rounded-full bg-white/15 px-2.5 py-1 text-xs font-medium backdrop-blur">
            {count} products
          </span>
        )}
        <h3 className="text-lg font-semibold">{category.name}</h3>
        <p className="mt-1 line-clamp-1 text-sm text-white/70">
          {category.description}
        </p>
        <span className="mt-3 inline-flex items-center gap-1 text-sm font-semibold text-white">
          Shop now
          <Icon
            name="arrow-right"
            size={16}
            className="transition-transform duration-200 group-hover:translate-x-1"
          />
        </span>
      </div>
    </Link>
  );
}
