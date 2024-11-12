import {getRepository} from "#typeorm";
import {User} from "~~/server/entities/user.entity";
import {Component} from "~~/server/entities/component.entity";

interface ComponentQuery {
  category: string;
  name: string;
  brand?: string;
  mode?: string;
}

export default defineEventHandler(async (event) => {
  const query = await readBody<ComponentQuery>(event);
  if (!query || query.name.length < 3 || !['processor', 'gpu', 'ram', 'hdd', 'ssd'].includes(query.category)) {
    return { ok: false, error: 'errors.component.invalid.name' };
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

  const componentRepository = await getRepository(Component);
  const insert = await componentRepository.insert({
    category: query.category,
    name: query.name,
    brand: query.brand,
    model: query.model,
  });
  if (insert.identifiers.length === 0) {
    return { ok: false, error: 'errors.component.invalid.name' };
  }

  return { ok: true, data: insert.identifiers[0] };
});
