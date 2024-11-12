import {getRepository} from "#typeorm";
import {Specification} from "~~/server/entities/specification.entity";

export default defineEventHandler(async (event) => {
  const specificationRepository = await getRepository(Specification);

  return { ok: true, data: await specificationRepository.find() };
});
