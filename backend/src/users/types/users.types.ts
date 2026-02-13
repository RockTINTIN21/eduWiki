export type SearchLabelsTypes =
  | 'createdAt'
  | 'email'
  | 'username'
  | 'role'
  | 'status';

export interface GetUsersInput {
  page?: number;
  limit?: number;
  label?: SearchLabelsTypes;
  value?: string;
}

export interface CreateUserInputService {
  email: string;
  password: string;
  username: string;
  avatar?: Express.Multer.File;
}
