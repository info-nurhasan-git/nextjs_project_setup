import Link from "next/link";
import PageHeader from "@/components/PageHeader";
import Container from "@/components/ui/Container";
import ProfileForm from "@/components/profile/ProfileForm";
import Badge from "@/components/ui/Badge";
import { Icon } from "@/components/ui/icons";
import { requireUser } from "@/lib/dal";
import connectDB from "@/lib/mongodb";
import User from "@/models/User";
import Order from "@/models/Order";
import { formatPrice } from "@/lib/format";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "My Profile",
  description: "Manage your ShopZone account details.",
};

export default async function ProfilePage() {
  const user = await requireUser();

  await connectDB();
  const doc = await User.findById(user.id).lean();

  const profile = {
    name: doc?.name ?? user.name,
    email: doc?.email ?? user.email,
    phone: doc?.phone ?? "",
    address: doc?.address ?? "",
    city: doc?.city ?? "",
    role: user.role,
  };

  const orders = await Order.find({ userId: user.id }).lean();
  const spent = orders
    .filter((order) => order.status !== "cancelled")
    .reduce((sum, order) => sum + (order.total ?? 0), 0);

  const stats = [
    { label: "Orders placed", value: String(orders.length), icon: "package" as const },
    { label: "Total spent", value: formatPrice(spent), icon: "tag" as const },
    { label: "Account type", value: profile.role === "admin" ? "Admin" : "Member", icon: "user" as const },
  ];

  return (
    <>
      <PageHeader
        title="My Profile"
        description="Manage your personal information and preferences."
        crumbs={[{ label: "Profile" }]}
      />

      <Container className="py-10">
        <div className="grid gap-8 lg:grid-cols-[320px_1fr]">
          <aside className="space-y-6">
            <div className="rounded-3xl border border-navy-100 bg-white p-6 text-center">
              <span className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-br from-royal-500 to-royal-700 text-2xl font-bold text-white">
                {profile.name.charAt(0).toUpperCase()}
              </span>
              <h2 className="mt-4 text-lg font-semibold text-navy-900">
                {profile.name}
              </h2>
              <p className="text-sm text-navy-500">{profile.email}</p>
              <div className="mt-3 flex justify-center">
                <Badge variant={profile.role === "admin" ? "royal" : "neutral"}>
                  {profile.role === "admin" ? "Administrator" : "Member"}
                </Badge>
              </div>
            </div>

            <div className="rounded-3xl border border-navy-100 bg-white p-2">
              <Link
                href="/orders"
                className="flex items-center gap-3 rounded-2xl px-4 py-3 text-sm font-medium text-navy-700 transition hover:bg-navy-50"
              >
                <Icon name="package" size={18} className="text-royal-600" />
                My Orders
              </Link>
              <Link
                href="/wishlist"
                className="flex items-center gap-3 rounded-2xl px-4 py-3 text-sm font-medium text-navy-700 transition hover:bg-navy-50"
              >
                <Icon name="heart" size={18} className="text-royal-600" />
                Wishlist
              </Link>
              {profile.role === "admin" && (
                <Link
                  href="/admin"
                  className="flex items-center gap-3 rounded-2xl px-4 py-3 text-sm font-medium text-navy-700 transition hover:bg-navy-50"
                >
                  <Icon name="dashboard" size={18} className="text-royal-600" />
                  Admin Dashboard
                </Link>
              )}
            </div>
          </aside>

          <div className="space-y-8">
            <div className="grid gap-4 sm:grid-cols-3">
              {stats.map((stat) => (
                <div
                  key={stat.label}
                  className="rounded-2xl border border-navy-100 bg-white p-5"
                >
                  <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-royal-50 text-royal-600">
                    <Icon name={stat.icon} size={20} />
                  </span>
                  <p className="mt-3 text-xl font-bold text-navy-900">
                    {stat.value}
                  </p>
                  <p className="text-xs text-navy-500">{stat.label}</p>
                </div>
              ))}
            </div>

            <section className="rounded-3xl border border-navy-100 bg-white p-6">
              <h2 className="text-lg font-semibold text-navy-900">
                Personal Information
              </h2>
              <p className="mt-1 text-sm text-navy-500">
                Keep your details up to date for faster checkout.
              </p>
              <div className="mt-6">
                <ProfileForm
                  initial={{
                    name: profile.name,
                    phone: profile.phone,
                    address: profile.address,
                    city: profile.city,
                  }}
                />
              </div>
            </section>
          </div>
        </div>
      </Container>
    </>
  );
}
