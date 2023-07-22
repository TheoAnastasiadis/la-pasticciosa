import { viewAssignedItems } from "../../../useCases/items/viewAssignedItems";
import { publicProcedure } from "../../trpc";
import { z } from "zod";
import { fetchUser } from "../../helpers/fetchUser";
import { assertExists } from "../../helpers/assertExists";
import { type User } from "../../../entities/user.entity";
import { throwDBError } from "../../helpers/throwDBError";

export const viewAssignedItemsRoute = publicProcedure
  .input(z.string())
  .meta({ requiresAuth: true, adminOnly: false })
  .query(async ({ input }) => {
    const user = fetchUser(input);
    assertExists<User>(user);
    return await viewAssignedItems(user).catch(throwDBError);
  });
