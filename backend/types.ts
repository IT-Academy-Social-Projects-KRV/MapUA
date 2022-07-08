export type Role = 'admin' | 'user' | 'moderator' | 'bannedUser';
export type User = {
  _id: string;
  role: Role;
};
