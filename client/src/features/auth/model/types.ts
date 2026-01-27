export type AuthRefreshResponse = {
	accessToken: string;
	user: {
		role: "USER" | "MODERATOR" | "ADMIN" | "OWNER";
		id: string;
		email: string;
		username: string;
		avatarUrl: string;
	};
};
