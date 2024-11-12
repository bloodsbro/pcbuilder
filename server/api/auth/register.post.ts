import {defineEventHandler} from "h3";
import {getRepository} from "#typeorm";
import {User} from "~~/server/entities/user.entity";
import {createHmac} from "node:crypto";
import {createToken} from "~~/server/utils/session";
import {isStrongPassword, isEmail} from "class-validator";

interface RegisterData {
  email: string;
  password: string;
  username: string;
}

export default defineEventHandler(async (event) => {
  const data = await readBody<RegisterData>(event);
  if (!isEmail(data.email) || !isStrongPassword(data.password, {
    minLength: 6,
    minNumbers: 1,
    minSymbols: 1,
    minLowercase: 1,
    minUppercase: 1,
  })) {
    return { ok: false, error: 'errors.register.data.invalid' };
  }

  const userRepository = await getRepository(User);

  const hash = createHmac('sha256', data.password).digest('hex');

  const id = await userRepository.insert({
    email: data.email,
    password: hash,
    username: data.username,
  });

  if (id.identifiers.length === 0) {
    return { ok: false, error: 'errors.register.email.taken' };
  }

  const user = await userRepository.findOne({ where: { id: id.identifiers[0] } });

  setCookie(event, '__session', await createToken(user));

  return { ok: true, data: user };
});
