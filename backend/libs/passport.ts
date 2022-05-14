import passport from "passport";
import jwtStrategy from "./strategies/jwtStrategy";
import {
  localStrategySignUp,
  localStrategySignIn,
} from "./strategies/localStrategy";
import { googleStrategy } from './strategies/googleStrategy'
passport.use("signup", localStrategySignUp);
passport.use("signin", localStrategySignIn);
passport.use("jwt", jwtStrategy);
passport.use("google", googleStrategy);

export default passport;
