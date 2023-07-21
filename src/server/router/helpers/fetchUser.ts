import { userRepo } from "../../database/repos/user.repo";
import { throwDBError } from "./throwDBError";

export const fetchUser = (uuid: string) =>
  userRepo.findOneBy({ uuid }).catch(throwDBError);
