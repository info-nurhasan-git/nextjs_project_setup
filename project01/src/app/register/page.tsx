import Link from "next/link";
import { redirect } from "next/navigation";
import AuthShell from "@/components/auth/AuthShell";
import RegisterForm from "@/components/auth/RegisterForm";
import { getCurrentUser } from "@/lib/dal";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "Create Account",
  description: "Join ShopZone and start shopping today.",
};

export default async function RegisterPage() {
  const user = await getCurrentUser();
  if (user) redirect("/");

  return (
    <AuthShell
      title="Create your account"
      subtitle="Join thousands of shoppers enjoying exclusive deals."
      footer={
        <>
          Already have an account?{" "}
          <Link href="/login" className="font-semibold text-royal-700 hover:underline">
            Sign in
          </Link>
        </>
      }
    >
      <RegisterForm />
    </AuthShell>
  );
}
