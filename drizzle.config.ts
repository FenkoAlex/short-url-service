import { defineConfig } from 'drizzle-kit';

// eslint-disable-next-line @typescript-eslint/no-unsafe-call
export default defineConfig({
  dialect: 'postgresql',
  schema: './src/db/schema/*',
  out: './src/db/drizzle',
  dbCredentials: {
    url: process.env.DATABASE_URL as string,
  },
});
