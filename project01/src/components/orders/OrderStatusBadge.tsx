import Badge, { type BadgeVariant } from "../ui/Badge";
import type { OrderStatus } from "@/lib/types";

const map: Record<OrderStatus, { label: string; variant: BadgeVariant }> = {
  pending: { label: "Pending", variant: "warning" },
  processing: { label: "Processing", variant: "royal" },
  shipped: { label: "Shipped", variant: "navy" },
  delivered: { label: "Delivered", variant: "success" },
  cancelled: { label: "Cancelled", variant: "danger" },
};

export default function OrderStatusBadge({ status }: { status: OrderStatus }) {
  const config = map[status] ?? map.pending;
  return <Badge variant={config.variant}>{config.label}</Badge>;
}
