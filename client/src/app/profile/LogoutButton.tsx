"use client";

import { Button } from "@/components/ui/button";
import { apiGuardFetch } from "@/lib/api";
import { useAppDispatch } from "@/lib/store/store";
import { authSlice } from "@/lib/store/auth/auth.slice";
import { useRouter } from "next/navigation";

export default function LogoutButton() {
  const dispatch = useAppDispatch();
  const router = useRouter();

  const logout = async () => {
    await apiGuardFetch("/auth/logout", {
      method: "POST",
    });

    dispatch(authSlice.actions.logout());

    router.replace("/");
    // router.refresh();
  };

  return <Button onClick={logout}>Выйти</Button>;
}