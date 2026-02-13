export enum Statuses {
  ACTIVE = "ACTIVE",
  BLOCK = "BLOCK",
}

export enum Roles {
  OWNER = "OWNER",
  ADMIN = "ADMIN",
  MODERATOR = "MODERATOR",
  USER = "USER",
}

export type Users = {
  index: number;
  id: string;
  username: string;
  email: string;
  role: Roles;
  createdAt: Date;
  status: Statuses;
}

export type Meta = {
  limit: number;
  page: number;
  total: number;
  totalPages: number;
}

export type SearchValueType =
  | "email"
  | "username"
  | "id"
  | "status"
  | "role"
  | "createdAt";