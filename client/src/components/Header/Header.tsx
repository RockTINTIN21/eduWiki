import Link from "next/link";
import Button from "@/components/Button/Button";

interface HeaderProps {
  isLanding?: boolean;
}

const Header = ({isLanding}: HeaderProps) => {
  return (
    <header className={`${isLanding ? 'text-white' : 'text-black'} mt-5 justify-between flex`}>
      <div className='flex items-center gap-3'>
        <h3 className='font-medium text-2xl'>edumap</h3>
        <span className='border-l-white border-s-[1px] ps-2 text-sm leading-4'>Учись<br/>глобально</span>
      </div>
      <nav>
        <ul className='list-none flex gap-10 items-center'>
          <li><Link href={'/'}>О проекте</Link></li>
          <li><Link href={'/'}>Программы</Link></li>
          <li><Link href={'/'}>Страны</Link></li>
          <li><Link href={'/'}>Карта мира</Link></li>
          <li><Button>Войти</Button></li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;