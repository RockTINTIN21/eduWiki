"use client";

import { ReactNode, useState } from "react";
import { HugeiconsIcon } from "@hugeicons/react";
import { ArrowDown01Icon } from "@hugeicons/core-free-icons";

interface AccordionProps {
  className?: string;
  activeTab?: string;
  tabs: {
    title: string;
    key: string;
    children: ReactNode;
  }[];
}

const Accordion = ({ className = "", activeTab, tabs }: AccordionProps) => {
  const [openTab, setOpenTab] = useState<string | null>(activeTab ?? null);

  return (
    <div className={className}>
      {tabs.map((tab) => {
        const isOpen = openTab === tab.key;

        return (
          <div key={tab.key} className="flex flex-col">
            <button
              type="button"
              className="flex justify-between items-center border-b border-black font-medium text-lg py-2"
              onClick={() =>
                setOpenTab((prev) => (prev === tab.key ? null : tab.key))
              }
            >
              {tab.title}
              <HugeiconsIcon
                icon={ArrowDown01Icon}
                className={`transition-transform duration-150 ${
                  isOpen ? "rotate-180" : ""
                }`}
              />
            </button>

            <div
              className={`overflow-hidden transition-all duration-150 ease-in-out ${
                isOpen
                  ? "max-h-[500px] opacity-100"
                  : "max-h-0 opacity-0"
              }`}
            >
              <div className="pt-2">
                {tab.children}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Accordion;
