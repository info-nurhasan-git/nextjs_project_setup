import { z } from "zod";

export const registerSchema = z.object({
  name: z.string().trim().min(2, "Name must be at least 2 characters."),
  email: z.email("Please enter a valid email address."),
  password: z
    .string()
    .min(6, "Password must be at least 6 characters.")
    .regex(/[a-zA-Z]/, "Password must contain at least one letter.")
    .regex(/[0-9]/, "Password must contain at least one number."),
});

export const loginSchema = z.object({
  email: z.email("Please enter a valid email address."),
  password: z.string().min(1, "Password is required."),
});

export const productSchema = z.object({
  name: z.string().trim().min(2, "Product name is required."),
  slug: z.string().trim().optional(),
  price: z.coerce.number().min(0, "Price must be positive."),
  discountPrice: z.coerce.number().min(0).nullable().optional(),
  description: z.string().trim().optional().default(""),
  image: z.string().trim().optional().default(""),
  images: z.array(z.string()).optional().default([]),
  category: z.string().trim().min(1).default("General"),
  categorySlug: z.string().trim().optional(),
  brand: z.string().trim().optional().default("ShopZone"),
  rating: z.coerce.number().min(0).max(5).optional().default(0),
  numReviews: z.coerce.number().min(0).optional().default(0),
  stock: z.coerce.number().min(0).optional().default(0),
  isFeatured: z.coerce.boolean().optional().default(false),
  isTrending: z.coerce.boolean().optional().default(false),
  isNew: z.coerce.boolean().optional().default(true),
});

export const orderItemSchema = z.object({
  productId: z.string().min(1),
  name: z.string().min(1),
  slug: z.string().optional().default(""),
  price: z.coerce.number().min(0),
  quantity: z.coerce.number().int().min(1),
  image: z.string().optional().default(""),
});

export const orderSchema = z.object({
  customerName: z.string().trim().min(2, "Full name is required."),
  email: z.email("Please enter a valid email address."),
  phone: z.string().trim().optional().default(""),
  address: z.string().trim().min(5, "Address is required."),
  city: z.string().trim().optional().default(""),
  items: z.array(orderItemSchema).min(1, "Your cart is empty."),
});

export const profileSchema = z.object({
  name: z.string().trim().min(2, "Name is required."),
  phone: z.string().trim().optional().default(""),
  address: z.string().trim().optional().default(""),
  city: z.string().trim().optional().default(""),
});

export const contactSchema = z.object({
  name: z.string().trim().min(2, "Please enter your name."),
  email: z.email("Please enter a valid email address."),
  subject: z.string().trim().optional().default(""),
  message: z.string().trim().min(10, "Message must be at least 10 characters."),
});

export const orderStatusSchema = z.object({
  status: z.enum([
    "pending",
    "processing",
    "shipped",
    "delivered",
    "cancelled",
  ]),
});

export type RegisterInput = z.infer<typeof registerSchema>;
export type LoginInput = z.infer<typeof loginSchema>;
export type ProductInput = z.infer<typeof productSchema>;
export type OrderInput = z.infer<typeof orderSchema>;
