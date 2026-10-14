import Container from "@/components/ui/Container";
import { ButtonLink } from "@/components/ui/Button";

export default function NotFound() {
  return (
    <Container className="flex min-h-[60vh] items-center justify-center py-20">
      <div className="mx-auto max-w-md text-center">
        <p className="bg-gradient-to-br from-royal-500 to-navy-900 bg-clip-text text-7xl font-black text-transparent">
          404
        </p>
        <h1 className="mt-4 text-2xl font-bold text-navy-900">
          Page not found
        </h1>
        <p className="mt-3 text-sm text-navy-500">
          The page you&apos;re looking for doesn&apos;t exist or may have been
          moved. Let&apos;s get you back on track.
        </p>
        <div className="mt-6 flex flex-wrap justify-center gap-3">
          <ButtonLink href="/" variant="primary">
            Back to home
          </ButtonLink>
          <ButtonLink href="/products" variant="outline">
            Browse products
          </ButtonLink>
        </div>
      </div>
    </Container>
  );
}
