import { defineEventHandler, readBody, createError } from "h3";
import { db } from "../db";
import { users } from "../db/schema";
import { eq } from "drizzle-orm";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const JWT_SECRET = "NadinCheckSecret";

export default defineEventHandler(async (event) => {
  const body = await readBody(event);

  if (!body.username || !body.password) {
    throw createError({
      statusCode: 400,
      statusMessage: "Missing username or password",
    });
  }

  const user = await db
    .select()
    .from(users)
    .where(eq(users.username, body.username))
    .get();
  if (!user) {
    throw createError({
      statusCode: 401,
      statusMessage: "Invalid credentials",
    });
  }

  const isValid = await bcrypt.compare(body.password, user.password);
  if (!isValid) {
    throw createError({
      statusCode: 401,
      statusMessage: "Invalid credentials",
    });
  }

  const token = jwt.sign({ id: user.id, username: user.username }, JWT_SECRET, {
    expiresIn: "1h",
  });

  return { success: true, token };
});
