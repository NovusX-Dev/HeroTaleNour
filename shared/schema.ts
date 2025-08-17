import { sql } from "drizzle-orm";
import { pgTable, text, varchar, integer, timestamp, jsonb, boolean } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const stories = pgTable("stories", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  title: text("title").notNull(),
  description: text("description").notNull(),
  content: jsonb("content").notNull(), // Array of page objects
  ageMin: integer("age_min").notNull(),
  ageMax: integer("age_max").notNull(),
  culture: text("culture").notNull(),
  active: boolean("active").notNull().default(true),
  createdAt: timestamp("created_at").defaultNow(),
});

export const orders = pgTable("orders", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  childName: text("child_name").notNull(),
  childAge: integer("child_age").notNull(),
  childPhotoUrl: text("child_photo_url").notNull(),
  storyId: varchar("story_id").notNull().references(() => stories.id),
  personalizedContent: jsonb("personalized_content").notNull(),
  format: text("format").notNull(), // 'digital' or 'print'
  price: integer("price").notNull(), // in cents
  status: text("status").notNull().default("pending"), // pending, processing, completed, shipped
  customerEmail: text("customer_email").notNull(),
  customerName: text("customer_name").notNull(),
  shippingAddress: jsonb("shipping_address"), // only for print orders
  stripePaymentIntentId: text("stripe_payment_intent_id"),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

export const insertStorySchema = createInsertSchema(stories).omit({
  id: true,
  createdAt: true,
});

export const insertOrderSchema = createInsertSchema(orders).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

export const createOrderSchema = insertOrderSchema.extend({
  customerInfo: z.object({
    name: z.string().min(1, "Nome é obrigatório"),
    email: z.string().email("Email inválido"),
    phone: z.string().optional(),
  }),
  shippingInfo: z.object({
    address: z.string().min(1, "Endereço é obrigatório"),
    city: z.string().min(1, "Cidade é obrigatória"),
    state: z.string().min(1, "Estado é obrigatório"),
    zipCode: z.string().min(1, "CEP é obrigatório"),
  }).optional(),
});

export type Story = typeof stories.$inferSelect;
export type InsertStory = z.infer<typeof insertStorySchema>;
export type Order = typeof orders.$inferSelect;
export type InsertOrder = z.infer<typeof insertOrderSchema>;
export type CreateOrder = z.infer<typeof createOrderSchema>;
