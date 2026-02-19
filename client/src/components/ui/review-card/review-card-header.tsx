import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { API_UPLOADS_URL } from "@/lib/api/api";


export interface ReviewHeaderProps {
	avatarUrl: string;
	username: string;
	totalReviews: number;
}

const ReviewCardHeader = ({
	avatarUrl,
	username,
	totalReviews,
}: ReviewHeaderProps) => {
	return (
		<div>
			<div className="flex items-center gap-2 pb-1">
				<Avatar className="w-8 h-8 text-white">
					<AvatarImage
						src={`${API_UPLOADS_URL}/${avatarUrl}`}
						alt={username[0] + username[1]}
					/>
					<AvatarFallback className="text-[8px]">
						{username[0] + username[1]}
					</AvatarFallback>
				</Avatar>
				<p className="font-medium">{username}</p>
			</div>
			{!!totalReviews && (
				<span className="text-[#5A5A5A]">{totalReviews} рецензий</span>
			)}
		</div>
	);
};

export default ReviewCardHeader;
