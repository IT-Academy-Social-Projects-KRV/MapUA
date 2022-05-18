import { Strategy as LocalStrategy } from 'passport-local';
import UserModel from '../../models/UserModel';

export const localStrategySignUp = new LocalStrategy(
  {
    usernameField: 'email',
    passwordField: 'password'
  },
  async (email, password, done) => {
    try {
      const user = await UserModel.findOne({ email });
      if (user) {
        return done(null, false, {
          message: 'User with such email already registered'
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
    passwordField: 'password'
  },
  async (email, password, done) => {
    try {
      const user = await UserModel.findOne({ email });

      if (!user) {
        return done(null, false, { message: 'User not found' });
      }

      const validate = await user.isValidPassword(password);

      if (!validate) {
        return done(null, false, { message: 'Wrong Password' });
      }

      return done(null, user, { message: 'Logged in Successfully' });
    } catch (error) {
      return done(error);
    }
  }
);
