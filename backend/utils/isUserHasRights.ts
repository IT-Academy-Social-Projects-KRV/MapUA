import { Role } from '../types';

export const isUserHasRights = (
  userId: string,
  userRole: Role,
  itemId: string
): boolean => {
  return userId === itemId || userRole === 'moderator' || userRole === 'admin';
};
