"use client";

import { Field, FieldLabel } from "@/components/ui/field";
import {
  Pagination,
  PaginationContent,
  PaginationItem, PaginationLink,
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
import type { Meta } from "@/features/users-table/model/types";

interface PaginationProps {
	meta: Meta | undefined;
  currentPage: number;
  onCurrentPageChange: (page: number) => void;
  rows: number;
  onRowsChange: (rows: number) => void;
}

const PaginationTable = ({
  meta,
  currentPage,
  onCurrentPageChange,
  rows,
  onRowsChange,
  }: PaginationProps) => {

  const paginationBtns = [];

  if (meta) {
    for (let i = 0; i < meta.totalPages; i++) {
      paginationBtns.push(
        <PaginationItem key={i} onClick={() => onCurrentPageChange(i + 1)}>
          <PaginationLink isActive={currentPage === i + 1} href="#">
            {i + 1}
          </PaginationLink>
        </PaginationItem>,
      );
    }
  }

	return (
    <div className="flex items-center justify-end space-x-2 py-4">
      {meta && (
        <div className="flex gap-3 items-center">
          <Field orientation="horizontal" className=" h-4">
            <FieldLabel htmlFor="select-rows-per-page">
              Кол-во строк
            </FieldLabel>
            <Select
              defaultValue="10"
              onValueChange={(value) => onRowsChange(Number(value))}
              value={String(rows)}
            >
              <SelectTrigger
                className="w-20 px-4"
                size="sm"
                id="select-rows-per-page"
              >
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
                  onClick={() => onCurrentPageChange(Math.max(1, currentPage - 1))}
                  className={
                    currentPage <= 1
                      ? "pointer-events-none opacity-50"
                      : undefined
                  }
                  aria-disabled={currentPage === 1}
                />
              </PaginationItem>
              {paginationBtns}
              <PaginationItem>
                <PaginationNext
                  onClick={() =>
                    onCurrentPageChange(Math.min(meta?.totalPages ?? currentPage, currentPage + 1),)
                  }
                  className={
                    currentPage >= meta?.totalPages
                      ? "pointer-events-none opacity-50"
                      : undefined
                  }
                  aria-disabled={!!meta && currentPage >= meta.totalPages}
                />
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        </div>
      )}
    </div>
  )
};

export default PaginationTable;
