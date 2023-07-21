import { databaseError } from "../errors/databaseError";

export const throwDBError = () => {
  throw databaseError();
};
