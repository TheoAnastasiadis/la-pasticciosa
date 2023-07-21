import { userRepo } from "../../database/repos/user.repo";
import { User } from "../../entities/user.entity";

export const requestUser = (user: Omit<User, "uuid">) => userRepo.insert(user);
