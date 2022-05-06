import { Response, Request, NextFunction } from 'express';
import passport from '../libs/passport';
import mapUserProps from '../mappers/mapUserProps';
import UserModel, { IUser } from '../models/UserModel';
import tokenGenerator from '../utils/tokenGenerator';
import { sendForgotPasswordMail } from '../libs/mailerSend';
import { v4 as uuidv4 } from 'uuid';

const AuthController = {
  async signUp(req: Request, res: Response, next: NextFunction) {
    try {
      await passport.authenticate(
        'signup',
        { session: false },
        async (err, user, info) => {
          if (err) throw err;
          if (!user) {
            return res.status(400).json({ error: info.message });
          }
          res.json({
            user: mapUserProps(user),
            token: _tokenGeneration(user),
          });
        }
      )(req, res, next);
    } catch (err: any) {
      return res.status(500).json({ error: err.message });
    }
  },
  async signIn(req: Request, res: Response, next: NextFunction) {
    try {
      // NEED TO BE REFACTORED PROPERLY by Oleksandr Poberezhniy
      await passport.authenticate('signin', async (err, user, info) => {
        if (err) {
          const error = new Error('An error occurred.');
          return next(error);
        }

        if (!user) {
          return res.status(400).json({ error: info.message });
        }

        req.login(user, { session: false }, async (error) => {
          if (error) return next(error);
          return res.json({
            user: mapUserProps(user),
            token: _tokenGeneration(user),
          });
        });
      })(req, res, next);
    } catch (err: any) {
      return res.status(500).json({ error: err.message });
    }
  },
  async forgotPassword(req: Request, res: Response) {
    try {
      const { email } = req.body;

      const user = await UserModel.findOne({ email });

      if (!user) {
        return res
          .status(400)
          .json({ error: `User with this email address doesn't exist...` });
      }

      const newPassword = uuidv4();
      user.passwordHash = newPassword;

      await user.save();
      await sendForgotPasswordMail(email, newPassword, user.displayName);
      return res.status(200).json({ ok: true });
    } catch (err: any) {
      return res.status(500).json({ error: err.message });
    }
  },
};

function _tokenGeneration(user: IUser) {
  const body = { _id: user._id, email: user.email };
  const token = tokenGenerator.accessToken(body);

  return token;
}

export default AuthController;
