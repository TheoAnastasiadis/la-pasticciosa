import { Strategy as LocalStrategy } from "passport-local";
import { User } from "../../../entities/user";

export default new LocalStrategy({ usernameField: "email" }, function (
  email,
  password,
  done,
) {
  User.findOneBy({ email })
    .then((user: User | null) => {
      if (user === null) {
        console.log("user is null");
        done(null, false);
        return;
      }
      if (!user.validatePassword(password)) {
        console.log("password doesn't match");
        done(null, false);
        return;
      }
      done(null, user);
    })
    .catch(done);
});
