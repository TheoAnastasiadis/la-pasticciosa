import { viewUsersController } from "../../../controllers/user/viewUsers.controller";
import { adminOnlyRoute } from "../../middlewareAddapters/adminRequest";

export const viewUsersRoute = adminOnlyRoute.query(viewUsersController);
