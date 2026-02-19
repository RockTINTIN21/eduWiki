export enum ReviewTypeEnum {
  POSITIVE = 'POSITIVE',
  NEGATIVE = 'NEGATIVE',
  NEUTRAL = 'NEUTRAL',
}

export type Review = {
  type: ReviewTypeEnum;
  id: string;
  userId: string;
  avatarUrl: string;
  username: string;
  totalReviews: number;
  createdAt: Date;
  likes: number;
  dislikes: number;
  text: string;
}