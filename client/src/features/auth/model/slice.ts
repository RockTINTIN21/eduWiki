import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

export type User = {
	id: string;
	username: string;
	email: string;
	avatarUrl: string;
	role: "USER" | "MODERATOR" | "ADMIN" | "OWNER";
} | null;

export type AuthState = {
	user: User;
	accessToken: string;
	fetchAuthStatus: "idle" | "pending" | "success" | "failed";
};

export type SessionPayload = {
	user: User;
	accessToken: string;
};

const initialAuthState: AuthState = {
	user: null,
	accessToken: "",
	fetchAuthStatus: "idle",
};

export const slice = createSlice({
	name: "auth",
	initialState: initialAuthState,
	selectors: {
		getUser: (state) => state.user,
		getAccessToken: (state) => state.accessToken,
	},
	reducers: {
		fetchAuthSuccess: (state, action: PayloadAction<SessionPayload>) => {
			state.user = action.payload.user;
			state.fetchAuthStatus = "success";
			state.accessToken = action.payload.accessToken;
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
			state.accessToken = "";
		},
	},
});
