import {Avatar, AvatarFallback, AvatarImage} from "@/components/ui/avatar";
import {API_UPLOADS_URL} from "@/lib/api/api";

interface UserCardProps {
  avatarUrl?: string;
  username: string;
  stats: {
    countReviews: number;
    countPositives: number;
    countNegatives: number;
    countNeutral: number;
  }
}

const UserCard = ({
  avatarUrl,
  username,
  stats
  }: UserCardProps) => {
  return (
    <div className='flex gap-12'>
      <Avatar className="w-38 h-38 text-white">
        <AvatarImage
          src={`${API_UPLOADS_URL}/${avatarUrl}`}
          alt={username[0] + username[1]}
        />
        <AvatarFallback className='text-4xl'>
          {username[0] + username[1]}
        </AvatarFallback>
      </Avatar>
      <div className='flex flex-col justify-between'>
        <h1 className='text-4xl !font-bold'>{username}</h1>
        <div className='flex gap-8'>
          <div>
            <p className='font-bold text-xl'>{stats.countReviews}</p>
            <span>Рецензий</span>
          </div>
          <div>
            <p className='font-bold text-xl'>{stats.countPositives}</p>
            <span>Положительных</span>
          </div>
          <div>
            <p className='font-bold text-xl'>{stats.countNegatives}</p>
            <span>Отрицательных</span>
          </div>
          <div>
            <p className='font-bold text-xl'>{stats.countNeutral}</p>
            <span>Нейтральных</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserCard;