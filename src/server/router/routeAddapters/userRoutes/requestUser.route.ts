import { publicProcedure } from "../../trpc";
import { user } from "../../../entities/decoders/user.decoder";
import { userRepo } from "../../../database/repos/user.repo";
import { TRPCError } from "@trpc/server";
import { createUser } from "../../../useCases/users/createUser";

//helper
const checkForDuplicateEmails = async (email: string) => {
  const duplicates = await userRepo.findBy({ email });
  if (duplicates.length > 0)
    throw new TRPCError({
      code: "PRECONDITION_FAILED",
      message: "A user with this email address already exists in the database",
    });
};

export const requestUserRoute = publicProcedure
  .input(user.omit({ uuid: true, type: true, status: true, catalogue: true }))
  .meta({ requiresAuth: false, adminOnly: false })
  .mutation(async ({ input }) => {
    const user = input;
    try {
      //check if email exists

      const newUser = userRepo.create({ ...user });
      return await createUser(newUser);
    } catch (error) {
      throw new TRPCError({
        code: "INTERNAL_SERVER_ERROR",
        message: "Connection with the database could not be established",
      });
    }
  });
