import { drizzle } from 'drizzle-orm/node-postgres';
import { Pool } from 'pg';
import * as schema from './db/schema';
import { NodePgDatabase } from 'drizzle-orm/node-postgres';
import * as dotenv from 'dotenv';

dotenv.config();

export const DrizzleAsyncProvider = 'DrizzleAsyncProvider';

export const drizzleProvider = [
  {
    provide: DrizzleAsyncProvider,
    useFactory: () => {
      const connectionString = process.env.DATABASE_URL;
      const pool = new Pool({
        connectionString,
      });

      return drizzle(pool, { schema }) as NodePgDatabase<typeof schema>;
    },
  },
];
