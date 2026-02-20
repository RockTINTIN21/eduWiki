"use client";

import { toast } from "sonner";
import { apiGuardFetch } from "@/lib/api/api";

interface ReviewCardLikesProps {
	likes: number;
	dislikes: number;
	id: string;
	isOwnCard: boolean;
}

const ReviewCardLikes = ({
	dislikes,
	likes,
	id,
	isOwnCard,
}: ReviewCardLikesProps) => {
	const onSendLike = async () => {
		if (isOwnCard)
			return toast.error("Вы не можете поставить оценку самому себе", {
				position: "top-center",
			});
		try {
			await apiGuardFetch("");
		} catch (e) {
			toast.error("Пожалуйста повторите попытку позже", {
				position: "top-center",
			});
		}
	};

	const onSendDislike = async () => {
		if (isOwnCard)
			return toast.error("Вы не можете поставить оценку самому себе", {
				position: "top-center",
			});
		try {
			await apiGuardFetch("");
		} catch (e) {
			toast.error("Пожалуйста повторите попытку позже", {
				position: "top-center",
			});
		}
	};

	return (
		<div className="pt-2 flex justify-end gap-4">
			<button
				onClick={() => onSendLike()}
				type={"button"}
				className={"bg-[#000000]/5 rounded-full text-[#00A81F] px-4 py-1"}
			>
				Полезно <b className="font-medium text-[#5A5A5A] ps-1">{likes}</b>
			</button>
			<button
				onClick={() => onSendDislike()}
				type={"button"}
				className={"bg-[#000000]/5 rounded-full text-[#C6363C] px-4 py-1"}
			>
				Нет <b className="font-medium text-[#5A5A5A] ps-1">{dislikes}</b>
			</button>
		</div>
	);
};

export default ReviewCardLikes;
