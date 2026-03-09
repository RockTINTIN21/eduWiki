"use client";

import { useEffect } from "react";
import { fetchGetUserInfo } from "@/features/auth/api/auth.requests";
import { isAuth } from "@/lib/cookies";
import { useAppDispatch } from "@/lib/store/store";

export default function AuthBootstrap() {
	const dispatch = useAppDispatch();

	useEffect(() => {
		const getUserInfo = async () => {
			if (await isAuth()) {
				dispatch(fetchGetUserInfo());
			}
		};
		getUserInfo();
	}, [dispatch]);

	return null;
}
