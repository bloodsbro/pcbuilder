import {getRepository} from "#typeorm";
import {Component} from "~~/server/entities/component.entity";
import {GetComponentDto} from "~~/server/dto/component/getComponentDto";
import {validateGetRequest} from "~~/server/utils/validateRequest";

export default defineEventHandler(async (event) => {
  const res = await validateGetRequest(event, GetComponentDto);
  if (res.isErr()) {
    return { ok: false, error: res.error }
  }

  const data = res.value;

  const componentRepository = await getRepository(Component);

  return {
    ok: true,
    data: await componentRepository.find({
      where: { category: data.category },
      take: data.limit,
      skip: (data.page - 1) * data.limit,
      relations: ['specifications', 'specifications.specification', 'specifications.specification.unit']
    })
  };
});
