import { Response, Request, NextFunction } from 'express';
import UserModel from '../models/UserModel';
import { Role } from '../types';

const RoleChecker = {
  restrictTo(...roles: Role[]) {
    return async (req: Request, res: Response, next: NextFunction) => {
      const { role } = req.user;

      if (!roles.includes(role)) {
        return res.status(403).json({ error: req.t('forbidden_role_action') });
      }
      next();
    };
  }
};

export default RoleChecker;
