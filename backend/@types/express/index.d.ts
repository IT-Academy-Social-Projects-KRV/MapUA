import User from '../../types';

declare module 'express-serve-static-core' {
  export interface Request {
    user?: User;
    t?: Record<any>;
  }
}
