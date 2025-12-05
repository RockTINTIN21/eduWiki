import Link from "next/link";
import Image from "next/image";

const Footer = ({isLanding}: {isLanding: boolean}) => {
  return (
    <footer className={isLanding ? 'mt-auto pb-4 text-white w-full md:px-80 px-4 ' : ''}>
      <div className='flex flex-col justify-center items-center gap-4 border-t-white border-t-[0.5px] pt-4'>
        <div className='flex justify-center items-center gap-4'>
          <Link href='/' className={`flex items-center gap-3`}>
            <h3 className='font-medium text-2xl'>edumap</h3>
            <span className='border-l-white border-s-[1px] ps-2 text-sm leading-4'>Учись<br/>глобально</span>
          </Link>
          <Link href='/'>Политика конфиденциальности</Link>
        </div>
        <span className='text-[#CFCFCF]'>©  edumap 2025. Все права защищены.</span>
        <div className='flex gap-4'>
          <Link href='/'>
            <Image src={'/images/icons/telegram.svg'} alt={'tiktok'} width={20} height={20}/>
          </Link>
          <Link href='/'>
            <Image src={'/images/icons/discord.svg'} alt={'tiktok'} width={20} height={20}/>
          </Link>
          <Link href='/'>
            <Image src={'/images/icons/tiktok.svg'} alt={'tiktok'} width={20} height={20}/>
          </Link>
        </div>
      </div>
    </footer>
  );
};

export default Footer;