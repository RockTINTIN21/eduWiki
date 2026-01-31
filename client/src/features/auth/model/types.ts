export type AuthRefreshResponse = {
	user: {
		role: "USER" | "MODERATOR" | "ADMIN" | "OWNER";
		id: string;
		email: string;
		username: string;
		avatarUrl: string;
	};
};
