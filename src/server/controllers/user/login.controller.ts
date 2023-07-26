import { TRPCError } from "@trpc/server";
import { userRepo } from "../../database/repos/user.repo";
import { generateSession } from "../../middleware/session";

export const loginController: (
  email: string,
  password: string,
) => Promise<string> = async (email, password) => {
  const user = await userRepo.findOneBy({ email });
  if (user === null || !user.validatePassword(password))
    throw new TRPCError({
      code: "UNAUTHORIZED",
      message:
        "Username and/or password don't match with the records on our server",
    });
  return await generateSession(user);
};
