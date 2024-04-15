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
import { useEffect, useMemo, useState } from "react";
import { columns } from "./columns";
import { PaginationItem } from "@nextui-org/react";
import {
  PaginationContent,
  PaginationPrevious,
  PaginationLink,
  PaginationEllipsis,
  PaginationNext,
  Pagination,
} from "../ui/pagination";
import {
  AccomplishmentResponse,
  getAllAccomplishments,
} from "@/server/functions/getAllAccomplishments";

export function StoryAccomplishmentsTable() {
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState<AccomplishmentResponse>({
    accomplishments: [],
    totalPages: 0,
  });
  const [{ pageIndex, pageSize }, setPagination] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: 10,
  });

  useEffect(() => {
    async function fetchData() {
      setIsLoading(true);
      try {
        const fetchDataOptions = {
          pageIndex,
          pageSize,
        };

        const data = await getAllAccomplishments(fetchDataOptions);
        setData(data);
      } catch (e) {
        console.error(e);
      } finally {
        setIsLoading(false);
      }
    }

    void fetchData();
  }, [pageIndex, pageSize]);

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

  const table = useReactTable({
    data: accomplishments,
    columns,
    getCoreRowModel: getCoreRowModel(),
    onPaginationChange: setPagination,
    state: {
      pagination,
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
