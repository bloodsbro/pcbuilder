import {defineEventHandler} from "h3";
import {getRepository} from "#typeorm";
import {User} from "~~/server/entities/user.entity";
import {createToken} from "~~/server/utils/session";
import bcrypt from "bcrypt";

interface AuthData {
  email: string;
  password: string;
}

export default defineEventHandler(async (event) => {
  const userRepository = await getRepository(User);

  const data = await readBody<AuthData>(event);
  if (!data.email || !data.password) {
    return { ok: false, error: 'errors.auth.invalid.data' };
  }

  const user = await userRepository.findOne({ where: { email: data.email } });
  if (!user || !bcrypt.compareSync(data.password, user.password)) {
    return { ok: false, error: 'errors.auth.invalid.credentials' };
  }

  setCookie(event, '__session', await createToken(user));

  delete user.password;
  return { ok: true, data: user };
});
