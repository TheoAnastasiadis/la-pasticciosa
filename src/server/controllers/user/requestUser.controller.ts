import type { z } from "zod";
import type { user } from "../../entities/decoders/user.decoder";
import { TRPCError } from "@trpc/server";
import { throwDBError } from "../errors/db.error";
import { requestUser, type userProps } from "../../useCases/users/requestUser";
import { User } from "../../entities/user.entity";

// helpers
const checkForDuplicateEmails: (email: string) => Promise<void> = async (
  email,
) => {
  const duplicates = await User.findBy({ email });
  if (duplicates.length > 0) {
    throw new TRPCError({
      code: "PRECONDITION_FAILED",
      message: "A user with this email address already exists in the database",
    });
  }
};

export const requestUserController: (
  props: z.infer<typeof userProps>,
) => Promise<z.infer<typeof user>> = async (props) => {
  await checkForDuplicateEmails(props.email);
  return (await requestUser(props).catch(throwDBError)).toSafeOutput();
};
