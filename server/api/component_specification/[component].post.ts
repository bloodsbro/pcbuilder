import {getRepository} from "#typeorm";
import {User} from "~~/server/entities/user.entity";
import {ComponentSpecification} from "~~/server/entities/component_specification.entity";
import {AddComponentSpecificationDto} from "~~/server/dto/component_specification/AddComponentSpecificationDto";
import {validatePostRequest} from "~~/server/utils/validateRequest";
import {Component} from "~~/server/entities/component.entity";

export default defineEventHandler(async (event) => {
  const componentId = Number(event.context.params?.component);
  if (isNaN(componentId)) {
    return { ok: false, error: 'errors.component.specification.componentId.invalid' };
  }

  const res = await validatePostRequest(event, AddComponentSpecificationDto);
  if (res.isErr()) {
    return { ok: false, error: res.error }
  }

  const data = res.value;

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

  const componentRepository = await getRepository(Component);

  const component = await componentRepository.findOne({ where: { id: componentId } });
  if (!component) {
    return { ok: false, error: 'errors.component.specification.notFound' }
  }

  const componentSpecificationRepository = await getRepository(ComponentSpecification);
  const insert = await componentSpecificationRepository.insert({
    component: component.id,
    specification: data.specificationId,
    value: data.value,
  });
  if (insert.identifiers.length === 0) {
    return { ok: false, error: 'errors.component.specification.invalid.name' };
  }

  return { ok: true, data: insert.identifiers[0] };
});
