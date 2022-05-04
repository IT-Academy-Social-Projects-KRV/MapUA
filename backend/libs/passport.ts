import passport from "passport";
import jwtStrategy from "./strategies/jwtStrategy";
import {
  localStrategySignUp,
  localStrategySignIn,
} from "./strategies/localStrategy";

passport.use("signup", localStrategySignUp);
passport.use("signin", localStrategySignIn);
passport.use("jwt", jwtStrategy);

export default passport;
