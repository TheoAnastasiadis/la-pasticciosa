import { publicProcedure } from "../trpc";
import { requestWSession } from "./helpers/session";

export const authenticatedRoute = publicProcedure.use(requestWSession);
