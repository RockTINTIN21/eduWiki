import Image from "next/image";
import Link from "next/link";

interface CardProps {
  countryName: string;
  bgImage: string;
  countryIcon: string;
  className?: string;
  link: string;
  title?: string;
}

const Card = ({
  countryName,
  bgImage,
  countryIcon,
  className,
  link,
  title
}: CardProps) => {



  return (
    <div className={`${className ? className : ""} flex-none md:flex-auto`}>
      <div className={`overflow-hidden rounded-2xl relative md:h-full`}>
        <Link href={link}>
          <Image
            src={bgImage}
            className="object-cover hover:scale-105 duration-200 z-20 md:w-full md:h-full w-[220px] h-[220px]"
            width={700}
            height={300}
            alt={countryName}
          />
        </Link>
        <div className="flex gap-2 bg-[#F3F3F3] px-4 py-1 rounded-full w-max absolute top-0 m-3 items-center">
          <span className="">{countryName}</span>
          <Image
            src={`https://flagsapi.com/${countryIcon}/flat/64.png`}
            className="w-auto h-[20px]"
            width={20}
            height={20}
            alt={countryName}
          />
        </div>
      </div>
      {title && <p className="pt-2 font-medium text-[#111827] ">{title}</p>}
    </div>
  );
};

export default Card;