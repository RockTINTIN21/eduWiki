import type { ColumnDef } from "@tanstack/react-table";
import { format } from "date-fns";
import { ExternalLink } from "lucide-react";
import Link from "next/link";
import {
	Roles,
	Statuses,
	type Users,
} from "@/features/users-table/model/types";

const statusesMapper = {
	[Statuses.ACTIVE]: "Активна",
	[Statuses.BLOCK]: "Заблокирована",
};

const rolesMapper = {
	[Roles.OWNER]: "Владелец",
	[Roles.ADMIN]: "Администратор",
	[Roles.MODERATOR]: "Модератор",
	[Roles.USER]: "Пользователь",
};

export const columns: ColumnDef<Users>[] = [
	{
		header: "#",
    size: 10,
		cell: ({ row, table }) => {
			const { pageIndex, pageSize } = table.getState().pagination;
			return pageIndex * pageSize + row.index + 1;
		},
	},
	{
    minSize: 200,
		accessorKey: "username",
		header: "Имя пользователя",
	},
	{
    minSize: 250,
		accessorKey: "email",
		header: "Почта",
	},
	{
		accessorKey: "id",
		header: "ID",
	},
	{
		accessorKey: "status",
		header: "Статус",
		cell: ({ row }) => {
			return (
				<div className="rounded-full border text-center w-max px-4 py-0.5 flex gap-2 items-center justify-center">
					<div
						className={`w-2 h-2 rounded-full ${row.original.status === "ACTIVE" ? "bg-green-600 animate-pulse" : "bg-red-600"}`}
					/>
					{statusesMapper[row.original.status] || "Не указана"}
				</div>
			);
		},
	},
	{
		accessorKey: "role",
		header: "Роль",
		cell: ({ row }) => rolesMapper[row.original.role] || "Не указана",
	},
	{
		accessorKey: "createdAt",
		header: "Дата регистрации",
		cell: ({ row }) =>
			format(new Date(row.original.createdAt), "dd.MM.yyyy в HH:MM") ||
			"Отсутствует",
	},
	{
		id: "actions",
		cell: ({ row }) => (
      <div className='flex justify-end pe-5'>
        <Link href={`/user/${row.original.username}`}>
          <ExternalLink
            className="cursor-pointer"
            size={16}
            color="black"
            strokeWidth={1}
          />
        </Link>
      </div>
		),
	},
];
