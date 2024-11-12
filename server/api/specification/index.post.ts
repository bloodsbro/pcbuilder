import {getRepository} from "#typeorm";
import {User} from "~~/server/entities/user.entity";
import {Specification} from "~~/server/entities/specification.entity";

interface SpecificationQuery {
  name: string;
  applicableTypes: (typeof Specification.applicableTypes)[],
  unit: string;
}

export default defineEventHandler(async (event) => {
  const query = await readBody<SpecificationQuery>(event);
  if (!query || query.name.length < 3 || query.unit.length < 3 || query.applicableTypes.some((el) => !['processor', 'gpu', 'ram', 'hdd', 'ssd'].includes(el))) {
    return { ok: false, error: 'errors.specification.invalid.name' };
  }

  if (!event.context.user) {
    return { ok: false, error: 'errors.auth.notAuthorized' };
  }

  const userRepository = await getRepository(User);

  const user = await userRepository.findOne({ where: { id: event.context.user.id } });
  if (!user) {
    return { ok: false, error: 'errors.auth.invalid' };
  }

  // TODO: admin check

  const specificationRepository = await getRepository(Specification);
  const insert = await specificationRepository.insert({
    name: query.name,
    applicableTypes: query.applicableTypes,
    unit: query.unit,
  });
  if (insert.identifiers.length === 0) {
    return { ok: false, error: 'errors.specification.invalid.name' };
  }

  return { ok: true, data: insert.identifiers[0] };
});
