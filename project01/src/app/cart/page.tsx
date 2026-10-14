"use client";

import Image from "next/image";
import Link from "next/link";
import PageHeader from "@/components/PageHeader";
import Container from "@/components/ui/Container";
import EmptyState from "@/components/ui/EmptyState";
import Skeleton from "@/components/ui/Skeleton";
import { ButtonLink } from "@/components/ui/Button";
import { Icon } from "@/components/ui/icons";
import { useCart } from "@/context/CartContext";
import { formatPrice } from "@/lib/format";
import { FREE_SHIPPING_THRESHOLD, STANDARD_SHIPPING } from "@/lib/catalog";

export default function CartPage() {
  const { items, removeFromCart, updateQuantity, total, count, ready } = useCart();

  const shipping =
    total >= FREE_SHIPPING_THRESHOLD || total === 0 ? 0 : STANDARD_SHIPPING;
  const grandTotal = total + shipping;
  const remaining = Math.max(0, FREE_SHIPPING_THRESHOLD - total);

  return (
    <>
      <PageHeader
        title="Shopping Cart"
        description={count > 0 ? `${count} item(s) in your cart` : undefined}
        crumbs={[{ label: "Cart" }]}
      />

      <Container className="py-10">
        {!ready ? (
          <div className="grid gap-6 lg:grid-cols-[1fr_360px]">
            <div className="space-y-4">
              {[0, 1, 2].map((key) => (
                <Skeleton key={key} className="h-28 w-full" />
              ))}
            </div>
            <Skeleton className="h-72 w-full" />
          </div>
        ) : items.length === 0 ? (
          <EmptyState
            icon="cart"
            title="Your cart is empty"
            description="Looks like you haven't added anything yet. Start exploring our latest products."
            action={
              <ButtonLink href="/products" variant="primary" iconRight="arrow-right">
                Start shopping
              </ButtonLink>
            }
          />
        ) : (
          <div className="grid gap-8 lg:grid-cols-[1fr_360px]">
            <div className="space-y-4">
              {remaining > 0 && (
                <div className="rounded-2xl border border-royal-100 bg-royal-50 p-4 text-sm text-royal-800">
                  Add{" "}
                  <strong>{formatPrice(remaining)}</strong> more to unlock free
                  shipping!
                </div>
              )}

              {items.map((item) => (
                <div
                  key={item.id}
                  className="flex flex-wrap items-center gap-4 rounded-2xl border border-navy-100 bg-white p-4 sm:flex-nowrap"
                >
                  <Link
                    href={`/products/${item.slug}`}
                    className="relative h-24 w-24 shrink-0 overflow-hidden rounded-2xl bg-navy-50"
                  >
                    <Image
                      src={item.image || "https://placehold.co/200x200?text=ShopZone"}
                      alt={item.name}
                      fill
                      sizes="96px"
                      className="object-cover"
                    />
                  </Link>

                  <div className="min-w-0 flex-1">
                    <Link
                      href={`/products/${item.slug}`}
                      className="line-clamp-2 font-semibold text-navy-900 hover:text-royal-700"
                    >
                      {item.name}
                    </Link>
                    <p className="mt-1 text-sm text-navy-500">
                      {formatPrice(item.price)}
                    </p>
                  </div>

                  <div className="flex items-center rounded-full border border-navy-200">
                    <button
                      type="button"
                      onClick={() => updateQuantity(item.id, item.quantity - 1)}
                      className="flex h-9 w-9 items-center justify-center rounded-full text-navy-600 transition hover:bg-navy-50"
                      aria-label="Decrease quantity"
                    >
                      <Icon name="minus" size={16} />
                    </button>
                    <span className="w-8 text-center text-sm font-semibold">
                      {item.quantity}
                    </span>
                    <button
                      type="button"
                      onClick={() => updateQuantity(item.id, item.quantity + 1)}
                      className="flex h-9 w-9 items-center justify-center rounded-full text-navy-600 transition hover:bg-navy-50"
                      aria-label="Increase quantity"
                    >
                      <Icon name="plus" size={16} />
                    </button>
                  </div>

                  <p className="w-24 text-right font-semibold text-navy-900">
                    {formatPrice(item.price * item.quantity)}
                  </p>

                  <button
                    type="button"
                    onClick={() => removeFromCart(item.id)}
                    className="flex h-9 w-9 items-center justify-center rounded-full text-navy-400 transition hover:bg-red-50 hover:text-red-500"
                    aria-label="Remove item"
                  >
                    <Icon name="trash" size={18} />
                  </button>
                </div>
              ))}

              <div className="flex flex-wrap gap-3 pt-2">
                <ButtonLink href="/products" variant="outline" size="sm" icon="arrow-left">
                  Continue shopping
                </ButtonLink>
              </div>
            </div>

            <aside className="lg:sticky lg:top-40 lg:self-start">
              <div className="rounded-3xl border border-navy-100 bg-white p-6">
                <h2 className="text-lg font-semibold text-navy-900">
                  Order Summary
                </h2>

                <dl className="mt-5 space-y-3 text-sm">
                  <div className="flex justify-between text-navy-600">
                    <dt>Subtotal ({count} items)</dt>
                    <dd className="font-medium text-navy-900">
                      {formatPrice(total)}
                    </dd>
                  </div>
                  <div className="flex justify-between text-navy-600">
                    <dt>Shipping</dt>
                    <dd className="font-medium text-navy-900">
                      {shipping === 0 ? "Free" : formatPrice(shipping)}
                    </dd>
                  </div>
                  <div className="flex justify-between border-t border-navy-100 pt-3 text-base">
                    <dt className="font-semibold text-navy-900">Total</dt>
                    <dd className="font-bold text-navy-900">
                      {formatPrice(grandTotal)}
                    </dd>
                  </div>
                </dl>

                <ButtonLink
                  href="/checkout"
                  variant="primary"
                  size="lg"
                  className="mt-6 w-full"
                  iconRight="arrow-right"
                >
                  Proceed to Checkout
                </ButtonLink>

                <p className="mt-4 flex items-center justify-center gap-1.5 text-xs text-navy-400">
                  <Icon name="shield" size={14} />
                  Secure checkout · Buyer protection
                </p>
              </div>
            </aside>
          </div>
        )}
      </Container>
    </>
  );
}
