import PageHeader from "@/components/PageHeader";
import Container from "@/components/ui/Container";
import WishlistView from "@/components/wishlist/WishlistView";

export const metadata = {
  title: "Wishlist",
  description: "Your saved ShopZone products, all in one place.",
};

export default function WishlistPage() {
  return (
    <>
      <PageHeader
        title="Wishlist"
        description="Products you've saved for later."
        crumbs={[{ label: "Wishlist" }]}
      />
      <Container className="py-10">
        <WishlistView />
      </Container>
    </>
  );
}
