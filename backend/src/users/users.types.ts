export interface CreateUserInputService {
  email: string;
  password: string;
  username: string;
  avatar?: Express.Multer.File;
}
