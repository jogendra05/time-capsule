import { pgTable, text, serial, timestamp, jsonb } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const capsules = pgTable("capsules", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  description: text("description").notNull(),
  content: jsonb("content").notNull(),
  openDate: timestamp("open_date").notNull(),
  imageUrl: text("image_url").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const insertCapsuleSchema = createInsertSchema(capsules).omit({
  id: true,
  createdAt: true,
});

export type InsertCapsule = z.infer<typeof insertCapsuleSchema>;
export type Capsule = typeof capsules.$inferSelect;
