"use client";

import Image from "next/image";
import Link from "next/link";
import { useMemo, useState } from "react";
import AddToCartButton from "../AddToCartButton";
import WishlistButton from "../WishlistButton";
import StarRating from "../ui/StarRating";
import PriceTag from "../ui/PriceTag";
import Badge from "../ui/Badge";
import { Icon, type IconName } from "../ui/icons";
import { discountPercent, effectivePrice } from "@/lib/format";
import type { ProductData } from "@/lib/types";

const assurances: { icon: IconName; title: string; text: string }[] = [
  { icon: "truck", title: "Free delivery", text: "On orders over $50" },
  { icon: "refresh", title: "30-day returns", text: "Hassle-free refunds" },
  { icon: "shield", title: "Secure payment", text: "Encrypted checkout" },
];

export default function ProductDetail({ product }: { product: ProductData }) {
  const gallery = useMemo(() => {
    const list = [product.image, ...product.images].filter(Boolean);
    return Array.from(new Set(list));
  }, [product.image, product.images]);

  const [activeImage, setActiveImage] = useState(gallery[0] ?? "");
  const [quantity, setQuantity] = useState(1);

  const price = effectivePrice(product.price, product.discountPrice);
  const percent = discountPercent(product.price, product.discountPrice);
  const outOfStock = product.stock <= 0;

  return (
    <div className="grid gap-8 lg:grid-cols-2 lg:gap-12">
      <div>
        <div className="relative aspect-square overflow-hidden rounded-3xl border border-navy-100 bg-white">
          <Image
            src={activeImage || "https://placehold.co/800x800?text=ShopZone"}
            alt={product.name}
            fill
            priority
            sizes="(max-width: 1024px) 100vw, 50vw"
            className="object-cover"
          />
          {percent > 0 && (
            <div className="absolute top-4 left-4">
              <Badge variant="danger" className="text-sm">
                -{percent}% OFF
              </Badge>
            </div>
          )}
        </div>

        {gallery.length > 1 && (
          <div className="mt-4 flex gap-3 overflow-x-auto pb-1">
            {gallery.map((image) => (
              <button
                key={image}
                type="button"
                onClick={() => setActiveImage(image)}
                aria-label="View image"
                className={`relative h-20 w-20 shrink-0 overflow-hidden rounded-2xl border-2 transition ${
                  activeImage === image
                    ? "border-royal-600"
                    : "border-transparent opacity-70 hover:opacity-100"
                }`}
              >
                <Image src={image} alt={product.name} fill sizes="80px" className="object-cover" />
              </button>
            ))}
          </div>
        )}
      </div>

      <div className="flex flex-col">
        <div className="flex items-center gap-2">
          <Link
            href={`/products?category=${product.categorySlug}`}
            className="text-xs font-semibold tracking-wide text-royal-600 uppercase hover:underline"
          >
            {product.category}
          </Link>
          {product.isNew && <Badge variant="royal">New</Badge>}
        </div>

        <h1 className="mt-3 text-2xl font-bold tracking-tight text-navy-900 sm:text-3xl">
          {product.name}
        </h1>

        <div className="mt-3 flex items-center gap-3">
          <StarRating value={product.rating} count={product.numReviews} showValue size={17} />
          <span className="text-sm text-navy-300">|</span>
          <span className="text-sm text-navy-500">Brand: {product.brand}</span>
        </div>

        <div className="mt-5">
          <PriceTag price={product.price} discountPrice={product.discountPrice} size="lg" />
        </div>

        <p className="mt-5 text-sm leading-relaxed text-navy-600">
          {product.description || "No description available for this product yet."}
        </p>

        <div className="mt-5 flex items-center gap-2 text-sm">
          {outOfStock ? (
            <span className="inline-flex items-center gap-2 font-semibold text-red-500">
              <span className="h-2 w-2 rounded-full bg-red-500" /> Out of stock
            </span>
          ) : product.stock <= 5 ? (
            <span className="inline-flex items-center gap-2 font-semibold text-amber-600">
              <span className="h-2 w-2 rounded-full bg-amber-500" /> Only {product.stock} left in stock
            </span>
          ) : (
            <span className="inline-flex items-center gap-2 font-semibold text-emerald-600">
              <span className="h-2 w-2 rounded-full bg-emerald-500" /> In stock ({product.stock} available)
            </span>
          )}
        </div>

        <div className="mt-7 flex flex-wrap items-center gap-4">
          <div className="flex items-center rounded-full border border-navy-200 bg-white">
            <button
              type="button"
              onClick={() => setQuantity((value) => Math.max(1, value - 1))}
              className="flex h-11 w-11 items-center justify-center rounded-full text-navy-600 transition hover:bg-navy-50"
              aria-label="Decrease quantity"
            >
              <Icon name="minus" size={18} />
            </button>
            <span className="w-10 text-center text-sm font-semibold">{quantity}</span>
            <button
              type="button"
              onClick={() =>
                setQuantity((value) => Math.min(product.stock || 99, value + 1))
              }
              className="flex h-11 w-11 items-center justify-center rounded-full text-navy-600 transition hover:bg-navy-50"
              aria-label="Increase quantity"
            >
              <Icon name="plus" size={18} />
            </button>
          </div>

          <WishlistButton productId={product.id} showLabel />
        </div>

        <div className="mt-5">
          <AddToCartButton
            size="lg"
            quantity={quantity}
            className="sm:w-auto sm:min-w-64"
            product={{
              id: product.id,
              name: product.name,
              slug: product.slug,
              price,
              image: product.image,
              stock: product.stock,
            }}
          />
        </div>

        <dl className="mt-8 grid grid-cols-1 gap-3 border-t border-navy-100 pt-6 sm:grid-cols-3">
          {assurances.map((item) => (
            <div key={item.title} className="flex items-center gap-3">
              <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-royal-50 text-royal-600">
                <Icon name={item.icon} size={20} />
              </span>
              <div>
                <dt className="text-sm font-semibold text-navy-800">{item.title}</dt>
                <dd className="text-xs text-navy-400">{item.text}</dd>
              </div>
            </div>
          ))}
        </dl>

        <div className="mt-6 rounded-2xl bg-navy-50 p-4 text-xs text-navy-500">
          <p>
            SKU: <span className="font-mono text-navy-700">{product.id.slice(-8)}</span> ·
            Category: {product.category} · Ships within 24 hours
          </p>
        </div>
      </div>
    </div>
  );
}
