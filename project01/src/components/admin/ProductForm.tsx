"use client";

import { useState } from "react";
import { Button } from "../ui/Button";
import { CATEGORIES } from "@/lib/catalog";
import { slugify } from "@/lib/format";
import type { ProductData } from "@/lib/types";

export type ProductPayload = {
  name: string;
  price: number;
  discountPrice: number | null;
  description: string;
  image: string;
  images: string[];
  category: string;
  categorySlug: string;
  brand: string;
  rating: number;
  numReviews: number;
  stock: number;
  isFeatured: boolean;
  isTrending: boolean;
  isNew: boolean;
};

export default function ProductForm({
  initial,
  onSubmit,
  onCancel,
  busy,
}: {
  initial?: ProductData | null;
  onSubmit: (payload: ProductPayload) => void;
  onCancel: () => void;
  busy: boolean;
}) {
  const [form, setForm] = useState({
    name: initial?.name ?? "",
    price: initial?.price ?? 0,
    discountPrice: initial?.discountPrice ?? 0,
    description: initial?.description ?? "",
    image: initial?.image ?? "",
    imagesText: (initial?.images ?? []).join("\n"),
    category: initial?.category ?? CATEGORIES[0].name,
    brand: initial?.brand ?? "ShopZone",
    rating: initial?.rating ?? 0,
    numReviews: initial?.numReviews ?? 0,
    stock: initial?.stock ?? 0,
    isFeatured: initial?.isFeatured ?? false,
    isTrending: initial?.isTrending ?? false,
    isNew: initial?.isNew ?? true,
  });

  function update<K extends keyof typeof form>(field: K, value: (typeof form)[K]) {
    setForm((prev) => ({ ...prev, [field]: value }));
  }

  function handleSubmit(event: React.FormEvent) {
    event.preventDefault();
    const images = form.imagesText
      .split(/[\n,]+/)
      .map((entry) => entry.trim())
      .filter(Boolean);

    onSubmit({
      name: form.name.trim(),
      price: Number(form.price),
      discountPrice: Number(form.discountPrice) > 0 ? Number(form.discountPrice) : null,
      description: form.description.trim(),
      image: form.image.trim() || images[0] || "",
      images,
      category: form.category.trim(),
      categorySlug: slugify(form.category),
      brand: form.brand.trim() || "ShopZone",
      rating: Number(form.rating),
      numReviews: Number(form.numReviews),
      stock: Number(form.stock),
      isFeatured: form.isFeatured,
      isTrending: form.isTrending,
      isNew: form.isNew,
    });
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid gap-4 sm:grid-cols-2">
        <label className="block sm:col-span-2">
          <span className="mb-1.5 block text-sm font-medium text-navy-700">
            Product name
          </span>
          <input
            required
            value={form.name}
            onChange={(event) => update("name", event.target.value)}
            className="input"
          />
        </label>

        <label className="block">
          <span className="mb-1.5 block text-sm font-medium text-navy-700">
            Category
          </span>
          <select
            value={form.category}
            onChange={(event) => update("category", event.target.value)}
            className="input"
          >
            {CATEGORIES.map((category) => (
              <option key={category.slug} value={category.name}>
                {category.name}
              </option>
            ))}
          </select>
        </label>

        <label className="block">
          <span className="mb-1.5 block text-sm font-medium text-navy-700">
            Brand
          </span>
          <input
            value={form.brand}
            onChange={(event) => update("brand", event.target.value)}
            className="input"
          />
        </label>

        <label className="block">
          <span className="mb-1.5 block text-sm font-medium text-navy-700">
            Price ($)
          </span>
          <input
            required
            type="number"
            min={0}
            step="0.01"
            value={form.price}
            onChange={(event) => update("price", Number(event.target.value))}
            className="input"
          />
        </label>

        <label className="block">
          <span className="mb-1.5 block text-sm font-medium text-navy-700">
            Discount price ($)
          </span>
          <input
            type="number"
            min={0}
            step="0.01"
            value={form.discountPrice}
            onChange={(event) => update("discountPrice", Number(event.target.value))}
            className="input"
          />
        </label>

        <label className="block">
          <span className="mb-1.5 block text-sm font-medium text-navy-700">
            Stock
          </span>
          <input
            type="number"
            min={0}
            value={form.stock}
            onChange={(event) => update("stock", Number(event.target.value))}
            className="input"
          />
        </label>

        <label className="block">
          <span className="mb-1.5 block text-sm font-medium text-navy-700">
            Rating (0–5)
          </span>
          <input
            type="number"
            min={0}
            max={5}
            step="0.1"
            value={form.rating}
            onChange={(event) => update("rating", Number(event.target.value))}
            className="input"
          />
        </label>

        <label className="block sm:col-span-2">
          <span className="mb-1.5 block text-sm font-medium text-navy-700">
            Main image URL
          </span>
          <input
            value={form.image}
            onChange={(event) => update("image", event.target.value)}
            placeholder="https://..."
            className="input"
          />
        </label>

        <label className="block sm:col-span-2">
          <span className="mb-1.5 block text-sm font-medium text-navy-700">
            Additional image URLs (one per line)
          </span>
          <textarea
            rows={3}
            value={form.imagesText}
            onChange={(event) => update("imagesText", event.target.value)}
            placeholder="https://..."
            className="input resize-none"
          />
        </label>

        <label className="block sm:col-span-2">
          <span className="mb-1.5 block text-sm font-medium text-navy-700">
            Description
          </span>
          <textarea
            rows={3}
            value={form.description}
            onChange={(event) => update("description", event.target.value)}
            className="input resize-none"
          />
        </label>
      </div>

      <div className="flex flex-wrap gap-4">
        <Toggle
          label="Featured"
          checked={form.isFeatured}
          onChange={(value) => update("isFeatured", value)}
        />
        <Toggle
          label="Trending"
          checked={form.isTrending}
          onChange={(value) => update("isTrending", value)}
        />
        <Toggle
          label="New arrival"
          checked={form.isNew}
          onChange={(value) => update("isNew", value)}
        />
      </div>

      <div className="flex items-center gap-3 pt-2">
        <Button type="submit" variant="primary" disabled={busy}>
          {busy ? "Saving..." : initial ? "Update product" : "Create product"}
        </Button>
        <Button type="button" variant="outline" onClick={onCancel} disabled={busy}>
          Cancel
        </Button>
      </div>
    </form>
  );
}

function Toggle({
  label,
  checked,
  onChange,
}: {
  label: string;
  checked: boolean;
  onChange: (value: boolean) => void;
}) {
  return (
    <label className="flex cursor-pointer items-center gap-2 text-sm font-medium text-navy-700">
      <input
        type="checkbox"
        checked={checked}
        onChange={(event) => onChange(event.target.checked)}
        className="peer sr-only"
      />
      <span className="relative h-5 w-9 rounded-full bg-navy-200 transition peer-checked:bg-royal-600 after:absolute after:top-0.5 after:left-0.5 after:h-4 after:w-4 after:rounded-full after:bg-white after:transition peer-checked:after:translate-x-4" />
      {label}
    </label>
  );
}
