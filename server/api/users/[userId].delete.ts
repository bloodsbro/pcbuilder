import { defineEventHandler } from 'h3';
import {getRepository} from "#typeorm";
import {User} from "~~/server/entities/user.entity";

export default defineEventHandler(async (event) => {
  const userId = Number(event.context.params.userId);
  const userRepository = await getRepository(User);

  if (event.context?.user?.id !== userId) {
    return { ok: false, error: 'errors.auth.notAuthorized' };
  }

  await userRepository.delete(userId);

  return { message: 'Профиль удалён', userId };
});
