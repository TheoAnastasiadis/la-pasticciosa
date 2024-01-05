import { Strategy as FacebookStrategy } from "passport-facebook";
import appConfig from "../../../../config/app.config";
import { User } from "../../../../entities/user";
import { In } from "typeorm";

export default new FacebookStrategy(
  {
    clientID: appConfig.getFacebookAppId(),
    clientSecret: appConfig.getFacebookAppSecret(),
    callbackURL:
      appConfig.getClientUrl(process.env.NODE_ENV === "production") +
      "auth/login/facebook",
    profileFields: ["email"],
  },
  function (accessToken, refreshToken, profile, cb) {
    if (typeof profile.emails === "undefined") cb(null, false);
    else
      User.findOneBy({
        email: In(profile.emails?.map(({ value }) => value)),
      })
        .then((user) => {
          if (user === null) cb(null, false);
          else cb(null, user);
        })
        .catch(cb);
  },
);
