import {getRepository} from "#typeorm";
import {Component} from "~~/server/entities/component.entity";

export default defineEventHandler(async (event) => {
  const componentRepository = await getRepository(Component);

  return { ok: true, data: await componentRepository.find() };
});
