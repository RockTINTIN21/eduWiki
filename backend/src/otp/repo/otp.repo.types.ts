export type OtpType = 'REGISTRATION' | 'PASSWORD_RESET' | 'EMAIL_CHANGE';

export type CreateVerificationCodeRepoInput = {
  hashedCode: string;
  email: string;
  expirationTime: Date;
  type: OtpType;
};
