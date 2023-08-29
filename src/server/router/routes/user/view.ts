import { throwNotFoundError } from "../../errors/notFound.error";
import { User, UserStatus } from "../../../entities/user";
import authenticate from "../../middleware/authenticate";
import authorize from "../../middleware/authorize";
import { procedure } from "../../setup";
import { z } from "zod";
import { userWNoPassword } from "../../validators";
import appConfig from "../../../config/app.config";
import { Not } from "typeorm";

const PAGINATION_LIMIT = appConfig.getPaginationLimit();

export const view = procedure
  .meta({ secure: true, adminOnly: false })
  .use(authenticate)
  .use(authorize)
  .input(z.object({ page: z.number().optional() }))
  .output(z.array(userWNoPassword))
  .query(async ({ ctx: { onBehalf }, input: { page } }) => {
    const user = await User.findOneOrFail({
      where: { uuid: onBehalf },
      relations: { catalogue: true },
    }).catch(throwNotFoundError);

    if (user.isAdmin()) {
      // admins can have access to all of the users
      return (
        await User.find({
          take: PAGINATION_LIMIT,
          skip: PAGINATION_LIMIT * (page ?? 0),
          relations: { catalogue: true },
          where: { status: Not(UserStatus.REJECTED) },
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
