"use client";

import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { slice } from "@/features/auth/model/slice";
import { http } from "@/lib/api/http";
import { useAppDispatch } from "@/lib/store/store";
import {fetchLogout} from "@/features/auth/api/auth.requests";

export default function LogoutButton() {
	const dispatch = useAppDispatch();
	const router = useRouter();

	const logout = async () => {
    await dispatch(fetchLogout());

		router.replace("/");
		// router.refresh();
	};

	return <Button onClick={logout}>Выйти</Button>;
}
