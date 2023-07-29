import { user } from "../../entities/decoders/user.decoder";
import { User, UserStatus, UserType } from "../../entities/user.entity";
import type { z } from "zod";

export const userProps = user.omit({
  uuid: true,
  type: true,
  status: true,
  catalogue: true,
});

export const requestUser: (
  props: z.infer<typeof userProps>,
) => Promise<User> = async (props) =>
  await User.createAndSave({
    ...props,
    status: UserStatus.REQUESTED,
    type: UserType.USER,
  });
