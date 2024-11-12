import {getRepository} from "#typeorm";
import {User} from "~~/server/entities/user.entity";
import {Specification} from "~~/server/entities/specification.entity";
import {AddSpecificationDto} from "~~/server/dto/specification/AddSpecificationDto";
import {validatePostRequest} from "~~/server/utils/validateRequest";
import {Unit} from '~~/server/entities/unit.entity';

export default defineEventHandler(async (event) => {
  const res = await validatePostRequest(event, AddSpecificationDto);
  if (res.isErr()) {
    return { ok: false, error: res.error }
  }

  const data = res.value;

  const userRepository = await getRepository(User);

  const user = await userRepository.findOne({ where: { id: event.context.user.id } });
  if (!user) {
    return { ok: false, error: 'errors.auth.invalid' };
  }

  // TODO: admin check

  const unitRepository = await getRepository(Unit);
  const unit = await unitRepository.findOne({ where: { id: data.unit } });
  if (!unit) {
    return {ok: false, error: `errors.specification.unit.invalid` };
  }

  const specificationRepository = await getRepository(Specification);
  const insert = await specificationRepository.insert({
    name: data.name,
    applicableTypes: data.applicableTypes,
    unit: unit.id,
  });
  if (insert.identifiers.length === 0) {
    return { ok: false, error: 'errors.specification.invalid.name' };
  }

  return { ok: true, data: insert.identifiers[0] };
});
