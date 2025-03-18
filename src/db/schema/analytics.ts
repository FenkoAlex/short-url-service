import { sql } from 'drizzle-orm';
import {
  integer,
  pgTable,
  varchar,
  timestamp,
  index,
} from 'drizzle-orm/pg-core';

export const analyticsTable = pgTable(
  'analytics',
  {
    id: integer('id').primaryKey().generatedAlwaysAsIdentity(),
    urlId: integer('url_id').notNull(),
    ipAddress: varchar('ip_address', { length: 39 }).notNull(),
    createdAt: timestamp('created_at').default(sql`now()`),
  },
  (table) => ({
    urlIdx: index('url_idx').on(table.urlId),
  }),
);
