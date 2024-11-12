import {getRepository} from "#typeorm";
import {User} from "~~/server/entities/user.entity";
import {Component} from "~~/server/entities/component.entity";
import {AddComponentDto} from "~~/server/dto/component/addComponentDto";
import {validatePostRequest} from "~~/server/utils/validateRequest";

export default defineEventHandler(async (event) => {
  const res = await validatePostRequest(event, AddComponentDto);
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

  const componentRepository = await getRepository(Component);
  const insert = await componentRepository.insert({
    category: data.category,
    name: data.name,
    brand: data.brand,
    model: data.model,
  });
  if (insert.identifiers.length === 0) {
    return { ok: false, error: 'errors.component.invalid.name' };
  }

  return { ok: true, data: insert.identifiers[0] };
});
