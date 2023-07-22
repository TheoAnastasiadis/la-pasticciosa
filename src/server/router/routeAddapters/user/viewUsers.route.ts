import { viewUsersController } from "../../../controllers/user/viewUsers.controller";
import { publicProcedure } from "../../trpc";

export const viewUsersRoute = publicProcedure
  .meta({ requiresAuth: true, adminOnly: true })
  .query(viewUsersController);
