import { defineEventHandler, readBody, createError } from "h3";
import { db } from "../db";
import { users } from "../db/schema";
import { eq } from "drizzle-orm";
import bcrypt from "bcryptjs";

export default defineEventHandler(async (event) => {
  const body = await readBody(event);

  if (!body.username || !body.password || !body.name || !body.email) {
    throw createError({
      statusCode: 400,
      statusMessage: "Missing required fields",
    });
  }

  const existingUser = await db
    .select()
    .from(users)
    .where(eq(users.username, body.username))
    .get();
  if (existingUser) {
    throw createError({
      statusCode: 409,
      statusMessage: "Username already taken",
    });
  }

  const existingEmail = await db
    .select()
    .from(users)
    .where(eq(users.email, body.email))
    .get();
  if (existingEmail) {
    throw createError({
      statusCode: 409,
      statusMessage: "Email already in use",
    });
  }

  const hashedPassword = await bcrypt.hash(body.password, 10);

  await db.insert(users).values({
    username: body.username,
    password: hashedPassword,
    name: body.name,
    email: body.email,
    avatar: null,
  });

  return { success: true, message: "User registered" };
});
