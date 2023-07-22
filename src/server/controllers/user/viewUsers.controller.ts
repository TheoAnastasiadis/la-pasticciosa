import type { User } from "../../entities/user.entity";
import { viewUsers } from "../../useCases/users/viewUsers";

export const viewUsersController: () => Promise<User[]> = async () =>
  await viewUsers();
