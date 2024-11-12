import {getRepository} from "#typeorm";
import {ComponentSpecification} from "~~/server/entities/component_specification.entity";

export default defineEventHandler(async (event) => {
  const componentId = Number(event.context.params?.component);
  if (isNaN(componentId)) {
    return { ok: 'error', error: 'errors.component.specification.invalid.id' };
  }

  const componentSpecificationRepository = await getRepository(ComponentSpecification);

  return { ok: true, data: await componentSpecificationRepository.find({ where: { component: componentId }, relations: ['component', 'specification'] }) };
});
