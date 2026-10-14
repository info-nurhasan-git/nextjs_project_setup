"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { Icon } from "../ui/icons";

const OPTIONS = [
  { value: "newest", label: "Newest" },
  { value: "popular", label: "Most popular" },
  { value: "rating", label: "Top rated" },
  { value: "price-asc", label: "Price: Low to High" },
  { value: "price-desc", label: "Price: High to Low" },
];

export default function SortSelect({ value }: { value: string }) {
  const router = useRouter();
  const searchParams = useSearchParams();

  function onChange(event: React.ChangeEvent<HTMLSelectElement>) {
    const params = new URLSearchParams(searchParams.toString());
    params.set("sort", event.target.value);
    router.push(`/products?${params.toString()}`);
  }

  return (
    <div className="relative">
      <Icon
        name="filter"
        size={16}
        className="pointer-events-none absolute top-1/2 left-3 -translate-y-1/2 text-navy-400"
      />
      <select
        value={value}
        onChange={onChange}
        aria-label="Sort products"
        className="appearance-none rounded-full border border-navy-200 bg-white py-2.5 pr-9 pl-9 text-sm font-medium text-navy-700 outline-none transition focus:border-royal-400"
      >
        {OPTIONS.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      <Icon
        name="chevron-down"
        size={16}
        className="pointer-events-none absolute top-1/2 right-3 -translate-y-1/2 text-navy-400"
      />
    </div>
  );
}
