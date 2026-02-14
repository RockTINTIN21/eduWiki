"use client";

import { format } from "date-fns";
import { ru } from "date-fns/locale";
import { ChevronDownIcon } from "lucide-react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { useDebounce } from "use-debounce";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Field, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from "@/components/ui/popover";
import {
	Select,
	SelectContent,
	SelectGroup,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import type {SearchValueType} from "@/features/users-table/model/types";

const Search = () => {
  const searchParams = useSearchParams();
  const firstEntry = Array.from(searchParams.entries())[0];
  const initialType = firstEntry?.[0] as SearchValueType ?? "email";
  const initialValue = firstEntry?.[1] ?? "";

  const [searchValue, setSearchValue] = useState(initialValue);
	const [searchType, setSearchType] = useState<SearchValueType>(initialType);
	const [date, setDate] = useState<Date>();

	const pathname = usePathname();
	const { replace } = useRouter();

	const [debouncedValue] = useDebounce(searchValue, (searchType === "email" || searchType === "id" || searchType === "username") ? 500 : 0);


  const setParams = () => {
    const params = new URLSearchParams(searchParams);
    if (debouncedValue || date) {
      if (debouncedValue) params.set(searchType, String(debouncedValue));
      if (date) params.set(searchType, date.toString());
      const newQuery = params.toString();
      const currentQuery = searchParams.toString();
      if (newQuery !== currentQuery) {
        replace(`${pathname}?${newQuery}`);
      }
    }

    if(!debouncedValue && params.toString()) replace(`${pathname}`);
  }

  useEffect(() => {
    setParams();
  }, [debouncedValue]);

  const clearParams = () => {
    if (searchValue) setSearchValue("");
    if (date) setDate(undefined);
  }

	return (
		<div className="flex items-center py-4 gap-5">
			<Field orientation="vertical">
				<FieldLabel htmlFor="select-rows-per-page">Поиск</FieldLabel>
				{searchType === "role" ? (
					<Select
						onValueChange={(value: string) => setSearchValue(value)}
						value={searchValue}
					>
						<SelectTrigger className="w-20 px-6" id="select-rows-per-page">
							<SelectValue placeholder="Выберите роль" />
						</SelectTrigger>

						<SelectContent position="popper">
							<SelectGroup>
								<SelectItem value="USER">Пользователь</SelectItem>
								<SelectItem value="MODERATOR">Модератор</SelectItem>
								<SelectItem value="ADMIN">Администратор</SelectItem>
								<SelectItem value="OWNER">Владелец</SelectItem>
							</SelectGroup>
						</SelectContent>
					</Select>
				) : searchType === "status" ? (
					<Select
						onValueChange={(value: string) => setSearchValue(value)}
						value={searchValue}
					>
						<SelectTrigger className="w-20 px-6" id="select-rows-per-page">
							<SelectValue placeholder="Выберите статус" />
						</SelectTrigger>
						<SelectContent position="popper">
							<SelectGroup>
								<SelectItem value="ACTIVE">Активна</SelectItem>
								<SelectItem value="BLOCK">Заблокирована</SelectItem>
								<SelectItem value="DELETE">Удалена</SelectItem>
							</SelectGroup>
						</SelectContent>
					</Select>
				) : searchType === "createdAt" ? (
					<Popover>
						<PopoverTrigger asChild>
							<Button
								variant="outline"
								data-empty={!date}
								className="data-[empty=true]:text-muted-foreground w-[212px] justify-between text-left font-normal"
							>
								{date ? (
									format(date, "PPP", { locale: ru })
								) : (
									<span className="px-2">Выберите дату</span>
								)}
								<ChevronDownIcon />
							</Button>
						</PopoverTrigger>
						<PopoverContent className="w-auto p-0" align="start">
							<Calendar
								locale={ru}
								mode="single"
								selected={date}
								onSelect={(value) => setDate(value)}
								defaultMonth={date}
							/>
						</PopoverContent>
					</Popover>
				) : (
					<Input
						className="px-6"
						placeholder="Начните искать"
						value={searchValue}
						onChange={(event) => setSearchValue(event.target.value)}
					/>
				)}
			</Field>

			<Field orientation="vertical" className="max-w-52 min-w-52">
				<FieldLabel htmlFor="select-rows-per-page">Фильтр поиска</FieldLabel>
				<Select
					defaultValue="email"
					onValueChange={(value: SearchValueType) => {
            setSearchType(value)
            clearParams()
          }}
					value={searchType}
				>
					<SelectTrigger className="px-6" id="select-rows-per-page">
						<SelectValue />
					</SelectTrigger>
					<SelectContent position="popper">
						<SelectGroup>
							<SelectItem value="email">Почта</SelectItem>
							<SelectItem value="username">Имя пользователя</SelectItem>
							<SelectItem value="id">ID</SelectItem>
							<SelectItem value="status">Статус</SelectItem>
							<SelectItem value="role">Роль</SelectItem>
							<SelectItem value="createdAt">
								Дата регистрации
							</SelectItem>
						</SelectGroup>
					</SelectContent>
				</Select>
			</Field>
		</div>
	);
};

export default Search;
