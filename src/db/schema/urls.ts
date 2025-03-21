import { sql } from 'drizzle-orm';
import {
  integer,
  pgTable,
  varchar,
  timestamp,
  index,
} from 'drizzle-orm/pg-core';

export const urlsSchema = pgTable(
  'urls',
  {
    id: integer('id').primaryKey().generatedAlwaysAsIdentity(),
    originalUrl: varchar('original_url', { length: 2048 }).notNull(),
    expiresAt: timestamp('expires_at').default(sql`NOW() + INTERVAL '1 month'`),
    alias: varchar('alias', { length: 20 }).unique().notNull(),
    createdAt: timestamp('created_at').default(sql`now()`),
  },
  (table) => ({
    aliasIdx: index('alias_idx').on(table.alias),
  }),
);
