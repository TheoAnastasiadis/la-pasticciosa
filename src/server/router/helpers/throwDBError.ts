import { databaseError } from "../errors/databaseError";

export const throwDBError: () => never = () => {
  throw databaseError();
};
