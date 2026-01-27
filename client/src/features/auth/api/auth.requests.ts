import { AUTH_ENDPOINTS } from "@/features/auth/api/auth.endpoints";
import { slice, type User } from "@/features/auth/model/slice";
import type { AuthRefreshResponse } from "@/features/auth/model/types";
import { apiFetch, apiGuardFetch } from "@/lib/api";
import type { AppThunk } from "@/lib/store/store";

export const fetchRefresh =
	(): AppThunk =>
	(dispatch, getState, {}) => {
		dispatch(slice.actions.fetchAuthPending());
		apiGuardFetch<AuthRefreshResponse>(AUTH_ENDPOINTS.refresh, {
			method: "GET",
		})
			.then((res) => {
				dispatch(
					slice.actions.fetchAuthSuccess({
						accessToken: res.accessToken,
						user: res.user,
					}),
				);
			})
			.catch(() => {
				dispatch(slice.actions.fetchAuthFailed());

				// throw new Error("Cannot find refresh token", error)
			});
	};

export const fetchLogin =
	(data: any): AppThunk<Promise<void>> =>
	async (dispatch) => {
		dispatch(slice.actions.fetchAuthPending());

		try {
			const res = await apiFetch<{ accessToken: string; user: User }>(
				AUTH_ENDPOINTS.login,
				{
					method: "POST",
					json: data,
				},
			);

			dispatch(
				slice.actions.fetchAuthSuccess({
					accessToken: res.accessToken,
					user: res.user,
				}),
			);
		} catch (e) {
			dispatch(slice.actions.fetchAuthFailed());
			throw e;
		}
	};
