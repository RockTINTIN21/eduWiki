"use client";

import {
	flexRender,
	getCoreRowModel,
	getFilteredRowModel,
	getPaginationRowModel,
	type SortingState,
	useReactTable,
} from "@tanstack/react-table";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import {
	Table,
	TableBody,
	TableCaption,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@/components/ui/table";
import { USERS_ENDPOINTS } from "@/features/users-table/api/users.endpoints";
import type { Meta, Users } from "@/features/users-table/model/types";
import { columns } from "@/features/users-table/ui/columns";
import PaginationTable from "@/features/users-table/ui/pagination-table";
import Search from "@/features/users-table/ui/search";
import { apiGuardFetch } from "@/lib/api";

export function DataTable() {
	const [sorting, setSorting] = useState<SortingState>([]);

	const params = useSearchParams();

	const [data, setData] = useState<Users[]>([]);

	const [rows, setRows] = useState<number>(10);
	const [currentPage, setCurrentPage] = useState<number>(1);
	const [meta, setMeta] = useState<Meta>();

	useEffect(() => {
		const filter = Array.from(params.entries())[0];

    if (filter && (filter[0] && filter[1])) {
      getUsers(filter[0], filter[1]);
    }else if (!filter) {
      getUsers()
    }
	}, [params, rows, currentPage]);

	const getUsers = (label?: string, value?: string) => {
		apiGuardFetch<{ data: Users[]; meta: Meta }>(
			`${USERS_ENDPOINTS.getAllUsers}?page=${currentPage}&limit=${rows}${label && value ? `&label=${label}&value=${value}` : ""}`,
		)
			.then((res) => {
				setData(res.data);
				setMeta(res.meta);
			})
			.catch((err) => toast.error(err.message, { position: "top-center" }));
	};

	useEffect(() => {
		setCurrentPage(1);
	}, [rows]);

	const table = useReactTable({
		data,
		columns,
		getCoreRowModel: getCoreRowModel(),
		getPaginationRowModel: getPaginationRowModel(),
		getFilteredRowModel: getFilteredRowModel(),
		onSortingChange: setSorting,
		manualPagination: true,
		state: {
			sorting,

			pagination: {
				pageIndex: currentPage - 1,
				pageSize: rows,
			},
		},
		pageCount: meta?.totalPages ?? -1,
	});

	const onCurrentPageChange = (page: number) => setCurrentPage(page);

	const onRowsChange = (rows: number) => setRows(rows);

	return (
		<div>
			<Search />

			<div className="overflow-hidden rounded-md border">
				<Table>
					<TableCaption>Список пользователей EduWiki</TableCaption>
					<TableHeader>
						{table.getHeaderGroups().map((headerGroup) => (
							<TableRow key={headerGroup.id}>
								{headerGroup.headers.map((header) => {
									return (
										<TableHead key={header.id}>
											{header.isPlaceholder
												? null
												: flexRender(
														header.column.columnDef.header,
														header.getContext(),
													)}
										</TableHead>
									);
								})}
							</TableRow>
						))}
					</TableHeader>
					<TableBody>
						{table.getRowModel().rows?.length ? (
							table.getRowModel().rows.map((row) => (
								<TableRow
									key={row.id}
									data-state={row.getIsSelected() && "selected"}
								>
									{row.getVisibleCells().map((cell) => (
										<TableCell key={cell.id}>
											{flexRender(
												cell.column.columnDef.cell,
												cell.getContext(),
											)}
										</TableCell>
									))}
								</TableRow>
							))
						) : (
							<TableRow>
								<TableCell
									colSpan={columns.length}
									className="h-24 text-center"
								>
									Нет результатов.
								</TableCell>
							</TableRow>
						)}
					</TableBody>
				</Table>
				<PaginationTable
					meta={meta}
					onRowsChange={onRowsChange}
					currentPage={currentPage}
					rows={rows}
					onCurrentPageChange={onCurrentPageChange}
				/>
			</div>
		</div>
	);
}
