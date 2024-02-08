/* istanbul ignore file */
import passport from "passport";
import localStrategy from "./strategies/local";
import googleStrategy from "./strategies/google";
import facebookStrategy from "./strategies/facebook";

passport.use(localStrategy);

passport.use(googleStrategy);

passport.use(facebookStrategy);

export default passport;
