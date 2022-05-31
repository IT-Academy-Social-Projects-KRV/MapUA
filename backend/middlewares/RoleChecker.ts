import { Response, Request, NextFunction } from 'express';
import UserModel from '../models/UserModel';

const RoleChecker = {
  restrictTo(...roles: Array<string>) {
    return async (req: Request, res: Response, next: NextFunction) => {
      const userId = req.user;
      const user = await UserModel.findById(userId).select('role');

      if (user) {
        if (!roles.includes(user.role)) {
          return res
            .status(403)
            .json({ error: req.t('forbidden_role_action') });
        }
        next();
      } else {
        return res.status(400).json({ error: req.t('user_not_exist') });
      }
    };
  }
};

export default RoleChecker;
