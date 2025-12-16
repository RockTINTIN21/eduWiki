"use client";

import Button from "@/components/Button/Button";
import {useEffect, useLayoutEffect, useRef, useState} from "react";

interface SidebarNavigation {
  navigationList: {
    title: string;
    id: number;
  }[],

}

const SidebarNavigation = ({navigationList}: SidebarNavigation) => {

  const sectionsRef = useRef<HTMLElement[]>([]);

  const [currentId, setCurrentId] = useState<number>();
  const [progress, setProgress] = useState<number>(20);


  useEffect(() => {
    sectionsRef.current = Array.from(
      document.querySelectorAll<HTMLElement>('section[data-section]')
    );
  }, []);

  useEffect(() => {
    if (!sectionsRef.current.length) return;

    const observer = new IntersectionObserver((entries)=>{
      entries.forEach((entry, index) => {
        if(entry.isIntersecting) {
          setCurrentId(Number(entry.target.id));
        }
      })
    }, 
    {
      root: null,
      rootMargin: '-50% 0px -50% 0px',
      threshold: 0
    });

    sectionsRef.current.forEach(section => {observer.observe(section);});

    return () => observer.disconnect();
  }, []);

  const goToBlockHandler = (id: number) => {
    const block = sectionsRef.current.find((elem) => Number(elem.id) === id);
    if (block) {
      console.log('goToBlockHandler', id);
      block.scrollIntoView({behavior: 'smooth', block: 'start', inline: 'start', });
    }
  }

  useLayoutEffect(() => {
    if (currentId == null) return;

    const currentIndex = navigationList.findIndex(
      (item) => item.id === currentId
    );

    if (currentIndex === -1) return;

    const total = navigationList.length;
    const startOffset = 20;
    const percent = startOffset + (currentIndex / (total - 1)) * (100 - startOffset);

    requestAnimationFrame(() => {
      setProgress(percent);
    });
  }, [currentId, navigationList]);


  return (
    <nav className='sticky top-0 left-4 right-4 md:left-auto md:right-auto flex gap-3 z-40 h-max bg-white md:bg-transparent py-2'>
      <div className='bg-[#f5f5f5] w-[4px] rounded-full ms-[2px] hidden md:block'>
        <div className={`bg-accent w-[4px] rounded-full transition-all duration-300`} style={{height:`${progress}%`}}/>
      </div>
      <ul className='flex md:flex-col gap-4 overflow-x-auto flex-nowrap'>
        {navigationList.map((item, id) => (
          <li key={id} className='flex gap-2 flex-none'>
            {item.id === currentId && <div className={`w-2 h-2 rounded-full bg-accent mt-3 left-0 hidden md:absolute md:block`}/>}

            <Button variant={currentId === item.id ? 'primary' : 'secondary'}
              onClick={() => goToBlockHandler(item.id)}
              className='md:w-full min-w-[120px] px-7' size='sm'>
              {item.title}
            </Button>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default SidebarNavigation;