import {defineEventHandler, H3Error} from "h3";
import {getRepository} from "#typeorm";
import {User} from "~~/server/entities/user.entity";
import {createToken} from "~~/server/utils/session";
import bcrypt from "bcrypt";
import {RegisterDto} from "~~/server/dto/auth/RegisterDto";
import {validatePostRequest} from "~~/server/utils/validateRequest";

export default defineEventHandler(async (event) => {
  const res = await validatePostRequest(event, RegisterDto);
  if (res.isErr()) {
    return { ok: false, error: res.error }
  }

  const data = res.value;

  const userRepository = await getRepository(User);

  const hash = bcrypt.hashSync(data.password, 10);

  const id = await userRepository.insert({
    email: data.email,
    password: hash,
    username: data.username,
  });

  if (id.identifiers.length === 0) {
    return { ok: false, error: 'errors.register.email.taken' };
  }

  const user = await userRepository.findOne({ where: { id: id.identifiers[0] } });
  if (!user) {
    return { ok: false, error: 'errors.register.panic' };
  }

  setCookie(event, '__session', await createToken(user));

  delete user.password;
  return { ok: true, data: user };
});
