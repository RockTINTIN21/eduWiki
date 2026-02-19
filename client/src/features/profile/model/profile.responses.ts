import type {UserStats} from "@/features/profile/model/profile.types";
import type {ReviewTypeEnum} from "@/lib/types";

export interface ProfileResponse {
  user: {
    id: string;
    username: string;
    avatarUrl: string;
    stats: UserStats;
  };
  reviews: {
    type: ReviewTypeEnum;
    id: string;
    createdAt: Date;
    likes: number;
    dislikes: number;
    text: string;
    country: {
      name: string;
      ruName: string;
    };
    university?: string;
  }[];
}