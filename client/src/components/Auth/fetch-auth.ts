import { apiFetch, apiGuardFetch} from "@/lib/api";
import { authSlice, User } from "@/lib/store/auth/auth.slice";
import { AppThunk } from "@/lib/store/store";
import {AuthRefreshResponse} from "@/lib/store/auth/auth.type";
import {AUTH_ENDPOINTS} from "@/lib/api-endpoints/auth";

export const fetchRefresh = (): AppThunk => (dispatch, getState, {}) => {
  dispatch(authSlice.actions.fetchAuthPending());
  apiGuardFetch<AuthRefreshResponse>(AUTH_ENDPOINTS.refresh, {
    method: "GET",
  })
    .then((res)=>{
      dispatch(authSlice.actions.fetchAuthSuccess({
        accessToken: res.accessToken,
        user: res.user
      }));
    })
    .catch(() => {
      dispatch(authSlice.actions.fetchAuthFailed());

      // throw new Error("Cannot find refresh token", error)
    })
}

export const fetchLogin =
  (data: any): AppThunk<Promise<void>> =>
    async (dispatch) => {
      dispatch(authSlice.actions.fetchAuthPending());

      try {
        const res = await apiFetch<{accessToken: string, user: User}>(AUTH_ENDPOINTS.login, {
          method: "POST",
          json: data,
        });

        dispatch(
          authSlice.actions.fetchAuthSuccess({
            accessToken: res.accessToken,
            user: res.user,
          })
        );
      } catch (e) {
        dispatch(authSlice.actions.fetchAuthFailed());
        throw e;
      }
    };