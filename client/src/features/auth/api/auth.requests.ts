import { redirect } from "next/navigation";
import { toast } from "sonner";
import { slice } from "@/features/auth/model/slice";
import type { User } from "@/features/auth/model/types";
import { AUTH_ENDPOINTS } from "@/lib/api/endpoints/auth.endpoints";
import { PRIVATE_ENDPOINTS } from "@/lib/api/endpoints/private.endpoints";
import { errorMessages } from "@/lib/api/error-messages";
import { ApiError, http } from "@/lib/api/http";
import { API_URL } from "@/lib/constants";
import { clearAuthCookies } from "@/lib/cookies";
import type { AppThunk } from "@/lib/store/store";

export const fetchGetUserInfo =
	(): AppThunk =>
	// biome-ignore lint/correctness/noEmptyPattern: <explanation>
	async (dispatch, getState, {}) => {
		dispatch(slice.actions.fetchAuthPending());
		try {
			const res = await http.get<User>(PRIVATE_ENDPOINTS.me);

			if (res) {
				dispatch(slice.actions.fetchAuthSuccess({ user: res }));
			}
		} catch (e) {
			dispatch(slice.actions.fetchAuthFailed());
			if (e instanceof ApiError) {
				toast.error(errorMessages[e.code]);
				dispatch(slice.actions.logout());
			}
		}
	};

export const fetchLogin =
	(data: any): AppThunk<Promise<void>> =>
	async (dispatch) => {
		dispatch(slice.actions.fetchAuthPending());

		try {
			const res = await http.post<User>(AUTH_ENDPOINTS.login, { json: data });

      dispatch(slice.actions.fetchAuthSuccess({ user: res }));
		} catch (e) {
			dispatch(slice.actions.fetchAuthFailed());
			throw e;
		}
	};

export const fetchLogout = (): AppThunk<Promise<void>> => async (dispatch) => {
	dispatch(slice.actions.fetchAuthPending());

	try {
		const res = await fetch(`${API_URL}/auth/logout`, {
			method: "POST",
			credentials: "include",
		});
		if (!res.ok) {
			throw new Error();
		}
	} catch {
		await clearAuthCookies();
	}

	dispatch(slice.actions.logout());
	redirect("/");
};
