"use client";

import type { ReactNode } from "react";
import { Provider } from "react-redux";
import AuthBootstrap from "@/app/AuthBootstrap";
import { store } from "@/lib/store/store";

export default function StoreProvider({ children }: { children: ReactNode }) {
	return (
		<Provider store={store}>
			<AuthBootstrap />
			{children}
		</Provider>
	);
}
