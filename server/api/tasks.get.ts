import { db } from "../db";
import { tasks } from "../db/schema";
import { eq } from "drizzle-orm";

export default defineEventHandler(async (event) => {
  const user = event.context.user;
  return db.select().from(tasks).where(eq(tasks.userId, user.id));
});
