import { describe, it, expect, beforeAll, vi } from "vitest";
import { setup, $fetch } from "@nuxt/test-utils";
import { migrate } from "drizzle-orm/libsql/migrator";
import { createClient } from "@libsql/client";
import { drizzle } from "drizzle-orm/libsql";
import path from "node:path";
import * as fs from "node:fs";

const client = createClient({ url: "file:./db.test.sqlite" });
export const testDb = drizzle(client);

await setup({
  server: true,
});

vi.mock("~/server/db", () => {
  return {
    db: testDb,
  };
});

describe("Auth API Routes (isolated test DB)", () => {
  beforeAll(async () => {
    const dbPath = path.resolve(process.cwd(), "db.test.sqlite");
    if (fs.existsSync(dbPath)) {
      try {
        fs.unlinkSync(dbPath);
        console.log("🗑️ Old test database deleted: db.test.sqlite");
      } catch (err: unknown) {
        if ((err as { code: string }).code === "EBUSY") {
          console.warn(
            "⚠️ Could not delete db.test.sqlite (locked) — trying again after delay...",
          );
        } else {
          throw err;
        }
      }
    }

    const client = createClient({ url: "file:./db.test.sqlite" });
    const dbForMigration = drizzle(client);

    await migrate(dbForMigration, {
      migrationsFolder: "./drizzle/migrations",
    });

    client.close();

    console.log("✅ Fresh test database created and migrated: db.test.sqlite");
  });

  const makeUniqueUser = () => ({
    username: `user_${Date.now()}_${Math.floor(Math.random() * 10000)}`,
    password: "password123",
    name: "Test User",
    email: `user_${Date.now()}@test.com`,
  });

  it("should register a new user successfully", async () => {
    const user = makeUniqueUser();

    const response = await $fetch("/api/register", {
      method: "POST",
      body: user,
    });

    expect(response).toEqual({
      success: true,
      message: "User registered",
    });
  });

  it("should login successfully and return a token", async () => {
    const user = makeUniqueUser();

    await $fetch("/api/register", {
      method: "POST",
      body: user,
    });

    const response: { success: string; token: string } = await $fetch(
      "/api/login",
      {
        method: "POST",
        body: {
          username: user.username,
          password: user.password,
        },
      },
    );

    expect(response.success).toBe(true);
    expect(response.token).toBeTypeOf("string");
    expect(response.token.length).toBeGreaterThan(50);
  });
});
