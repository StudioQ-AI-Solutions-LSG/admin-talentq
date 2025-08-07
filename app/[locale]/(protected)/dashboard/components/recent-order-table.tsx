"use client";

import * as React from "react";
import { Clock, Users } from "lucide-react";
import {
  ColumnDef,
  ColumnFiltersState,
  PaginationState,
  SortingState,
  VisibilityState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { Button } from "@/components/ui/button";
import { data } from "./data";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { useRequisitions } from "../../requisitions/hooks/use-requisitions";

export type OrdersDataProps = {
  user: {
    name: string;
    image: string;
  };
  product: string;
  invoice: string;
  price: string;
  status: "paid" | "due" | "pending" | "cancled" | "shipped";
  elapsed_days?: any;
};

export const columns: ColumnDef<OrdersDataProps>[] = [
    {
    accessorKey: "created_at",
    header: "Date",
    cell: ({ row }) => {
      const createdAt = row.getValue("created_at") as string;
      const days = row.original.elapsed_days;

      return (
        <div className="flex items-center justify-start gap-2">
          <span>
            {createdAt ? createdAt : "--"}
          </span>

          {typeof days === "number" && (
            <span className="flex items-center gap-1 text-muted-foreground">
              <Clock className="w-3 h-3" />+{days}d
            </span>
          )}
        </div>
      );
    },
  },
  {
    accessorKey: "custom_name",
    header: "Requisition",
    cell: ({ row }) => (
      <div className="flex items-center gap-5">
        {/*         <div className="flex-none">
          <div className="w-8 h-8">
            <Avatar>
              <AvatarImage src={row.original.user.image}></AvatarImage>
              <AvatarFallback>SC</AvatarFallback>
            </Avatar>
          </div>
        </div> */}
        <div className="flex-1 text-start">{row.getValue("custom_name")}</div>
      </div>
    ),
  },
  {
    accessorKey: "customer",
    header: "Customer",
    cell: ({ row }) => <span>{row.getValue("customer") ?? "--"}</span>,
  },
  {
    accessorKey: "budget",
    header: "Budget",
    cell: ({ row }) => <span>{"$" + row.getValue("budget")}</span>,
  },
  {
    accessorKey: "calculated_status",
    header: "Status",
    cell: ({ row }) => {
      const statusColors: Record<string, string> = {
        "in progress": "bg-blue-100 text-blue-600",
        closed: "bg-gray-200 text-gray-800",
        Filled: "bg-success/20 text-success",
        new: "bg-purple-100 text-purple-600",
      };

      let status = row.getValue<string>("calculated_status");
      if (status === "in_progress") status = "in progress";
      const statusStyles = statusColors[status] || "default";

      return (
        <Badge
          className={cn(
            "rounded-full px-2 py-1 text-center",
            statusStyles,
            "inline-flex items-center justify-center",
            "w-[90px]", // fixed width to fit 'In Progress'
            "h-[28px]", // fixed height for consistency
            "whitespace-nowrap" // prevent wrapping
          )}
        >
          {status}
        </Badge>
      );
    },
  },
];

const RecentOrderTable = () => {
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  );
  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = React.useState({});
  const [pagination, setPagination] = React.useState<PaginationState>({
    pageIndex: 0,
    pageSize: 6,
  });

  const {
    requisitions,
    pagination: servicePagination,
    isLoading,
    error,
  } = useRequisitions();

  const table = useReactTable({
    data: requisitions ?? [],
    columns,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    onPaginationChange: setPagination,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
      pagination,
    },
  });

  return (
    <div className="w-full overflow-x-auto">
      <Table className="overflow-hidden">
        <TableHeader>
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow key={headerGroup.id} className="bg-default-200">
              {headerGroup.headers.map((header) => (
                <TableHead key={header.id}>
                  {header.isPlaceholder
                    ? null
                    : flexRender(
                        header.column.columnDef.header,
                        header.getContext()
                      )}
                </TableHead>
              ))}
            </TableRow>
          ))}
        </TableHeader>
        <TableBody>
          {table.getRowModel().rows?.length ? (
            table.getRowModel().rows.map((row) => (
              <TableRow
                key={row.id}
                data-state={row.getIsSelected() && "selected"}
                className="h-[75px]"
              >
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
                No results.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>

      <div className="flex items-center justify-center gap-2 flex-none py-4">
        <Button
          variant="outline"
          size="icon"
          onClick={() => table.previousPage()}
          disabled={!table.getCanPreviousPage()}
          className="w-8 h-8 border-transparent hover:bg-transparent"
        >
          <ChevronLeft className="w-5 h-5 text-default-900" />
        </Button>
        {table.getPageOptions().map((page, pageIndex) => (
          <Button
            key={`basic-data-table-${pageIndex}`}
            onClick={() => table.setPageIndex(pageIndex)}
            size="icon"
            className={`w-7 h-7 hover:text-primary-foreground ${
              table.getState().pagination.pageIndex === pageIndex
                ? "bg-default"
                : "bg-default-100 text-default"
            }`}
          >
            {page + 1}
          </Button>
        ))}
        <Button
          variant="outline"
          size="icon"
          onClick={() => table.nextPage()}
          disabled={!table.getCanNextPage()}
          className="w-8 h-8 border-transparent hover:bg-transparent"
        >
          <ChevronRight className="w-5 h-5 text-default-900" />
        </Button>
      </div>
    </div>
  );
};

export default RecentOrderTable;
