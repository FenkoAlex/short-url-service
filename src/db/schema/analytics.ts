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
    id: integer().primaryKey().generatedAlwaysAsIdentity(),
    urlId: integer().notNull(),
    ipAdress: varchar({ length: 39 }).notNull(),
    createdAt: timestamp().default(sql`now()`),
  },
  (table) => ({
    urlIdx: index('url_idx').on(table.urlId),
  }),
);
