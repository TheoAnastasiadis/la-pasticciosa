import type { User } from "../../entities/user.entity";

export const changeUserPassword: (
  user: User,
  newPassword: string,
) => Promise<User> = async (user, newPassword) => {
  user.password = newPassword;
  // @ts-expect-error (When an item in user.catalogue is in an altered state (example: deleted), typeorm will try to re insert they user_uuid <-> item_id row in the join table, throwing a unique contraint error.)
  user.catalogue = user.catalogue.map((item) => item.id);
  console.log(JSON.stringify(user, undefined, 2));
  return await user.save();
};
