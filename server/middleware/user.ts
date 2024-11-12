import { getUserToken } from "../utils/session"

export default defineEventHandler(async (event) => {
  const user = await getUserToken(event);
  if (!user) {
    event.context.user = null;

    return;
  }

  event.context.user = user;
});
