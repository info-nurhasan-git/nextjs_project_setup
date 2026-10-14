import Image from "next/image";
import Link from "next/link";
import AddToCartButton from "./AddToCartButton";
import WishlistButton from "./WishlistButton";
import StarRating from "./ui/StarRating";
import PriceTag from "./ui/PriceTag";
import Badge from "./ui/Badge";
import { discountPercent } from "@/lib/format";
import type { ProductData } from "@/lib/types";

function stockLabel(stock: number): { text: string; tone: "success" | "warning" | "danger" } {
  if (stock <= 0) return { text: "Out of stock", tone: "danger" };
  if (stock <= 5) return { text: `Only ${stock} left`, tone: "warning" };
  return { text: "In stock", tone: "success" };
}

export default function ProductCard({
  product,
  priority = false,
}: {
  product: ProductData;
  priority?: boolean;
}) {
  const percent = discountPercent(product.price, product.discountPrice);
  const stock = stockLabel(product.stock);

  return (
    <article className="group relative flex h-full flex-col overflow-hidden rounded-3xl border border-navy-100 bg-white transition-all duration-300 hover:-translate-y-1 hover:border-royal-200 hover:shadow-xl hover:shadow-navy-900/10">
      <div className="relative aspect-square overflow-hidden bg-navy-50">
        <Link href={`/products/${product.slug}`} aria-label={product.name}>
          <Image
            src={product.image || "https://placehold.co/600x600?text=ShopZone"}
            alt={product.name}
            fill
            priority={priority}
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
            className="object-cover transition-transform duration-500 group-hover:scale-105"
          />
        </Link>

        <div className="absolute top-3 left-3 flex flex-col items-start gap-2">
          {percent > 0 && <Badge variant="danger">-{percent}%</Badge>}
          {product.isNew && <Badge variant="royal" icon="sparkles">New</Badge>}
        </div>

        <div className="absolute top-3 right-3 opacity-0 transition-opacity duration-200 group-hover:opacity-100 focus-within:opacity-100">
          <WishlistButton productId={product.id} />
        </div>
      </div>

      <div className="flex flex-1 flex-col gap-2 p-4">
        <p className="text-xs font-medium tracking-wide text-royal-600 uppercase">
          {product.category}
        </p>
        <Link
          href={`/products/${product.slug}`}
          className="line-clamp-2 font-semibold text-navy-900 transition-colors hover:text-royal-700"
        >
          {product.name}
        </Link>

        <StarRating value={product.rating} count={product.numReviews} showValue size={15} />

        <PriceTag price={product.price} discountPrice={product.discountPrice} className="mt-1" />

        <p
          className={`text-xs font-semibold ${
            stock.tone === "success"
              ? "text-emerald-600"
              : stock.tone === "warning"
                ? "text-amber-600"
                : "text-red-500"
          }`}
        >
          {stock.text}
        </p>

        <div className="mt-auto pt-3">
          <AddToCartButton
            product={{
              id: product.id,
              name: product.name,
              slug: product.slug,
              price:
                product.discountPrice && product.discountPrice > 0
                  ? product.discountPrice
                  : product.price,
              image: product.image,
              stock: product.stock,
            }}
          />
        </div>
      </div>
    </article>
  );
}
