import { z } from "zod";
import { publicProcedure } from "../../trpc";
import { assignItem } from "../../../useCases/items/assignItem";
import { assertExists } from "../../helpers/assertExists";
import { type User } from "../../../entities/user.entity";
import { type Item } from "../../../entities/item.entity";
import { throwDBError } from "../../helpers/throwDBError";
import { fetchUser } from "../../helpers/fetchUser";
import { fetchItem } from "../../helpers/fetchItem";

export const assignItemsRoute = publicProcedure
  .input(z.object({ userId: z.string(), itemId: z.string() }))
  .meta({ requiresAuth: true, adminOnly: true })
  .mutation(async ({ input }) => {
    const user = await fetchUser(input.userId);
    assertExists<User>(user);

    const item = await fetchItem(input.itemId);
    assertExists<Item>(item);

    return await assignItem(item, user).catch(throwDBError);
  });
