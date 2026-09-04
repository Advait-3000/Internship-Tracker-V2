import { pgTable, uuid, varchar } from "drizzle-orm/pg-core";

export const challengeTypes = pgTable("challenge_types", {
  id: uuid("id").defaultRandom().primaryKey(),
  challengeName: varchar("challenge_name", { length: 255 }).notNull().unique(),
});
