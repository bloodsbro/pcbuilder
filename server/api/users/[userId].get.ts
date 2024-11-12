import { defineEventHandler, getQuery } from 'h3';
import { getRepository } from "#typeorm";
import {User} from "~~/server/entities/user.entity";

export default defineEventHandler(async (event) => {
  const userId = Number(event.context.params?.userId);

  if (event.context?.user?.id !== userId) {
    return { ok: false, error: 'errors.auth.notAuthorized' };
  }

  const userRepository = await getRepository(User);

  const user = await userRepository.findOne({ where: { id: userId } });
  delete user.password;

  return { message: 'Профиль пользователя', user };
});
