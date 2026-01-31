"use client";

import { type ReactNode, useState } from "react";
import {Button} from "@/components/ui/button";


interface TabsProps {
	items: {
		key: string;
		label: string;
		children: ReactNode;
	}[];
}

const Tabs = ({ items }: TabsProps) => {
	const [activeTab, setActiveTab] = useState(items[0].key);

	return (
		<div className="flex flex-col gap-2">
			<div className="flex gap-2 overflow-x-auto md:overflow-x-hidden">
				{items.map((tab) => (
					<Button
						className="px-4 w-full"
						key={tab.key}
						variant={activeTab === tab.key ? "default" : "secondary"}
						onClick={() => setActiveTab(tab.key)}
					>
						{tab.label}
					</Button>
				))}
			</div>
			<div className="flex flex-col gap-4">
				{items[items.findIndex((item) => item.key === activeTab)].children}
			</div>
		</div>
	);
};

export default Tabs;
