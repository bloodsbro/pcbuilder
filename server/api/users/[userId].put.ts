import { defineEventHandler, readBody } from 'h3';

export default defineEventHandler(async (event) => {
  const { userId } = event.context.params;
  const body = await readBody(event);
  // Логика обновления профиля пользователя по userId
  return { message: 'Профиль обновлён', userId, updatedData: body };
});
