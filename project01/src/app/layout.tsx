import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { CartProvider } from "@/context/CartContext";
import { WishlistProvider } from "@/context/WishlistContext";
import { AuthProvider } from "@/context/AuthContext";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { getCurrentUser } from "@/lib/dal";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "ShopZone — Discover Your Next Favorite Thing",
    template: "%s | ShopZone",
  },
  description:
    "Shop the latest trends in electronics, fashion, and everyday essentials — all in one place. Quality products at great prices, delivered fast.",
  keywords: [
    "ecommerce",
    "online shopping",
    "electronics",
    "fashion",
    "home essentials",
    "ShopZone",
  ],
  openGraph: {
    title: "ShopZone — Discover Your Next Favorite Thing",
    description:
      "Shop the latest trends in electronics, fashion, and everyday essentials — all in one place.",
    url: siteUrl,
    siteName: "ShopZone",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "ShopZone — Discover Your Next Favorite Thing",
    description:
      "Shop the latest trends in electronics, fashion, and everyday essentials — all in one place.",
  },
};

export default async function RootLayout({ children }: LayoutProps<"/">) {
  const user = await getCurrentUser();

  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col bg-background text-navy-900">
        <AuthProvider user={user}>
          <CartProvider>
            <WishlistProvider>
              <Navbar />
              <main className="flex-1">{children}</main>
              <Footer />
            </WishlistProvider>
          </CartProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
