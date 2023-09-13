import passport from "../passport";

export default passport.authenticate("local", {
  session: false,
});
