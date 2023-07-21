import { userRepo } from "../../database/repos/user.repo";
import { User } from "../../entities/user.entity";

export const createUser = (user: User) => userRepo.insert(user);
