import { User, UserStatus, UserType } from "../../../../entities/user";
import authenticate from "../../middleware/authenticate";
import authorize from "../../middleware/authorize";
import { procedure } from "../../setup";
import { requestUserProps, userWNoPassword } from "../../../../validators";

export const signUp = procedure
  .meta({ secure: false, adminOnly: false })
  .use(authenticate)
  .use(authorize)
  .input(requestUserProps)
  .output(userWNoPassword.omit({ catalogue: true }))
  .mutation(async ({ input }) => {
    return await User.create({
      ...input,
      status: UserStatus.REQUESTED,
      type: UserType.USER,
    }).save(); // password hashing will hapen because of the @beforeInsert hook
  });
