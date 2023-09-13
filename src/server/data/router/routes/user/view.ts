import { User, UserStatus } from "../../../../entities/user";
import authenticate from "../../middleware/authenticate";
import authorize from "../../middleware/authorize";
import { procedure } from "../../setup";
import { z } from "zod";
import { userWNoPassword } from "../../../../validators";
import appConfig from "../../../../config/app.config";
import { Not } from "typeorm";

const PAGINATION_LIMIT = appConfig.getPaginationLimit();

export const view = procedure
  .meta({ secure: true, adminOnly: false })
  .use(authenticate)
  .use(authorize)
  .input(z.object({ page: z.union([z.number(), z.literal("all")]) }).optional())
  .output(z.array(userWNoPassword))
  .query(async ({ ctx: { onBehalf }, input }) => {
    const user = await User.findOneOrFail({
      where: { uuid: onBehalf },
      relations: { catalogue: true },
    });

    const pagination =
      typeof input?.page === "number"
        ? { take: PAGINATION_LIMIT, skip: PAGINATION_LIMIT * input.page }
        : {};

    if (user.isAdmin()) {
      // admins can have access to all of the users
      return (
        await User.find({
          ...pagination,
          relations: { catalogue: true },
          where: { status: Not(UserStatus.REJECTED) },
          order: { uuid: "DESC" },
        })
      ).map((user) => {
        // @ts-expect-error `User` entity holds rich item info but we only return item ids to the client
        user.catalogue = user.catalogue.map((item) => item.id);
        return user;
      }) as Array<User & { catalogue: string[] }>;
    }

    // @ts-expect-error `User` entity holds rich item info but we only return item ids to the client
    user.catalogue = user.catalogue.map((item) => item.id);
    // simple users can only access their own data
    return [user] as Array<User & { catalogue: string[] }>;
  });
