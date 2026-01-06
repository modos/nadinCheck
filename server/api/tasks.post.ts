import { db } from "../db";
import { tasks } from "../db/schema";

export default defineEventHandler(async (event) => {
  const user = event.context.user;
  const body = await readBody(event);

  return db
    .insert(tasks)
    .values({
      userId: user.id,
      title: body.title,
      completed: false,
    })
    .returning()
    .get();
});
