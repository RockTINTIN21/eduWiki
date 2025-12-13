"use client";

import Button from "@/components/Button/Button";
import {RefObject, useEffect, useRef, useState} from "react";

interface SidebarNavigation {
  navigationList: {
    title: string;
    id: string;
  }[],

}

const SidebarNavigation = ({navigationList}: SidebarNavigation) => {

  const [list, setList] = useState<HTMLElement[]>([]);
  const [currentBlock, setCurrentBlock] = useState<string>();

  const elements = useRef([]);
  // const observer = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const list = document.querySelectorAll('section[data-section]')
    const htmlArray = Array.from(list) as HTMLElement[];
    console.log('htmlArray', htmlArray)
    setList(htmlArray);
  },[])

  function handleIntersection(entries: any, observer){
    entries.forEach(entry => {
      if(entry.isIntersecting) {
        console.log('Элемент виден', entry.target.id)
        setCurrentBlock(entry.target.id);
      }else{
        console.log('Элемент не виден')
        // setCurrentBlock(entry.target.id);
      }
    })
  }

  const options = {
    root: null, // null - наблюдаем относительно viewport
    rootMargin: '0px', // Отступ от границ viewport
    threshold: 0.9 // Когда элемент пересекается хотя бы на 10%
  };



  useEffect(() => {
    const observer = new IntersectionObserver(handleIntersection, options)
    console.log('вызов1')
    console.log('list:',list)

    list.forEach((elem)=> {
      observer.observe(elem);
    })

  }, [list]);

  useEffect(() => {
    console.log('currentBlock', currentBlock);
  }, [currentBlock]);

  const goToBlockHandler = (id: string) => {
    console.log('goToBlockHandler', list);
    const block = list.find((elem) => elem.id === id);
    if (block) {
      block.scrollIntoView({behavior: 'smooth'});
    }
  }

  return (
    <nav className='fixed'>
      <ul className='md:flex flex-col gap-4'>
        {navigationList.map((item, id) => (
          <li key={id}>
            <Button variant={currentBlock === item.id ? 'primary' : 'secondary'} onClick={() => goToBlockHandler(item.id)} className='w-full' size='sm'>
              {item.title}
            </Button>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default SidebarNavigation;