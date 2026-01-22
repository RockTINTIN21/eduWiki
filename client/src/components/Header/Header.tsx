"use client";

import Link from "next/link";
import {HugeiconsIcon} from "@hugeicons/react";
import {Cancel01Icon, Menu01Icon} from "@hugeicons/core-free-icons";
import {useEffect, useState} from "react";
import {usePathname} from "next/navigation";
import AuthDialog from "@/components/Auth/AuthDialog";
import {useAppSelector} from "@/lib/store/store";
import {authSlice} from "@/lib/store/auth/auth.slice";
import {Avatar, AvatarFallback, AvatarImage} from "@/components/ui/avatar";

const Header = () => {
  const [showMenu, setShowMenu] = useState(false);
  const pathname = usePathname();

  const user = useAppSelector((state) => state[authSlice.name].user);
  const accessToken = useAppSelector((state) => state[authSlice.name].accessToken);

  const isAuth = Boolean(accessToken) && Boolean(user); // или user?.id

  useEffect(() => {
    document.body.style.overflow = showMenu ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [showMenu]);

  useEffect(() => {
    setShowMenu(false);
  }, [pathname]);


  const isLanding = pathname === "/aboutUs";

  const links = [
    {
      title: "Главная",
      link: '/'
    },
    {
      title: "Карта мира",
      link: '/map'
    },
    {
      title: "Программы",
      link: '/programs'
    },
    {
      title: "О проекте",
      link: '/aboutUs'
    },
  ]

  return (
    <>
      <header
        className={`${isLanding ? "" : "text-black bg-white"} ${showMenu ? "" : "px-4 pt-4"} absolute z-50 w-full`}
      >
        <div
          className={`justify-between flex md:mx-auto ${
            isLanding
              ? "backdrop-blur-lg bg-gray-800/40 rounded-full w-full py-3 px-5 md:w-[1280px] md:mx-auto"
              : "md:w-[960px]"
          }`}
        >
          <Link
            href="/"
            className={`flex items-center gap-3 ${isLanding ? "text-white" : "text-accent"}`}
          >
            <h3 className="font-medium text-2xl !mb-1">EduWiki</h3>
            <span
              className={`border-s ps-2 text-sm leading-4 ${isLanding ? "border-l-white" : "border-l-accent"}`}
            >
              Учись
              <br />
              глобально
            </span>
          </Link>
          <div className='flex items-center gap-3'>
            {(isAuth && user) && (
              <Link href={'/profile'} className="md:hidden">
                <Avatar className="w-10 h-10">
                  <AvatarImage
                      src={`http://localhost:3000/uploads/${user.avatarUrl}`}
                    alt={user.username}
                  />
                  <AvatarFallback>{user.username[0] + user.username[1]}</AvatarFallback>
                </Avatar>
              </Link>
            )}
            <button className="md:hidden" onClick={() => setShowMenu(true)}>
              <HugeiconsIcon
                className={isLanding ? "text-white" : "text-black"}
                icon={Menu01Icon}
              />
            </button>
          </div>


          <nav
            className={`md:block ${
              showMenu
                ? `${isLanding ? "bg-gray-950" : "bg-white"} absolute top-0 left-0 w-full h-screen flex flex-col justify-between z-50`
                : "hidden"
            }`}
          >
            <div
              className={
                showMenu ? (isLanding ? "px-9 mt-7" : "px-4 pt-4") : ""
              }
            >
              <div className="md:hidden flex justify-between">
                <Link
                  href={"/"}
                  className={`flex justify-center gap-3  ${isLanding ? "text-white" : "text-accent"} `}
                >
                  <h3 className="font-medium text-2xl">EduWiki</h3>
                  <span
                    className={`border-s ps-2 text-sm leading-4 h-[32px] ${isLanding ? "border-l-white" : "border-l-accent"}`}
                  >
                    Учись
                    <br />
                    глобально
                  </span>
                </Link>

                <button onClick={() => setShowMenu(false)}>
                  <HugeiconsIcon
                    className={isLanding ? "text-white" : "text-black"}
                    icon={Cancel01Icon}
                  />
                </button>
              </div>

              <ul
                className={`list-none flex md:gap-10 gap-5 items-center ${
                  showMenu ? "flex-col mt-8" : ""
                }`}
              >
                {links.map((link, index) => (
                  <li
                    key={index}
                    className={`
                  transition duration-100 ease-in-out
                  ${
                    pathname === link.link
                      ? `underline underline-offset-5 ${isLanding ? "text-white" : "text-accent"}`
                      : `underline-offset-5 hover:underline ${
                          isLanding
                            ? "text-gray-200 hover:text-white"
                            : "text-black hover:text-accent"
                        }`
                  }`}
                  >
                    <Link href={link.link}>{link.title}</Link>
                  </li>
                ))}
                <li>
                  {(isAuth && user) ? (
                    <Link href={'/profile'}>
                      <Avatar className="w-10 h-10 text-white">
                        <AvatarImage
                            src={`http://localhost:3000/uploads/${user.avatarUrl}`}
                          alt={user.username}
                        />
                        <AvatarFallback>{user.username[0] + user.username[1]}</AvatarFallback>
                      </Avatar>
                    </Link>
                  ) : <AuthDialog/>}

                </li>
              </ul>
            </div>
          </nav>
        </div>
      </header>
    </>
  );
};

export default Header;