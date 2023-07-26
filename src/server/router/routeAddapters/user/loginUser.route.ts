import { loginController } from "../../../controllers/user/login.controller";
import { user } from "../../../entities/decoders/user.decoder";
import { publicProcedure } from "../../trpc";

const userProps = user.pick({ email: true, password: true });

export const LoginUserRoute = publicProcedure
  .input(userProps)
  .query(async ({ input, ctx }) => {
    const { email, password } = input;
    const sessionId = await loginController(email, password);
    ctx.setCookie("sessionId", sessionId, {
      httpOnly: true,
      maxAge: 30 * 24 * 60 * 60 * 1000, // one month
    });
  });
