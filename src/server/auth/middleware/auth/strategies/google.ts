import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import appConfig from "../../../config/app.config";
import { User } from "../../../entities/user";
import { In } from "typeorm";

export default new GoogleStrategy(
  {
    clientID: appConfig.getGoogleClientId(),
    clientSecret: appConfig.getGoogleClientSecret(),
    callbackURL: appConfig.getClientUrl() + "auth/login/google",
    scope: ["email", "profile"],
    state: false,
  },
  (accessToken, refreshToken, profile, done) => {
    console.info("redirection complete");
    User.findOneBy({
      email: In(
        profile.emails
          ?.filter(({ verified }) => verified)
          .map(({ value }) => value) ?? [],
      ),
    })
      .then((user) => {
        if (user === null) done(null, false);
        else done(null, user);
      })
      .catch(done);
  },
);
