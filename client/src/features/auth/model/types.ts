export type AuthRefreshResponse = {
	user: {
		role: "USER" | "MODERATOR" | "ADMIN" | "OWNER";
		id: string;
		email: string;
		username: string;
		avatarUrl: string;
	};
};

export type User = {
  id: string;
  username: string;
  email: string;
  avatarUrl: string;
  role: "USER" | "MODERATOR" | "ADMIN" | "OWNER";
  dateOfRegistration: number;
  status: string;
}