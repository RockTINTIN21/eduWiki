import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { API_UPLOADS_URL } from "@/lib/api/api";

interface UserCardProps {
	avatarUrl?: string;
	username: string;
	isOwnProfile: boolean;
	stats: {
		countReviews: number;
		countPositive: number;
		countNegative: number;
		countNeutral: number;
	};
}

const UserCard = ({ avatarUrl, username, stats, isOwnProfile }: UserCardProps) => {
	return (
		<div className="flex flex-col md:flex-row md:gap-12 gap-4 items-center md:items-start">
			<div className="flex flex-col items-center gap-4">
				<Avatar className="w-38 h-38 text-white">
					<AvatarImage
						src={`${API_UPLOADS_URL}/${avatarUrl}`}
						alt={username[0] + username[1]}
					/>
					<AvatarFallback className="text-4xl">
						{username[0] + username[1]}
					</AvatarFallback>
				</Avatar>

        {isOwnProfile &&
          <Button variant="secondary" className="px-8 w-full md:w-max">
            Редактировать профиль
          </Button>
        }
			</div>

			<div className="flex flex-col justify-between text-center gap-2 md:text-start">
				<h1 className="text-3xl md:text-start md:text-4xl !font-bold">
					{username}
				</h1>
				<div className="grid grid-cols-2 sm:grid-cols-4 sm:gap-6">
					<div>
						<p className="font-bold text-xl">{stats.countReviews}</p>
						<span>Рецензий</span>
					</div>
					<div>
						<p className="font-bold text-xl">{stats.countPositive}</p>
						<span>Положительных</span>
					</div>
					<div>
						<p className="font-bold text-xl">{stats.countNegative}</p>
						<span>Отрицательных</span>
					</div>
					<div>
						<p className="font-bold text-xl">{stats.countNeutral}</p>
						<span>Нейтральных</span>
					</div>
				</div>
			</div>
		</div>
	);
};

export default UserCard;
