import Link from "next/link";

export interface ProfileReviewHeaderProps {
  country: {
    ruName: string;
    name: string;
  },
  university?: string;
}

const ProfileReviewCardHeader = ({
  country,
  university,
}: ProfileReviewHeaderProps) => {

  return (
    <div className='space-x-4'>
      <Link href={`/${country.name}`} className="bg-[#000000]/5 rounded-full px-4 py-1 hover:bg-[#000000]/10">
        {country.ruName}
      </Link>
      {university &&
        <Link href={`${country.name}/${university}`} className="bg-[#000000]/5 rounded-full px-4 py-1 hover:bg-[#000000]/10">
          {university}
        </Link>
      }
    </div>
  );
};

export default ProfileReviewCardHeader;