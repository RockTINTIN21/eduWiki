"use client";

import { useEffect, useState } from "react";
import { useDebounce } from "use-debounce";
import { slice, type User } from "@/features/auth/model/slice";
import UsersTable from "@/features/users-table/ui/UsersTable";
import { apiGuardFetch } from "@/lib/api";
import { useAppSelector } from "@/lib/store/store";

const Page = () => {
	const user = useAppSelector((state) => state[slice.name].user);

	const [users, setUsers] = useState<User[]>([]);
	const [searchValue, setSearchValue] = useState<string>("");
	const value = useDebounce(searchValue, 500);

	const getUsers = async () => {
		// const data = await apiGuardFetch<User[]>(USERS_ENDPOINTS.getAllUsers)
		// setUsers(data)
		const data = await apiGuardFetch("/users/", {
			method: "GET",
		});
		setUsers(data);
	};

	useEffect(() => {
		if (user) {
			getUsers();
		}
	}, [user]);

	// const users: User[] = [
	// 	{
	// 		id: "9b7d2b0c-2e6e-4b1a-9c9e-0b7a7f9e1a01",
	// 		username: "RockTINTIN21",
	// 		email: "sashalexjr@gmail.com",
	// 		status: "Активен",
	// 		role: "USER",
	//     avatarUrl: '',
	// 		dateOfRegistration: Date.now(),
	// 	},
	// 	{
	// 		id: "f2c1a6b9-7b44-4d9f-9f1c-2d3c8e1a0b12",
	// 		username: "alex_dev",
	// 		email: "alex.dev@mail.com",
	// 		status: "Активен",
	//     role: "USER",
	// 		dateOfRegistration: Date.now() - 1000 * 60 * 60 * 24 * 3,
	//     avatarUrl: '',
	// 	},
	// 	{
	// 		id: "a4e7d0b3-8c2a-4c5f-9a9a-1f2d6c7e8b23",
	// 		username: "ivan_petrov",
	// 		email: "ivan.petrov@mail.com",
	// 		status: "Заблокирован",
	//     role: "USER",
	// 		dateOfRegistration: Date.now() - 1000 * 60 * 60 * 24 * 7,
	//     avatarUrl: '',
	// 	},
	// 	{
	// 		id: "c9b1e2f3-4a5d-4c8e-8f7b-3d1a9e0b2c34",
	// 		username: "frontend_girl",
	// 		email: "frontend.girl@mail.com",
	// 		status: "Активен",
	//     role: "USER",
	// 		dateOfRegistration: Date.now() - 1000 * 60 * 60 * 24 * 10,
	//     avatarUrl: '',
	// 	},
	// 	{
	// 		id: "7a6d5c4b-3e2f-4b9a-8d1c-0f9e2a3b4c45",
	// 		username: "backend_boss",
	// 		email: "backend.boss@mail.com",
	// 		status: "Активен",
	//     role: "USER",
	// 		dateOfRegistration: Date.now() - 1000 * 60 * 60 * 24 * 14,
	//     avatarUrl: '',
	// 	},
	// 	{
	// 		id: "1f2e3d4c-5b6a-4e9d-8c7b-6a5e4f3d2c56",
	// 		username: "test_user_01",
	// 		email: "test01@mail.com",
	// 		status: "Неактивен",
	//     role: "USER",
	// 		dateOfRegistration: Date.now() - 1000 * 60 * 60 * 24 * 20,
	//     avatarUrl: '',
	// 	},
	// 	{
	// 		id: "e8d7c6b5-a4f3-4e2d-9c1b-0a9f8e7d6c67",
	// 		username: "test_user_02",
	// 		email: "test02@mail.com",
	// 		status: "Активен",
	//     role: "USER",
	// 		dateOfRegistration: Date.now() - 1000 * 60 * 60 * 24 * 25,
	//     avatarUrl: '',
	// 	},
	// 	{
	// 		id: "4c3b2a1f-e9d8-4c7b-9a6e-5f4d3c2b1a78",
	// 		username: "moderator_max",
	// 		email: "moderator.max@mail.com",
	// 		status: "Активен",
	//     role: "USER",
	// 		dateOfRegistration: Date.now() - 1000 * 60 * 60 * 24 * 30,
	//     avatarUrl: '',
	// 	},
	// 	{
	// 		id: "0a1b2c3d-4e5f-4a6b-9c8d-e7f6a5b4c989",
	// 		username: "user_ivan_99",
	// 		email: "ivan99@mail.com",
	// 		status: "Заблокирован",
	//     role: "USER",
	// 		dateOfRegistration: Date.now() - 1000 * 60 * 60 * 24 * 40,
	//     avatarUrl: '',
	// 	},
	// 	{
	// 		id: "b3c2a1d0-e9f8-4c7b-8a6e-5d4c3b2a1f90",
	// 		username: "anna_k",
	// 		email: "anna.k@mail.com",
	// 		status: "Активен",
	//     role: "USER",
	// 		dateOfRegistration: Date.now() - 1000 * 60 * 60 * 24 * 45,
	//     avatarUrl: '',
	// 	},
	// 	{
	// 		id: "d1e2f3a4-b5c6-4d7e-8f9a-0b1c2d3e4f01",
	// 		username: "nikita_js",
	// 		email: "nikita.js@mail.com",
	// 		status: "Активен",
	//     role: "USER",
	// 		dateOfRegistration: Date.now() - 1000 * 60 * 60 * 24 * 60,
	//     avatarUrl: '',
	// 	},
	// 	{
	// 		id: "e2f1d0c9-b8a7-4e6d-9c5b-4a3f2e1d0c12",
	// 		username: "old_timer",
	// 		email: "old.timer@mail.com",
	// 		status: "Неактивен",
	//     role: "USER",
	// 		dateOfRegistration: Date.now() - 1000 * 60 * 60 * 24 * 90,
	//     avatarUrl: '',
	// 	},
	// 	{
	// 		id: "a9b8c7d6-e5f4-4a3b-9c2d-1e0f9a8b7c23",
	// 		username: "support_bot",
	// 		email: "support.bot@mail.com",
	// 		status: "Активен",
	//     role: "USER",
	// 		dateOfRegistration: Date.now() - 1000 * 60 * 60 * 24 * 120,
	//     avatarUrl: '',
	// 	},
	// 	{
	// 		id: "f0e9d8c7-b6a5-4f3e-9d2c-1b0a9f8e7d34",
	// 		username: "guest_001",
	// 		email: "guest001@mail.com",
	// 		status: "Неактивен",
	//     role: "USER",
	// 		dateOfRegistration: Date.now() - 1000 * 60 * 60 * 24 * 150,
	//     avatarUrl: '',
	// 	},
	// 	{
	// 		id: "3e2d1c0b-a9f8-4e7d-8c6b-5a4f3e2d1c45",
	// 		username: "demo_user",
	// 		email: "demo.user@mail.com",
	// 		status: "Активен",
	//     role: "USER",
	// 		dateOfRegistration: Date.now() - 1000 * 60 * 60 * 24 * 180,
	//     avatarUrl: '',
	// 	},
	// ];

	// const users = await apiGuardFetch<User[]>('/users')
	//   .catch(() => {
	//     return []
	//   });

	return (
		<div>
			nickname {user?.username}
			<UsersTable users={users} />
		</div>
	);
};

export default Page;
