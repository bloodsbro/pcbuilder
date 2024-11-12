import {AddUnitDto} from "~~/server/dto/unit/AddUnitDto";
import {validatePostRequest} from "~~/server/utils/validateRequest";
import {getRepository} from "#typeorm";
import {User, UserRole} from '~~/server/entities/user.entity';
import {Unit} from '~~/server/entities/unit.entity';

export default defineEventHandler(async (event) => {
  const res = await validatePostRequest(event, AddUnitDto);
  if (res.isErr()) {
    return { ok: false, error: res.error }
  }

  const data = res.value;

  const userRepository = await getRepository(User);

  const user = await userRepository.findOne({ where: { id: event.context.user.id } });
  if (!user) {
    return { ok: false, error: 'errors.auth.invalid' };
  }

  if (user.role < UserRole.ROLE_ADMIN) {
    return { ok: false, error: 'errors.privileges.low' };
  }

  const unitRepository = await getRepository(Unit);
  const insert = await unitRepository.insert({
    unit: data.unit,
  });

  if (insert.identifiers.length === 0) {
    return { ok: false, error: 'errors.unit.invalid' };
  }

  return { ok: true, data: insert.identifiers[0] };
});
