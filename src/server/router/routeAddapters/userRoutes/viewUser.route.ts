import { z } from "zod";
import { publicProcedure } from "../../trpc";
import { userRepo } from "../../../database/repos/user.repo";
import { TRPCError } from "@trpc/server";
import { assertExists } from "../../helpers/assertExists";
import { User } from "../../../entities/user.entity";
import { throwDBError } from "../../helpers/throwDBError";

export const viewUserRoute = publicProcedure
  .input(z.string())
  .meta({ requiresAuth: true, adminOnly: false })
  .query(async ({ input }) => {
    const user = await userRepo.findOneBy({ uuid: input }).catch(throwDBError);
    assertExists<User>(user);
    return user;
  });
