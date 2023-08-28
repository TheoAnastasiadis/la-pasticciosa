import { throwNotFoundError } from "../../errors/notFound.error";
import { User, type UserStatus } from "../../../entities/user";
import authenticate from "../../middleware/authenticate";
import authorize from "../../middleware/authorize";
import { procedure } from "../../setup";
import { z } from "zod";
import { userStatusParser, userWNoPassword } from "../../validators";

export const updateStatus = procedure
  .meta({ secure: true, adminOnly: true })
  .use(authenticate)
  .use(authorize)
  .input(z.object({ userId: z.string(), status: userStatusParser }))
  .output(userWNoPassword)
  .mutation(async ({ input }) => {
    // assert user exists in db
    const user = await User.findOneOrFail({
      where: { uuid: input.userId },
      relations: { catalogue: true },
    }).catch(throwNotFoundError);

    // update record
    await User.update(
      { uuid: input.userId },
      { status: input.status as UserStatus },
    );

    // update object and return
    // @ts-expect-error `User` entity holds rich item objects but we only need to return item ids to the client.
    user.catalogue = user.catalogue.map((item) => item.id);
    return user as User & { catalogue: string[] };
  });
