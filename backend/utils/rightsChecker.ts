import { Role } from '../types';
import mongoose from 'mongoose';

export const rightsChecker = (
  userId: string,
  userRole: Role,
  authorId: mongoose.Types.ObjectId
): boolean => {
  return (
    userId === authorId.toString() ||
    userRole === 'moderator' ||
    userRole === 'admin'
  );
};
