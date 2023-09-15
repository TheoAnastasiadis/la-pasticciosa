import passport from "passport";
import localStrategy from "./strategies/local";
import googleStrategy from "./strategies/google";

passport.use(localStrategy);

passport.use(googleStrategy);

export default passport;
