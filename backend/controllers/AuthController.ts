import { Response, Request, NextFunction } from 'express';
import passport from '../libs/passport';
import jwt from 'jsonwebtoken';
import mapUserProps from '../mappers/mapUserProps';
import UserModel, { IUser } from '../models/UserModel';
import tokenGenerator from '../utils/tokenGenerator';
import { sendForgotPasswordMail } from '../libs/mailtrap';
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
            return res
              .status(400)
              .json({ error: req.t('user_not_exist'), info });
          }
          res.json({
            user: mapUserProps(user),
            token: _tokenGeneration(user)
          });
        }
      )(req, res, next);
    } catch (err: any) {
      return res.status(500).json({ error: req.t('server_error'), err });
    }
  },
  async signIn(req: Request, res: Response, next: NextFunction) {
    try {
      await passport.authenticate('signin', async (err, user, info) => {
        if (err) throw err;
        if (!user) {
          return res.status(400).json({ error: req.t('user_not_exist'), info });
        }
        req.login(user, { session: false }, async error => {
          if (error) return next(error);
          return res.json({
            user: mapUserProps(user),
            token: _tokenGeneration(user)
          });
        });
      })(req, res, next);
    } catch (err: any) {
      return res.status(500).json({ error: req.t('server_error'), err });
    }
  },
  async googleLoginCallback(req: Request, res: Response) {
    console.log(req.user);
    if (!req.user) {
      return res
        .status(400)
        .json({ error: req.t('user_not_exist'), success: false });
    }
    return res.json({
      user: mapUserProps(req.user as IUser),
      token: _tokenGeneration(req.user as IUser)
    });
  },
  async forgotPassword(req: Request, res: Response) {
    try {
      const { email } = req.body;

      const user = await UserModel.findOne({ email });

      if (!user) {
        return res.status(400).json({
          error: req.t('user_not_exist'),
          success: false
        });
      }

      const newPassword = uuidv4();
      user.passwordHash = newPassword;

      await user.save();

      const isOk = await sendForgotPasswordMail(email, newPassword);
      if (!isOk) {
        return res.status(400).json({
          error: req.t('password_send_error'),
          success: false
        });
      }

      return res
        .status(200)
        .json({ success: true, message: req.t('password_send_success') });
    } catch (err: any) {
      return res
        .status(500)
        .json({ error: req.t('server_error'), success: false, err });
    }
  },
  async signInFacebook(req: Request, res: Response) {
    if (!req.user) {
      return res
        .status(400)
        .json({ error: req.t('user_not_exist'), success: false });
    }
    return res.json({
      user: mapUserProps(req.user as IUser),
      token: _tokenGeneration(req.user as IUser)
    });
  },
  async checkJwt(req: Request, res: Response) {
    const token = req.headers['authorization']?.split(' ')?.[1];

    if (!token) {
      return res
        .status(400)
        .json({ error: req.t('token_not_provided'), success: false });
    }

    jwt.verify(token, `${process.env.ACCESS_TOKEN_SECRET}`, (err, decoded) => {
      if (err) {
        if (err instanceof jwt.TokenExpiredError) {
          return res.status(400).json({
            error: req.t('token_expired'),
            err,
            success: false
          });
        } else if (err instanceof jwt.JsonWebTokenError) {
          return res.status(400).json({
            error: req.t('token_malformed'),
            success: false
          });
        } else {
          return res.status(400).json({
            error: req.t('token_invalid'),
            success: false
          });
        }
      }

      return res.json({ message: req.t('token_valid'), success: true });
    });
  }
};

function _tokenGeneration(user: IUser) {
  const body = { _id: user._id, email: user.email };
  const token = tokenGenerator.accessToken(body);

  return token;
}

export default AuthController;
