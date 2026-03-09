import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { User } from "@/features/auth/model/types";

export type StateUser = User | null;

export type AuthState = {
	user: StateUser;
	fetchAuthStatus: "idle" | "pending" | "success" | "failed";
};

export type SessionPayload = {
	user: StateUser;
};

const initialAuthState: AuthState = {
	user: null,
	fetchAuthStatus: "idle",
};

export const slice = createSlice({
	name: "auth",
	initialState: initialAuthState,
	selectors: {
		getUser: (state) => state.user,
	},
	reducers: {
		fetchAuthSuccess: (state, action: PayloadAction<SessionPayload>) => {
			state.user = action.payload.user;
			state.fetchAuthStatus = "success";
		},
		fetchAuthPending(state) {
			state.fetchAuthStatus = "pending";
		},
		fetchAuthFailed(state) {
			state.fetchAuthStatus = "failed";
		},
		logout(state) {
			state.fetchAuthStatus = "success";
			state.user = null;
		},
	},
});
