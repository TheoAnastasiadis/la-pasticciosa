import { viewUsersController } from "../../../controllers/user/viewUsers.controller";
import { user } from "../../../entities/decoders/user.decoder";
import { adminOnlyRoute } from "../../middlewareAddapters/adminRequest";
import { z } from "zod";

export const viewUsersRoute = adminOnlyRoute
  .output(z.array(user))
  .query(viewUsersController);
