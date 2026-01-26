"use client";

import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { apiGuardFetch } from "@/lib/api";
import { authSlice } from "@/lib/store/auth/auth.slice";
import { useAppDispatch } from "@/lib/store/store";

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
