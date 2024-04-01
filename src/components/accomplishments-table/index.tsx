"use client";

import {
  useReactTable,
  getCoreRowModel,
  flexRender,
  PaginationState,
} from "@tanstack/react-table";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useMemo, useState } from "react";
import { columns } from "./columns";
import { clientSideApi } from "@/trpc/react";
import { PaginationItem } from "@nextui-org/react";
import {
  PaginationContent,
  PaginationPrevious,
  PaginationLink,
  PaginationEllipsis,
  PaginationNext,
  Pagination,
} from "../ui/pagination";
import { useWindowSize } from "@/hooks/use-window-size";

export function StoryAccomplishmentsTable() {
  const [{ pageIndex, pageSize }, setPagination] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: 10,
  });

  const fetchDataOptions = {
    pageIndex,
    pageSize,
  };

  const { data, isLoading, error } =
    clientSideApi.accomplishments.getAllAccomplishments.useQuery(
      fetchDataOptions,
      {
        keepPreviousData: true,
      },
    );

  if (error) {
    console.log("error", error);
  }

  const { accomplishments, totalPages } = data ?? {
    accomplishments: [],
    totalPages: 0,
  };

  const pagination = useMemo(
    () => ({
      pageIndex,
      pageSize,
    }),
    [pageIndex, pageSize],
  );

  const { width } = useWindowSize();
  const table = useReactTable({
    data: accomplishments,
    columns,
    getCoreRowModel: getCoreRowModel(),
    onPaginationChange: setPagination,
    state: {
      pagination,
      columnVisibility: {
        play: width > 768,
        word_count: width > 1000,
        self_care: width > 890,
        wip_time: width > 768,
      },
    },
  });

  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <TableHead key={header.id} className="whitespace-nowrap">
                  {flexRender(
                    header.column.columnDef.header,
                    header.getContext(),
                  )}
                </TableHead>
              ))}
            </TableRow>
          ))}
        </TableHeader>
        <TableBody>
          {table.getRowModel().rows?.length ? (
            table.getRowModel().rows.map((row) => (
              <TableRow key={row.id}>
                {row.getVisibleCells().map((cell) => (
                  <TableCell key={cell.id}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </TableCell>
                ))}
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={columns.length} className="h-24 text-center">
                {isLoading ? "Loading..." : "No entries."}
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
      <Pagination>
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious
              isActive={pageIndex > 1}
              onClick={() => table.previousPage()}
            />
          </PaginationItem>
          <PaginationItem>
            <PaginationLink href="#">1</PaginationLink>
          </PaginationItem>
          <PaginationItem>
            <PaginationEllipsis />
          </PaginationItem>
          <PaginationItem>
            <PaginationLink href="#">{totalPages}</PaginationLink>
          </PaginationItem>
          <PaginationItem>
            <PaginationNext onClick={() => table.nextPage()} />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </div>
  );
}
