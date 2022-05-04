import { Response, Request, NextFunction } from 'express';
import passport from '../libs/passport';
import mapUserProps from '../mappers/mapUserProps';
import UserModel, { IUser } from '../models/UserModel';
import tokenGenerator from '../utils/tokenGenerator';

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
        if (err || !user) {
          const error = new Error('An error occurred.');
          return next(error);
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
  async forgotPassword(req: Request, res: Response, next: NextFunction) {
    try {
      // Получить имейл (рек.бади.имейл)
      // const user = await UserModel.findOne({ email });
      // if (!user) {
      //   return res.status(401).json({ error: info.message });
      // }
      // https://www.npmjs.com/package/generate-password
      // юзер.пасвордХеш = пасворд
      // await юзер.save();
      // сендгрид

      await passport.authenticate(
        'signup',
        { session: false },
        async (err: Error, user: IUser, info) => {
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
};

function _tokenGeneration(user: IUser) {
  const body = { _id: user._id, email: user.email };
  const token = tokenGenerator.accessToken(body);

  return token;
}

export default AuthController;
