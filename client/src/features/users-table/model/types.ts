export interface UsersTable {
  role: "USER" | "MODERATOR" | "ADMIN" | "OWNER";
  id: string;
  email: string;
  username: string;
}