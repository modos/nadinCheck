import { db } from "../../db";
import { tasks } from "../../db/schema";
import { eq, and } from "drizzle-orm";

export default defineEventHandler(async (event) => {
  const user = event.context.user;
  const id = Number(getRouterParam(event, "id"));

  await db
    .delete(tasks)
    .where(and(eq(tasks.id, id), eq(tasks.userId, user.id)));

  return { success: true };
});
