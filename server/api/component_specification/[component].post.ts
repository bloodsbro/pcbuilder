import {getRepository} from "#typeorm";
import {User} from "~~/server/entities/user.entity";
import {ComponentSpecification} from "~~/server/entities/component_specification.entity";

interface ComponentSpecificationPost {
  specificationId: number;
  value: string;
}

export default defineEventHandler(async (event) => {
  const componentId = Number(event.context.params?.component);

  const query = await readBody<ComponentSpecificationPost>(event);
  if (!query) {
    return { ok: false, error: 'errors.component.specification.invalid.name' };
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
  // TODO: check component & specification exist

  const componentSpecificationRepository = await getRepository(ComponentSpecification);
  const insert = await componentSpecificationRepository.insert({
    component: componentId,
    specification: query.specificationId,
    value: query.value,
  });
  if (insert.identifiers.length === 0) {
    return { ok: false, error: 'errors.component.specification.invalid.name' };
  }

  return { ok: true, data: insert.identifiers[0] };
});
