import {defineEventHandler} from "h3";
import {getRepository} from "#typeorm";
import {User} from "~~/server/entities/user.entity";
import {createHmac} from "node:crypto";
import {createToken} from "~~/server/utils/session";

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

  const hash = createHmac('sha256', data.password).digest('hex');

  const user = await userRepository.findOne({ where: { email: data.email, password: hash } });
  if (!user) {
    return { ok: false, error: 'errors.auth.invalid.credentials' };
  }

  setCookie(event, '__session', await createToken(user));

  return { ok: true, data: user };
});
