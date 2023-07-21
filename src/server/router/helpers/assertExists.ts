import { notFoundError } from "../errors/notFound.error";

export function assertExists<T>(entity: any): asserts entity is T {
  if (entity?.length === 0 || !entity) throw notFoundError(entity.name);
}
