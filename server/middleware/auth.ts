import { createError, defineEventHandler, getHeader } from "h3";
import jwt from "jsonwebtoken";

const JWT_SECRET = "your-secret-key";

export default defineEventHandler((event) => {
  if (!event.path.startsWith("/api/")) {
    return;
  }

  if (
    event.path.startsWith("/api/register") ||
    event.path.startsWith("/api/login")
  ) {
    return;
  }

  const authHeader = getHeader(event, "authorization");
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    throw createError({ statusCode: 401, statusMessage: "Unauthorized" });
  }

  const token = authHeader.split(" ")[1];
  try {
    event.context.user = jwt.verify(token, JWT_SECRET);
  } catch {
    throw createError({ statusCode: 401, statusMessage: "Invalid token" });
  }
});
