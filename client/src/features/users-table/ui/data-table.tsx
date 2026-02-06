"use client";

import {
	type ColumnFiltersState,
	flexRender,
	getCoreRowModel,
	getFilteredRowModel,
	getPaginationRowModel,
	type SortingState,
	useReactTable,
} from "@tanstack/react-table";
import { useEffect, useState } from "react";
import { useDebounce } from "use-debounce";
import { Field, FieldLabel } from "@/components/ui/field";
import {
	Pagination,
	PaginationContent,
	PaginationItem,
	PaginationLink,
	PaginationNext,
	PaginationPrevious,
} from "@/components/ui/pagination";
import {
	Select,
	SelectContent,
	SelectGroup,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import {
	Table,
	TableBody,
	TableCaption,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@/components/ui/table";
import { columns, type Users } from "@/features/users-table/ui/columns";
import { apiGuardFetch } from "@/lib/api";
import {USERS_ENDPOINTS} from "@/features/users-table/api/users.endpoints";
import {toast} from "sonner";
import {Input} from "@/components/ui/input";

interface Meta {
	limit: number;
	page: number;
	total: number;
	totalPages: number;
}

type searchValueType = "email" | "username" | "id" | "status" | "role" | "dateOfRegistration"

export function DataTable() {
	// const user = useAppSelector((state) => state[slice.name].user);
	const [sorting, setSorting] = useState<SortingState>([]);
	const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);

	const [data, setData] = useState<Users[]>([]);
	const [searchValue, setSearchValue] = useState<string>("");
  const [searchValueType, setSearchValueType] = useState<searchValueType>("email")
	const value = useDebounce(searchValue, 500);

	const [rows, setRows] = useState<number>(10);
	const [currentPage, setCurrentPage] = useState<number>(1);
	const [meta, setMeta] = useState<Meta>();

	const getUsers = () => {
    apiGuardFetch<{data: Users[], meta: Meta}>(`${USERS_ENDPOINTS.getAllUsers}?page=${currentPage}&limit=${rows}`)
      .then((res) => {
        setData(res.data);
        setMeta(res.meta);
      })
      .catch((err) => toast.error(err.message));
	};

	useEffect(() => {
    getUsers();
	}, [rows, currentPage]);

  useEffect(() => {
    setCurrentPage(1)
  }, [rows]);

	const table = useReactTable({
		data,
		columns,
		getCoreRowModel: getCoreRowModel(),
		getPaginationRowModel: getPaginationRowModel(),
		getFilteredRowModel: getFilteredRowModel(),
		onColumnFiltersChange: setColumnFilters,
		onSortingChange: setSorting,
    manualPagination: true,

		state: {
			sorting,
			columnFilters,
      pagination: {
        pageIndex: currentPage - 1,
        pageSize: rows
      },
		},
    pageCount: meta?.totalPages ?? -1

	});

	const paginationBtns = [];

	if (meta) {
		for (let i = 0; i < meta.totalPages; i++) {
			paginationBtns.push(
				<PaginationItem key={i} onClick={() => setCurrentPage(i + 1)}>
					<PaginationLink isActive={currentPage === i + 1} href="#">{i + 1}</PaginationLink>
				</PaginationItem>,
			);
		}
	}

	return (
		<div>
      <div className="flex items-center w-1/2 py-4 gap-5">
        <Field orientation="vertical" className="">
          <FieldLabel htmlFor="select-rows-per-page">Поиск</FieldLabel>
          {/*{searchValueType === "role" ?*/}
          {/*  <Select*/}
          {/*    defaultValue="USER"*/}
          {/*    onValueChange={(value: string) => setSearchValue(value)}*/}
          {/*    value={searchValue}*/}
          {/*  >*/}
          {/*    <SelectTrigger className="w-20" id="select-rows-per-page">*/}
          {/*      <SelectValue />*/}
          {/*    </SelectTrigger>*/}
          {/*    <SelectContent align="start">*/}
          {/*      <SelectGroup>*/}
          {/*        <SelectItem value="USER">Пользователь</SelectItem>*/}
          {/*        <SelectItem value="MODERATOR">Модератор</SelectItem>*/}
          {/*        <SelectItem value="ADMIN">Администратор</SelectItem>*/}
          {/*        <SelectItem value="OWNER">Владелец</SelectItem>*/}
          {/*      </SelectGroup>*/}
          {/*    </SelectContent>*/}
          {/*  </Select>*/}
          {/*: searchValueType === "email" ?*/}
          {/*  <Input*/}
          {/*    placeholder="Начните искать"*/}
          {/*    value={(table.getColumn(searchValueType)?.getFilterValue() as string) ?? ""}*/}
          {/*    onChange={(event) =>*/}
          {/*      table.getColumn(searchValueType)?.setFilterValue(event.target.value)*/}
          {/*    }*/}
          {/*  />*/}
          {/*}*/}
          <Input
            placeholder="Начните искать"
            value={(table.getColumn(searchValueType)?.getFilterValue() as string) ?? ""}
            onChange={(event) =>
              table.getColumn(searchValueType)?.setFilterValue(event.target.value)
            }
          />
        </Field>

        <Field orientation="vertical" className="w-52">
          <FieldLabel htmlFor="select-rows-per-page">Фильтр поиска</FieldLabel>
          <Select
            defaultValue="email"
            onValueChange={(value: searchValueType) => setSearchValueType(value)}
            value={searchValueType}
          >
            <SelectTrigger className="w-20" id="select-rows-per-page">
              <SelectValue />
            </SelectTrigger>
            <SelectContent align="start">
              <SelectGroup>
                <SelectItem value="email">Почта</SelectItem>
                <SelectItem value="username">Имя пользователя</SelectItem>
                <SelectItem value="id">ID</SelectItem>
                <SelectItem value="status">Статус</SelectItem>
                <SelectItem value="role">Роль</SelectItem>
                <SelectItem value="dateOfRegistration">Дата регистрации</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        </Field>
      </div>
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
			</div>

			<div className="flex items-center justify-end space-x-2 py-4">
        {meta &&
          <div className="flex gap-3 items-center">
            <Field orientation="horizontal" className=" h-4">
              <FieldLabel htmlFor="select-rows-per-page">Кол-во строк</FieldLabel>
              <Select
                defaultValue="10"
                onValueChange={(value) => setRows(Number(value))}
                value={String(rows)}
              >
                <SelectTrigger className="w-20" size="sm" id="select-rows-per-page">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent align="start">
                  <SelectGroup>
                    <SelectItem value="10">10</SelectItem>
                    <SelectItem value="25">25</SelectItem>
                    <SelectItem value="50">50</SelectItem>
                    <SelectItem value="100">100</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            </Field>
            <Pagination>
              <PaginationContent>
                <PaginationItem>
                  <PaginationPrevious
                    onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                    className={currentPage <= 1 ? "pointer-events-none opacity-50" : undefined}
                    aria-disabled={currentPage === 1}
                  />
                </PaginationItem>
                {paginationBtns}
                <PaginationItem>
                  <PaginationNext
                    onClick={() => setCurrentPage((p) => Math.min(meta?.totalPages ?? p, p + 1))}
                    className={currentPage >= meta?.totalPages ? "pointer-events-none opacity-50" : undefined}
                    aria-disabled={!!meta && currentPage >= meta.totalPages}
                  />
                </PaginationItem>
              </PaginationContent>
            </Pagination>
          </div>
        }
			</div>
		</div>
	);
}
