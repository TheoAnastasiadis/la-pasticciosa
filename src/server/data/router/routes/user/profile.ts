import { TRPCError } from "@trpc/server";
import { userWNoPasswordOrCatalogue } from "../../../../validators";
import authenticate from "../../middleware/authenticate";
import authorize from "../../middleware/authorize";
import { procedure } from "../../setup";

export const profile = procedure
  .meta({ secure: true, adminOnly: true })
  .use(authenticate)
  .use(authorize)
  .output(userWNoPasswordOrCatalogue)
  .query(({ ctx }) => {
    if (typeof ctx?.session?.user === "undefined")
      throw new TRPCError({ code: "BAD_REQUEST" });
    return ctx.session.user;
  });
