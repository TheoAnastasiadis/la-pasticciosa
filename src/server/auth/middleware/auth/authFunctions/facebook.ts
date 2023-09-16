import passport from "../passport";

export default passport.authenticate("facebook", {
  session: false,
  failureRedirect: "/login",
  failureMessage: true,
});
