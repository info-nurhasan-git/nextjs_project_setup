"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { useCart } from "@/context/CartContext";
import { useWishlist } from "@/context/WishlistContext";
import { useAuth } from "@/context/AuthContext";
import { NAV_LINKS } from "@/lib/catalog";
import { ButtonLink } from "./ui/Button";
import { Icon } from "./ui/icons";

function Logo() {
  return (
    <Link href="/" className="flex items-center gap-2.5">
      <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-royal-500 to-royal-700 text-lg font-black text-white shadow-lg shadow-royal-600/30">
        S
      </span>
      <span className="text-lg font-extrabold tracking-tight text-navy-900">
        Shop<span className="text-royal-600">Zone</span>
      </span>
    </Link>
  );
}

function SearchBar({ className = "" }: { className?: string }) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [value, setValue] = useState(searchParams.get("q") ?? "");

  function submit(event: React.FormEvent) {
    event.preventDefault();
    const query = value.trim();
    router.push(query ? `/products?q=${encodeURIComponent(query)}` : "/products");
  }

  return (
    <form onSubmit={submit} className={`relative ${className}`} role="search">
      <Icon
        name="search"
        size={18}
        className="pointer-events-none absolute top-1/2 left-3.5 -translate-y-1/2 text-navy-400"
      />
      <input
        type="search"
        value={value}
        onChange={(event) => setValue(event.target.value)}
        placeholder="Search products, brands..."
        aria-label="Search products"
        className="w-full rounded-full border border-navy-200 bg-navy-50/60 py-2.5 pr-4 pl-11 text-sm text-navy-900 outline-none transition focus:border-royal-400 focus:bg-white"
      />
    </form>
  );
}

export default function Navbar() {
  const pathname = usePathname();
  const { count } = useCart();
  const { count: wishlistCount } = useWishlist();
  const { user, logout } = useAuth();

  const [mobileOpen, setMobileOpen] = useState(false);
  const [accountOpen, setAccountOpen] = useState(false);
  const accountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setMobileOpen(false);
    setAccountOpen(false);
  }, [pathname]);

  useEffect(() => {
    function onClick(event: MouseEvent) {
      if (accountRef.current && !accountRef.current.contains(event.target as Node)) {
        setAccountOpen(false);
      }
    }
    document.addEventListener("mousedown", onClick);
    return () => document.removeEventListener("mousedown", onClick);
  }, []);

  return (
    <header className="sticky top-0 z-50">
      <div className="bg-navy-950 text-white">
        <div className="container-x flex items-center justify-center gap-2 py-2 text-center text-xs sm:text-sm">
          <Icon name="truck" size={15} className="text-royal-300" />
          <span>
            Free express shipping on orders over{" "}
            <strong className="text-royal-300">$50</strong> — shop today!
          </span>
        </div>
      </div>

      <div className="border-b border-navy-100 bg-white/90 backdrop-blur-md">
        <nav className="container-x flex items-center gap-4 py-3">
          <button
            type="button"
            onClick={() => setMobileOpen((open) => !open)}
            className="flex h-10 w-10 items-center justify-center rounded-xl text-navy-700 transition hover:bg-navy-100 lg:hidden"
            aria-label="Toggle menu"
            aria-expanded={mobileOpen}
          >
            <Icon name={mobileOpen ? "close" : "menu"} size={22} />
          </button>

          <Logo />

          <ul className="ml-4 hidden items-center gap-1 lg:flex">
            {NAV_LINKS.map((link) => {
              const active =
                link.href === "/"
                  ? pathname === "/"
                  : pathname.startsWith(link.href);
              return (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className={`relative rounded-full px-4 py-2 text-sm font-medium transition-colors ${
                      active
                        ? "text-royal-700"
                        : "text-navy-600 hover:bg-navy-50 hover:text-royal-700"
                    }`}
                  >
                    {link.label}
                    <span
                      className={`absolute inset-x-4 -bottom-0.5 h-0.5 rounded-full bg-royal-600 transition-transform duration-200 ${
                        active ? "scale-x-100" : "scale-x-0"
                      }`}
                    />
                  </Link>
                </li>
              );
            })}
          </ul>

          <SearchBar className="ml-auto hidden max-w-xs flex-1 lg:block" />

          <div className="ml-auto flex items-center gap-1.5 lg:ml-4">
            <Link
              href="/wishlist"
              aria-label="Wishlist"
              className="relative flex h-10 w-10 items-center justify-center rounded-xl text-navy-700 transition hover:bg-navy-100"
            >
              <Icon name="heart" size={21} />
              {wishlistCount > 0 && (
                <span className="absolute -top-0.5 -right-0.5 flex h-5 min-w-5 items-center justify-center rounded-full bg-rose-500 px-1 text-[10px] font-bold text-white">
                  {wishlistCount}
                </span>
              )}
            </Link>

            <Link
              href="/cart"
              aria-label="Shopping cart"
              className="relative flex h-10 w-10 items-center justify-center rounded-xl text-navy-700 transition hover:bg-navy-100"
            >
              <Icon name="cart" size={21} />
              {count > 0 && (
                <span className="absolute -top-0.5 -right-0.5 flex h-5 min-w-5 items-center justify-center rounded-full bg-royal-600 px-1 text-[10px] font-bold text-white">
                  {count}
                </span>
              )}
            </Link>

            {user ? (
              <div className="relative" ref={accountRef}>
                <button
                  type="button"
                  onClick={() => setAccountOpen((open) => !open)}
                  className="flex items-center gap-2 rounded-full border border-navy-200 py-1.5 pr-3 pl-1.5 transition hover:border-royal-300"
                  aria-haspopup="menu"
                  aria-expanded={accountOpen}
                >
                  {user.avatar ? (
                    <Image
                      src={user.avatar}
                      alt={user.name}
                      width={28}
                      height={28}
                      className="h-7 w-7 rounded-full object-cover"
                    />
                  ) : (
                    <span className="flex h-7 w-7 items-center justify-center rounded-full bg-royal-600 text-xs font-bold text-white">
                      {user.name.charAt(0).toUpperCase()}
                    </span>
                  )}
                  <span className="hidden max-w-24 truncate text-sm font-medium text-navy-800 sm:block">
                    {user.name.split(" ")[0]}
                  </span>
                  <Icon name="chevron-down" size={15} className="text-navy-400" />
                </button>

                {accountOpen && (
                  <div
                    role="menu"
                    className="absolute right-0 mt-2 w-52 overflow-hidden rounded-2xl border border-navy-100 bg-white p-1.5 shadow-xl shadow-navy-900/10"
                  >
                    <div className="border-b border-navy-100 px-3 py-2">
                      <p className="truncate text-sm font-semibold text-navy-900">
                        {user.name}
                      </p>
                      <p className="truncate text-xs text-navy-400">{user.email}</p>
                    </div>
                    <MenuLink href="/profile" icon="user" label="My Profile" />
                    <MenuLink href="/orders" icon="package" label="My Orders" />
                    <MenuLink href="/wishlist" icon="heart" label="Wishlist" />
                    {user.role === "admin" && (
                      <MenuLink href="/admin" icon="dashboard" label="Admin Dashboard" />
                    )}
                    <button
                      type="button"
                      onClick={logout}
                      role="menuitem"
                      className="flex w-full items-center gap-2.5 rounded-xl px-3 py-2 text-sm font-medium text-red-500 transition hover:bg-red-50"
                    >
                      <Icon name="logout" size={17} />
                      Logout
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <div className="hidden items-center gap-2 sm:flex">
                <ButtonLink href="/login" variant="ghost" size="sm">
                  Login
                </ButtonLink>
                <ButtonLink href="/register" variant="primary" size="sm">
                  Register
                </ButtonLink>
              </div>
            )}
          </div>
        </nav>

        <div className="container-x pb-3 lg:hidden">
          <SearchBar />
        </div>
      </div>

      {mobileOpen && (
        <div className="border-b border-navy-100 bg-white shadow-lg lg:hidden">
          <div className="container-x flex flex-col py-3">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="rounded-xl px-3 py-3 text-sm font-medium text-navy-700 transition hover:bg-navy-50 hover:text-royal-700"
              >
                {link.label}
              </Link>
            ))}

            {!user && (
              <div className="mt-2 flex gap-2 border-t border-navy-100 pt-3">
                <ButtonLink href="/login" variant="outline" size="sm" className="flex-1">
                  Login
                </ButtonLink>
                <ButtonLink href="/register" variant="primary" size="sm" className="flex-1">
                  Register
                </ButtonLink>
              </div>
            )}
          </div>
        </div>
      )}
    </header>
  );
}

function MenuLink({
  href,
  icon,
  label,
}: {
  href: string;
  icon: "user" | "package" | "heart" | "dashboard";
  label: string;
}) {
  return (
    <Link
      href={href}
      role="menuitem"
      className="flex items-center gap-2.5 rounded-xl px-3 py-2 text-sm font-medium text-navy-700 transition hover:bg-navy-50 hover:text-royal-700"
    >
      <Icon name={icon} size={17} />
      {label}
    </Link>
  );
}
