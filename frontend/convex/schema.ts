import { defineSchema, defineTable } from 'convex/server';
import { v } from 'convex/values';

export default defineSchema({
  users: defineTable({
    clerkId: v.optional(v.string()),
    name: v.string(),
    email: v.string(),
    phone: v.string(),
    password: v.optional(v.string()),
    role: v.union(v.literal('admin'), v.literal('agent'), v.literal('buyer'), v.literal('seller')),
    ghanaCardNumber: v.optional(v.string()),
    address: v.optional(v.string()),
    createdAt: v.number(),
  })
    .index('by_clerkId', ['clerkId'])
    .index('by_role', ['role'])
    .index('by_email', ['email']),

  properties: defineTable({
    title: v.string(),
    location: v.string(),
    region: v.string(),
    size: v.string(),
    price: v.number(),
    status: v.union(v.literal('available'), v.literal('reserved'), v.literal('sold')),
    description: v.string(),
    images: v.array(v.string()),
    agentId: v.string(),
    agentName: v.string(),
    plotNumber: v.string(),
    landUse: v.string(),
    createdAt: v.number(),
    updatedAt: v.number(),
  })
    .index('by_status', ['status'])
    .index('by_agent', ['agentId'])
    .index('by_region', ['region']),

  transactions: defineTable({
    propertyId: v.string(),
    propertyTitle: v.string(),
    buyerId: v.string(),
    buyerName: v.string(),
    sellerId: v.string(),
    sellerName: v.string(),
    agentId: v.string(),
    agentName: v.string(),
    totalAmount: v.number(),
    amountPaid: v.number(),
    balance: v.number(),
    status: v.union(
      v.literal('pending'),
      v.literal('in_progress'),
      v.literal('completed'),
      v.literal('cancelled')
    ),
    createdAt: v.number(),
    updatedAt: v.number(),
  })
    .index('by_status', ['status'])
    .index('by_buyer', ['buyerId'])
    .index('by_seller', ['sellerId'])
    .index('by_agent', ['agentId'])
    .index('by_property', ['propertyId']),

  payments: defineTable({
    transactionId: v.string(),
    amount: v.number(),
    method: v.union(v.literal('mobile_money'), v.literal('bank_transfer'), v.literal('cash')),
    reference: v.string(),
    date: v.number(),
    note: v.optional(v.string()),
    recordedBy: v.string(),
  })
    .index('by_transaction', ['transactionId'])
    .index('by_date', ['date']),

  documents: defineTable({
    transactionId: v.string(),
    propertyId: v.string(),
    name: v.string(),
    type: v.union(
      v.literal('indenture'),
      v.literal('site_plan'),
      v.literal('allocation_letter'),
      v.literal('receipt'),
      v.literal('agreement'),
      v.literal('other')
    ),
    fileUrl: v.string(),
    uploadedBy: v.string(),
    uploadedAt: v.number(),
    status: v.union(
      v.literal('draft'),
      v.literal('pending_review'),
      v.literal('approved'),
      v.literal('rejected')
    ),
  })
    .index('by_transaction', ['transactionId'])
    .index('by_property', ['propertyId'])
    .index('by_type', ['type'])
    .index('by_status', ['status']),
});
