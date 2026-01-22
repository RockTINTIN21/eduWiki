export type CreateUserRepoInput = {
  username: string;
  role: 'USER' | 'MODERATOR' | 'ADMIN' | 'OWNER';
  password: string;
  email: string;
  avatarUrl?: string;
};
