import passport from "passport";
import facebookStrategy from "./strategies/facebookStrategy";
import jwtStrategy from "./strategies/jwtStrategy";
import {
  localStrategySignUp,
  localStrategySignIn,
} from "./strategies/localStrategy";

passport.use("signup", localStrategySignUp);
passport.use("signin", localStrategySignIn);
passport.use("facebook", facebookStrategy);
passport.use("jwt", jwtStrategy);

export default passport;
