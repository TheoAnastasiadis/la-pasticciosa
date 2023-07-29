import { TRPCError } from "@trpc/server";
import { generateSession } from "../../middleware/session";
import { User } from "../../entities/user.entity";

export const loginController: (
  email: string,
  password: string,
) => Promise<string> = async (email, password) => {
  const user = await User.findOneBy({ email });
  if (user === null || !user.validatePassword(password))
    throw new TRPCError({
      code: "UNAUTHORIZED",
      message:
        "Username and/or password don't match with the records on our server",
    });
  return await generateSession(user);
};
