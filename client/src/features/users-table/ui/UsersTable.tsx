"use client";

import {
	Table,
	TableBody,
	TableCaption,
	TableCell,
	TableFooter,
	TableHead,
	TableHeader,
	TableRow,
} from "@/components/ui/table";
import type { User } from "@/features/auth/model/slice";

interface UsersTableProps {
	users?: User[];
}

const UsersTable = ({ users }: UsersTableProps) => {
	return (
		<Table>
			<TableCaption>
				Список зарегистрированных пользователей EduWiki
			</TableCaption>
			<TableHeader>
				<TableRow onClick={() => console.log("вызов")}>
					<TableHead>Имя пользователя</TableHead>
					<TableHead>Почта</TableHead>
					<TableHead>ID</TableHead>
					<TableHead>Статус</TableHead>
					<TableHead>Роль</TableHead>
					<TableHead>Дата регистрации</TableHead>
				</TableRow>
			</TableHeader>
			<TableBody>
        {users ? (
          users.map((user) => (
              <TableRow key={user?.id}>
                <TableCell className="font-medium">{user?.username}</TableCell>
                <TableCell>{user?.email}</TableCell>
                <TableCell>{user?.id}</TableCell>
                <TableCell>{user?.status}</TableCell>
                <TableCell>{user?.role}</TableCell>
                <TableCell>{user?.dateOfRegistration}</TableCell>
              </TableRow>
            ))
        ) : (
          <div>Загрузка</div>
        )}

			</TableBody>
			<TableFooter>
				<TableRow>
					<TableCell colSpan={3}>Всего пользователей</TableCell>
					<TableCell className="text-right">{users ? users.length : 0}</TableCell>
				</TableRow>
			</TableFooter>
		</Table>
	);
};

export default UsersTable;
