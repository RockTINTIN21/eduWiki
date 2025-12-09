"use client";

import Link from "next/link";
import Button from "@/components/Button/Button";
import {HugeiconsIcon} from "@hugeicons/react";
import {Cancel01Icon, Menu01Icon} from "@hugeicons/core-free-icons";
import {useEffect, useState} from "react";
import {usePathname} from "next/navigation";


const Header = () => {
  const [showMenu, setShowMenu] = useState(false);

  useEffect(() => {
    document.body.style.overflow = showMenu ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [showMenu]);

  const isLanding = usePathname() === "/aboutUs";

  const links = [
    {
      title: "Главная",
      link: '/'
    },
    {
      title: "Карта мира",
      link: '/'
    },
    {
      title: "Программы",
      link: '/'
    },
    {
      title: "О проекте",
      link: '/aboutUs'
    },
  ]

  return (
    <header className={`${!isLanding ? 'text-black' : 'md:px-80'} ${!showMenu && 'px-4 mt-4'} absolute z-30 w-full`}>
      <div className={`${isLanding ? ' backdrop-blur-lg bg-gray-800/40 rounded-full w-full py-3 px-5' : ' md:mx-auto md:w-6/12'} 
      justify-between flex`}>
        <Link href='/' className={`flex items-center gap-3 ${isLanding ? 'text-white' : 'text-accent'}`}>
          <h3 className='font-medium text-2xl'>edumap</h3>
          <span className={` border-s-[1px] ps-2 text-sm leading-4 ${isLanding ? 'border-l-white' : 'border-l-accent'}`}>
            Учись<br/>глобально
          </span>
        </Link>
        <button className='md:hidden' onClick={() => setShowMenu(true)}>
          <HugeiconsIcon icon={Menu01Icon}/>
        </button>

        <nav
          className={`md:block ${
            showMenu
              ? 'bg-gray-950 absolute top-0 left-0 w-full h-screen flex flex-col justify-between z-30'
              : 'hidden'
          }`}
        >
          <div className={showMenu ? 'px-9 mt-7' : ''}>
            <div className="md:hidden flex justify-between">
              <Link href={'/'} className="flex justify-center gap-3 text-white">
                <h3 className="font-medium text-2xl">edumap</h3>
                <span className="border-l-white border-s-[1px] ps-2 text-sm leading-4">
                  Учись<br />глобально
                </span>
              </Link>

              <button onClick={() => setShowMenu(false)}>
                <HugeiconsIcon icon={Cancel01Icon} />
              </button>
            </div>

            <ul
              className={`list-none flex md:gap-10 gap-5 items-center ${
                showMenu ? 'flex-col mt-8' : ''
              }`}
            >
              {links.map((link, index) => (
                <li key={index} 
                  className={`${isLanding ? 'text-gray-200 hover:text-white hover:underline hover:underline-offset-5' 
                    : 'hover:'} 
                    transition duration-200 ease-in-out `}>
                  <Link href={link.link}>{link.title}</Link></li>
              ))}
              <li><Button className={'px-16 md:px-8'}>Войти</Button></li>

            </ul>
          </div>

        </nav>
      </div>


    </header>
  );
};

export default Header;