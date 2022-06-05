import { Strategy as LocalStrategy } from 'passport-local';
import UserModel from '../../models/UserModel';

export const localStrategySignUp = new LocalStrategy(
  {
    usernameField: 'email',
    passwordField: 'password',
    passReqToCallback: true
  },
  async (req, email, password, done) => {
    try {
      const user = await UserModel.findOne({ email });
      if (user) {
        return done(null, false, {
          message: req.t('auth.user_already_exists')
        });
      }

      const newUser = await UserModel.create({ email, passwordHash: password });

      return done(null, newUser);
    } catch (error) {
      done(error);
    }
  }
);

export const localStrategySignIn = new LocalStrategy(
  {
    usernameField: 'email',
    passwordField: 'password',
    passReqToCallback: true
  },
  async (req, email, password, done) => {
    try {
      const user = await UserModel.findOne({ email });

      if (!user) {
        return done(null, false, { message: req.t('auth.user_not_exist') });
      }

      const validate = await user.isValidPassword(password);

      if (!validate) {
        return done(null, false, { message: req.t('auth.invalid_password') });
      }

      return done(null, user);
    } catch (error) {
      return done(error);
    }
  }
);
