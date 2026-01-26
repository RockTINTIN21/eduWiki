"use client";

import { useEffect } from "react";
import { fetchRefresh } from "@/components/Auth/fetch-auth";
import { useAppDispatch } from "@/lib/store/store";

export default function AuthBootstrap() {
	const dispatch = useAppDispatch();

	useEffect(() => {
		dispatch(fetchRefresh());
	}, [dispatch]);

	return null;
}
