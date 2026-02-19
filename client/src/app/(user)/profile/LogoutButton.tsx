"use client";

import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { apiGuardFetch } from "@/lib/api/api";
import { slice } from "@/features/auth/model/slice";
import { useAppDispatch } from "@/lib/store/store";

export default function LogoutButton() {
	const dispatch = useAppDispatch();
	const router = useRouter();

	const logout = async () => {
		await apiGuardFetch("/auth/logout", {
			method: "POST",
		});

		dispatch(slice.actions.logout());

		router.replace("/");
		// router.refresh();
	};

	return <Button onClick={logout}>Выйти</Button>;
}
