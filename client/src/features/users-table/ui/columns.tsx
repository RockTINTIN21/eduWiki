import type { ColumnDef } from "@tanstack/react-table"


export type Users = {
  index: number;
  id: string;
  username: string;
  email: string;
  role: "USER" | "MODERATOR" | "ADMIN" | "OWNER";
  dateOfRegistration: number;
  status: string;
}

export const columns: ColumnDef<Users>[] = [
  {
    header: '#',
    cell: ({ row, table }) => {
      const { pageIndex, pageSize } = table.getState().pagination;
      return pageIndex * pageSize + row.index + 1;
    },
  },
  {
    accessorKey: "username",
    header: "Имя пользователя",
  },
  {
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
  },
  {
    accessorKey: "role",
    header: "Роль",
  },
  {
    accessorKey: "dateOfRegistration",
    header: "Дата регистрации",
  },
]