import { Strategy as LocalStrategy } from "passport-local";
import { User } from "../../../../entities/user";
import type { VerifyFunction } from "passport-facebook";

export function verify(
  email: string,
  password: string,
  done: Parameters<VerifyFunction>[3],
): void {
  User.findOneBy({ email })
    .then((user: User | null) => {
      if (user === null) {
        done(null, false);
        /* istanbul ignore next */
        return;
      }
      if (!user.validatePassword(password)) {
        done(null, false);
        /* istanbul ignore next */
        return;
      }
      done(null, user);
    })
    .catch(done);
}

export default new LocalStrategy({ usernameField: "email" }, verify);
