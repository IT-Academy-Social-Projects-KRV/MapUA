import passport from 'passport';
import facebookStrategy from './strategies/facebookStrategy';
import jwtStrategy from './strategies/jwtStrategy';
import {
  localStrategySignUp,
  localStrategySignIn
} from './strategies/localStrategy';
import { googleStrategy } from './strategies/googleStrategy';
passport.use('signup', localStrategySignUp);
passport.use('signin', localStrategySignIn);
passport.use('facebook', facebookStrategy);
passport.use('jwt', jwtStrategy);
passport.use('google', googleStrategy);

export default passport;
