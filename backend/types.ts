export type Role = 'admin' | 'user' | 'moderator';
export type User = {
    _id: string,
    role: Role
}
