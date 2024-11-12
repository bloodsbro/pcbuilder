import { defineEventHandler, readBody } from 'h3';

export default defineEventHandler(async (event) => {
  const body = await readBody(event);
  // Логика создания пользователя, например, сохранение в базе данных
  return { message: 'Профиль создан', user: body };
});
