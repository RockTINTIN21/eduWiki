import {HugeiconsIcon, HugeiconsIconProps} from "@hugeicons/react";

export interface PromoCardProps {
  icon: HugeiconsIconProps['icon'];
  title: string;
  description: string;
  isShortCard?: boolean;
}

const PromoCard = ({icon, title, description, isShortCard}: PromoCardProps) => {
  return (
    <div
      className={`backdrop-blur-md w-full bg-gray-800/50 rounded-4xl px-6 flex items-center gap-4
      ${isShortCard === false ? 'flex-col items-start py-6' : 'py-3'}
      `}
    >
      <HugeiconsIcon className={isShortCard === false ? 'text-accent' : 'text-white'}
        width={isShortCard === false ? 40 : 25}
        height={isShortCard === false ? 40 : 25}
        icon={icon}/>
      <div className={isShortCard === false ? 'flex flex-col gap-2 pb-12' : ''}>
        <p className={`font-medium ${isShortCard === false ? 'text-xl' : ' text-md'}`}>{title}</p>
        <span className={` whitespace-pre-line ${isShortCard === false ? 'text-md' : 'text-sm'}`}>{description}</span>
      </div>
    </div>
  );
};

export default PromoCard;