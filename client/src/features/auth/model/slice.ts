import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

export type User = {
	id: string;
	username: string;
	email: string;
	avatarUrl: string;
	role: "USER" | "MODERATOR" | "ADMIN" | "OWNER";
  dateOfRegistration: number;
  status: string;
} | null;

export type AuthState = {
	user: User;

	fetchAuthStatus: "idle" | "pending" | "success" | "failed";
};

export type SessionPayload = {
	user: User;
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
