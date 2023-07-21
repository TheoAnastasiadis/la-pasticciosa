import { viewUsers } from "../../../useCases/users/viewUsers";
import { publicProcedure } from "../../trpc";

export const viewUsersRoute = publicProcedure
  .meta({ requiresAuth: true, adminOnly: true })
  .query(viewUsers);
