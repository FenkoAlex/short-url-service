import * as dotenv from 'dotenv';
import { defineConfig } from 'drizzle-kit';

dotenv.config();

export default defineConfig({
  dialect: 'postgresql',
  schema: './src/db/schema/*',
  out: './src/db/drizzle/migrations',
  dbCredentials: {
    url: process.env.DATABASE_URL as string,
  },
});
