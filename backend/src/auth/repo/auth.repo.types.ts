export type CreateVerificationCodeRepoInput = {
  hashedCode: string;
  email: string;
  expirationTime: Date;
};
