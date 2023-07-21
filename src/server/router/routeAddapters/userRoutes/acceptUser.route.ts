import { z } from "zod";
import { publicProcedure } from "../../trpc";
import { acceptUser } from "../../../useCases/users/acceptUser";
import { assertExists } from "../../helpers/assertExists";
import { User } from "../../../entities/user.entity";
import { fetchUser } from "../../helpers/fetchUser";
import { throwDBError } from "../../helpers/throwDBError";

export const acceptUserRoute = publicProcedure
  .input(z.string())
  .meta({ requiresAuth: true, adminOnly: true })
  .mutation(async ({ input }) => {
    const user = await fetchUser(input);
    assertExists<User>(user);
    return await acceptUser(user).catch(throwDBError);
  });
