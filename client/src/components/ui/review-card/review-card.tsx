import { format } from "date-fns";
import { ru } from "date-fns/locale";
import type { ComponentType, ReactElement } from "react";
import type { ProfileReviewHeaderProps } from "@/components/ui/review-card/profile-review-card-header";
import type { ReviewHeaderProps } from "@/components/ui/review-card/review-card-header";
import { ReviewTypeEnum } from "@/lib/types";
import ReviewCardLikes from "@/components/ui/review-card/review-card-likes";

interface ReviewCardProps {
  id: string;
  type: ReviewTypeEnum;
  createdAt: Date;
  likes: number;
  dislikes: number;
  text: string;
  isOwnCard: boolean;

	children:
		| ReactElement<ProfileReviewHeaderProps>
		| ReactElement<ReviewHeaderProps>;
}

const ReviewCard = ({
    id,
    type,
    createdAt,
    dislikes,
    likes,
    text,
    isOwnCard,
    children,
}: ReviewCardProps) => {
	const reviewBgColorMap = {
		[ReviewTypeEnum.NEGATIVE]: "bg-[#FF0000]/8",
		[ReviewTypeEnum.POSITIVE]: "bg-[#EBF7EB]",
		[ReviewTypeEnum.NEUTRAL]: "bg-[#F5F5F5]",
	};

	return (
		<div className={`p-5 mt-3 rounded-2xl ${reviewBgColorMap[type]}`}>
			<div className="flex justify-between items-center">
				{children}
				<span className="text-[#5A5A5A]">
					{format(
						createdAt,
						new Date(createdAt).getFullYear() === new Date().getFullYear()
							? "dd MMMM в HH:MM"
							: "dd MMMM yyyy в HH:MM",
						{ locale: ru },
					)}
				</span>
			</div>
			<p className="pt-3">{text}</p>
      <ReviewCardLikes dislikes={dislikes} likes={likes} id={id} isOwnCard={isOwnCard} />
		</div>
	);
};

export default ReviewCard;
