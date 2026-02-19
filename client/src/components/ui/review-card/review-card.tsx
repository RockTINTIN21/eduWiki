import { format } from "date-fns";
import { ru } from "date-fns/locale";
import type { ComponentType, ReactElement } from "react";
import type { ProfileReviewHeaderProps } from "@/components/ui/review-card/profile-review-card-header";
import type { ReviewHeaderProps } from "@/components/ui/review-card/review-card-header";
import { ReviewTypeEnum } from "@/lib/types";

interface ReviewCardProps {
  id: string;
  type: ReviewTypeEnum;
  createdAt: Date;
  likes: number;
  dislikes: number;
  text: string;
  
	children:
		| ReactElement<ProfileReviewHeaderProps>
		| ReactElement<ReviewHeaderProps>;
}

const ReviewCard = ({id, type, createdAt, dislikes, likes, text ,
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
			<div className="pt-2 flex justify-end gap-4">
				<button
					type={"button"}
					className={"bg-[#000000]/5 rounded-full text-[#00A81F] px-4 py-1"}
				>
					Полезно <b className="font-medium text-[#5A5A5A] ps-1">{likes}</b>
				</button>
				<button
					type={"button"}
					className={"bg-[#000000]/5 rounded-full text-[#C6363C] px-4 py-1"}
				>
					Нет <b className="font-medium text-[#5A5A5A] ps-1">{dislikes}</b>
				</button>
			</div>
		</div>
	);
};

export default ReviewCard;
