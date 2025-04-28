import { pgTable, text, serial, integer, boolean, jsonb, timestamp } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

// User schema (from template)
export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
});

export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true,
});

export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;

// Events schema
export const events = pgTable("events", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  state: text("state").notNull(),
  date: timestamp("date").notNull(),
  email: text("email").notNull(),
  link: text("link").notNull(),
});

export const insertEventSchema = createInsertSchema(events).pick({
  name: true,
  state: true,
  date: true,
  email: true,
  link: true,
});

export type InsertEvent = z.infer<typeof insertEventSchema>;
export type Event = typeof events.$inferSelect;

// Stories schema
export const stories = pgTable("stories", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  author: text("author").notNull(),
  date: timestamp("date").notNull(),
  description: text("description").notNull(),
  imageUrl: text("image_url").notNull(),
  sourceLink: text("source_link").notNull(),
});

export const insertStorySchema = createInsertSchema(stories).pick({
  title: true,
  author: true,
  date: true,
  description: true,
  imageUrl: true,
  sourceLink: true,
});

export type InsertStory = z.infer<typeof insertStorySchema>;
export type Story = typeof stories.$inferSelect;

// Chapters schema
export const chapters = pgTable("chapters", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  location: text("location").notNull(),
  email: text("email").notNull(),
  socials: jsonb("socials").notNull(),
  volunteerLink: text("volunteer_link").notNull(),
});

export const insertChapterSchema = createInsertSchema(chapters).pick({
  name: true,
  location: true,
  email: true,
  socials: true,
  volunteerLink: true,
});

export type InsertChapter = z.infer<typeof insertChapterSchema>;
export type Chapter = typeof chapters.$inferSelect;

// Newsletter subscribers schema
export const subscribers = pgTable("subscribers", {
  id: serial("id").primaryKey(),
  email: text("email").notNull().unique(),
  subscribedAt: timestamp("subscribed_at").defaultNow().notNull(),
});

export const insertSubscriberSchema = createInsertSchema(subscribers).pick({
  email: true,
});

export type InsertSubscriber = z.infer<typeof insertSubscriberSchema>;
export type Subscriber = typeof subscribers.$inferSelect;
