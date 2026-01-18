"use client";

import { Provider } from "react-redux";

import { ReactNode } from "react";
import { store } from "@/lib/store/store";
import AuthBootstrap from "@/app/AuthBootstrap";

export default function StoreProvider({ children }: { children: ReactNode }) {
  return <Provider store={store}><AuthBootstrap />{children}</Provider>;
}
