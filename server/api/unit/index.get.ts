import {getRepository} from "#typeorm";
import {Unit} from '~~/server/entities/unit.entity';

export default defineEventHandler(async (event) => {
  const unitRepository = await getRepository(Unit);

  return { ok: true, data: await unitRepository.find() };
});
