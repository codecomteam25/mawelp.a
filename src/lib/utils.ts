export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat("en-GH", {
    style: "currency",
    currency: "GHS",
    minimumFractionDigits: 0,
    maximumFractionDigits: 2,
  }).format(amount);
}

export function formatDate(timestamp: number): string {
  return new Intl.DateTimeFormat("en-GH", {
    year: "numeric",
    month: "short",
    day: "numeric",
  }).format(new Date(timestamp));
}

export function formatDateTime(timestamp: number): string {
  return new Intl.DateTimeFormat("en-GH", {
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  }).format(new Date(timestamp));
}

export function cn(
  ...classes: (string | boolean | undefined | null)[]
): string {
  return classes.filter(Boolean).join(" ");
}

export function getStatusColor(status: string): string {
  switch (status) {
    case "available":
    case "completed":
    case "approved":
      return "bg-ghana-green/10 text-ghana-green";
    case "reserved":
    case "in_progress":
    case "pending_review":
      return "bg-ghana-gold/20 text-ghana-gold-dark";
    case "sold":
    case "cancelled":
    case "rejected":
      return "bg-ghana-red/10 text-ghana-red";
    case "pending":
    case "draft":
      return "bg-ghana-gray-200 text-ghana-gray-600";
    default:
      return "bg-ghana-gray-100 text-ghana-gray-500";
  }
}

export function getStatusLabel(status: string): string {
  return status.replace(/_/g, " ").replace(/\b\w/g, (c) => c.toUpperCase());
}

export function getPaymentMethodLabel(method: string): string {
  switch (method) {
    case "mobile_money":
      return "Mobile Money";
    case "bank_transfer":
      return "Bank Transfer";
    case "cash":
      return "Cash";
    default:
      return method;
  }
}
