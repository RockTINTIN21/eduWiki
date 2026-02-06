import { $Enums } from '@prisma/client';

export type CreateUserRepoInput = {
  username: string;
  role: 'USER' | 'MODERATOR' | 'ADMIN' | 'OWNER';
  password: string;
  email: string;
  avatarUrl?: string;
};

export type GetUsersRepoInput = {
  id: string;
  username: string;
  email: string;
  createdAt: Date | null;
  status: $Enums.UserStatusEnum;
  role: string;
}