import type { z } from "zod";
import { type Session } from "../../../../entities/session";
import { userWNoPasswordOrCatalogue } from "../../../../validators";
import authenticate from "../../middleware/authenticate";
import authorize from "../../middleware/authorize";
import { procedure } from "../../setup";

export const profile = procedure
  .meta({ secure: true, adminOnly: false })
  .use(authenticate)
  .use(authorize)
  .output(userWNoPasswordOrCatalogue)
  .query(({ ctx }) => {
    return (ctx.session as Session).user as z.TypeOf<
      typeof userWNoPasswordOrCatalogue
    >;
  });
