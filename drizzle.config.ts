import type { Config } from "drizzle-kit";

export default {
  schema: "./server/db/schema.ts",
  out: "./drizzle/migrations",
  dialect: "sqlite", // Required: tells Drizzle Kit it's SQLite
  dbCredentials: {
    url: "file:./db.sqlite", // Important: use 'file:' prefix for local files with libsql
  },
} satisfies Config;
