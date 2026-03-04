export type UserRole = "admin" | "agent" | "buyer" | "seller";

export interface Property {
  _id: string;
  title: string;
  location: string;
  region: string;
  size: string;
  price: number;
  status: "available" | "reserved" | "sold";
  description: string;
  images: string[];
  agentId: string;
  agentName: string;
  createdAt: number;
  updatedAt: number;
  plotNumber: string;
  landUse: string;
}

export interface UserProfile {
  _id: string;
  clerkId: string;
  name: string;
  email: string;
  phone: string;
  role: UserRole;
  ghanaCardNumber?: string;
  address?: string;
  createdAt: number;
}

export interface Transaction {
  _id: string;
  propertyId: string;
  propertyTitle: string;
  buyerId: string;
  buyerName: string;
  sellerId: string;
  sellerName: string;
  agentId: string;
  agentName: string;
  totalAmount: number;
  amountPaid: number;
  balance: number;
  status: "pending" | "in_progress" | "completed" | "cancelled";
  createdAt: number;
  updatedAt: number;
}

export interface Payment {
  _id: string;
  transactionId: string;
  amount: number;
  method: "mobile_money" | "bank_transfer" | "cash";
  reference: string;
  date: number;
  note?: string;
  recordedBy: string;
}

export interface Document {
  _id: string;
  transactionId: string;
  propertyId: string;
  name: string;
  type:
    | "indenture"
    | "site_plan"
    | "allocation_letter"
    | "receipt"
    | "agreement"
    | "other";
  fileUrl: string;
  uploadedBy: string;
  uploadedAt: number;
  status: "draft" | "pending_review" | "approved" | "rejected";
}

export interface DashboardStats {
  totalProperties: number;
  availableProperties: number;
  activeTransactions: number;
  completedTransactions: number;
  totalRevenue: number;
  monthlyRevenue: number;
}
