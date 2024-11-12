import {defineEventHandler, H3Error} from "h3";
import {getRepository} from "#typeorm";
import {User} from "~~/server/entities/user.entity";
import {createToken} from "~~/server/utils/session";
import bcrypt from "bcrypt";
import {AuthDto} from '~~/server/dto/auth/AuthDto';
import {validatePostRequest} from "~~/server/utils/validateRequest";

export default defineEventHandler(async (event) => {
  const res = await validatePostRequest(event, AuthDto);
  if (res.isErr()) {
    return { ok: false, error: res.error }
  }

  const data = res.value;

  const userRepository = await getRepository(User);

  const user = await userRepository.findOne({where: {email: data.email}});
  if (!user || !bcrypt.compareSync(data.password, user.password)) {
    return {ok: false, error: 'errors.auth.invalid.credentials'};
  }

  setCookie(event, '__session', await createToken(user));

  delete user.password;
  return {ok: true, data: user};
});
