import Container from "@/components/ui/Container";
import Spinner from "@/components/ui/Spinner";

export default function Loading() {
  return (
    <Container className="flex min-h-[60vh] flex-col items-center justify-center gap-4 py-20">
      <Spinner size={36} className="text-royal-600" />
      <p className="text-sm text-navy-500">Loading…</p>
    </Container>
  );
}
