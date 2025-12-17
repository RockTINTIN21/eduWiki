"use client";

import {HugeiconsIcon} from "@hugeicons/react";
import {ArrowUp01Icon} from "@hugeicons/core-free-icons";
import {useEffect, useState} from "react";
import {usePathname} from "next/navigation";

const Anchor = () => {

  const [showAnchor, setShowAnchor] = useState(false);

  const isLanding = usePathname() === "/aboutUs";

  useEffect(()=>{
    window.addEventListener("scroll", function() {
      if(window.scrollY > 400) {
        setShowAnchor(true);
      }else{
        setShowAnchor(false);
      }
    })
  }, [])

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  }

  return (
    <div className="fixed bottom-6 right-6 z-30">
      {showAnchor &&
        <button onClick={() => scrollToTop()} className="bg-accent-active rounded-full p-2 cursor-pointer
        hover:bg-accent">
          <HugeiconsIcon className='text-white' icon={ArrowUp01Icon} width={30} height={30} />
        </button>
      }

    </div>
  );
};

export default Anchor;