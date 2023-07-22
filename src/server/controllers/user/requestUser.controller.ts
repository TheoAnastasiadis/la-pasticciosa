import type { z } from "zod";
import { user } from "../../entities/decoders/user.decoder";
import { TRPCError } from "@trpc/server";
import { userRepo } from "../../database/repos/user.repo";
import { createUser } from "../../useCases/users/createUser";
import { throwDBError } from "../helpers/throwDBError";
import type { InsertResult } from "typeorm";

// helpers
const checkForDuplicateEmails: (email: string) => Promise<void> = async (
  email,
) => {
  const duplicates = await userRepo.findBy({ email });
  if (duplicates.length > 0) {
    throw new TRPCError({
      code: "PRECONDITION_FAILED",
      message: "A user with this email address already exists in the database",
    });
  }
};

const userProps = user.omit({
  uuid: true,
  type: true,
  status: true,
  catalogue: true,
});

export const requestUserController: (
  props: z.infer<typeof userProps>,
) => Promise<InsertResult> = async (props) => {
  await checkForDuplicateEmails(props.email);
  const newUser = userRepo.create({ ...props });
  return await createUser(newUser).catch(throwDBError);
};
