import { pgTable, text, serial, integer, boolean, timestamp, jsonb } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
});

export const capsules = pgTable("capsules", {
  id: serial("id").primaryKey(),
  creatorId: integer("creator_id").notNull(),
  title: text("title").notNull(),
  description: text("description"),
  type: text("type", { enum: ["professional", "community"] }).notNull(),
  unlockDate: timestamp("unlock_date").notNull(),
  isLocked: boolean("is_locked").notNull().default(true),
  createdAt: timestamp("created_at").notNull().defaultNow(),
});

export const contributions = pgTable("contributions", {
  id: serial("id").primaryKey(),
  capsuleId: integer("capsule_id").notNull(),
  userId: integer("user_id").notNull(),
  type: text("type", { enum: ["text", "image", "video", "audio"] }).notNull(),
  content: text("content").notNull(),
  createdAt: timestamp("created_at").notNull().defaultNow(),
});

export const capsuleMembers = pgTable("capsule_members", {
  id: serial("id").primaryKey(),
  capsuleId: integer("capsule_id").notNull(),
  userId: integer("user_id").notNull(),
  role: text("role", { enum: ["viewer", "contributor", "admin"] }).notNull(),
});

export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true,
});

export const insertCapsuleSchema = createInsertSchema(capsules).pick({
  title: true,
  description: true,
  type: true,
  unlockDate: true,
});

export const insertContributionSchema = createInsertSchema(contributions).pick({
  type: true,
  content: true,
});

export type User = typeof users.$inferSelect;
export type InsertUser = z.infer<typeof insertUserSchema>;
export type Capsule = typeof capsules.$inferSelect;
export type InsertCapsule = z.infer<typeof insertCapsuleSchema>;
export type Contribution = typeof contributions.$inferSelect;
export type InsertContribution = z.infer<typeof insertContributionSchema>;
