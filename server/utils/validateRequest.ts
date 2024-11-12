import { H3Event, H3Error, readBody } from 'h3';
import { plainToInstance, ClassConstructor } from 'class-transformer';
import { validate } from 'class-validator';
import {ok, err, ResultAsync} from 'neverthrow';

export async function validatePostRequest<T>(event: H3Event, dtoClass: ClassConstructor<T>, allowArray = false): ResultAsync<T, string> {
  const body = await readBody(event);

  if (!body || typeof body !== 'object') {
    if (!allowArray && Array.isArray(body)) {
      return err('Invalid request data format: expected a JSON object.');
    }

    return err('Invalid request data format: expected a JSON array.');
  }

  return validateReq(dtoClass, body);
}

export async function validateGetRequest<T>(event: H3Event, dtoClass: ClassConstructor<T>): Promise<T> {
  const params = await getQuery(event);

  return validateReq(dtoClass, params);
}

const validateReq = async (dtoClass: ClassConstructor<T>, body: Object | Object[]) => {
  const dtoInstance = plainToInstance(dtoClass, body);
  const errors = await validate(dtoInstance);

  if (errors.length > 0) {
    return err(JSON.stringify(errors.map(err => ({ property: err.property, constraints: err.constraints }))));
  }

  return ok(dtoInstance);
}
