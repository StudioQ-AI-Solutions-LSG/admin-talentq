"use client";

import * as React from "react";
import {
  SortingState,
  VisibilityState,
  flexRender,
  getCoreRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { FiSearch } from "react-icons/fi";
import { columns } from "./components/requisitions-columns";
import { Input } from "@/components/ui/input";
import { motion } from "framer-motion";
import debounce from "just-debounce-it";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import TablePagination from "./components/requisitions-table-pagination";
import { Loader2 } from "lucide-react";
import { useRequisitions } from "./hooks/use-requisitions";
import { useRequisitionsStore } from "@/store/requisition.store";
import { RequisitionsCounters } from "./components/requisitions-counters";
import { RequisitionsStatusFilter } from "./components/requisitions-status-filter";
import { statusRequisitions } from "@/lib/constants/requisitions.constants";
//import { useRequisitionsFilter } from "./hooks/use-requisitions-filter";
//import { CandidatesCounters } from "./components/candidates-counters";

const AccountsTable = () => {
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = React.useState({});
  const [selectedRequisitionId, setSelectedRequisitionId] = React.useState<
    string | null
  >(null);
  const [selectedStatus, setSelectedStatus] = React.useState<string[]>([]);
  const { search_key, page, limit, setParams } = useRequisitionsStore();
  

  const [search, setSearch] = React.useState(search_key ?? "");

  const debounceSearch = React.useCallback(
    debounce((newSearch: string) => {
      setParams({ search_key: newSearch });
    }, 300),
    [setParams]
  );

  const handleSearchBar = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
    debounceSearch(e.target.value);
  };

  const handleStatusChange = (value: string[]) => {
    setSelectedStatus(value);
    setParams({ status: value });
  };

  const {
    requisitions,
    pagination: servicePagination,
    isLoading,
    error,
  } = useRequisitions();

  const paginationState = {
    pageIndex: page - 1,
    pageSize: limit,
  };

  const table = useReactTable({
    data: requisitions ?? [],
    columns,
    manualPagination: true,
    manualFiltering: true,
    pageCount: servicePagination?.totalPages ?? 1,
    onSortingChange: setSorting,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    onPaginationChange: (updater) => {
      const next =
        typeof updater === "function" ? updater(paginationState) : updater;
      setParams({
        page: next.pageIndex + 1,
        limit: next.pageSize,
      });
    },
    state: {
      sorting,
      columnVisibility,
      rowSelection,
      pagination: paginationState,
    },
  });

  return (
    <div className="w-full">
      <div className="px-5 py-4">
        <div className="text-2xl font-medium text-default-900 mb-4">
          Requisitions
        </div>
        <RequisitionsCounters />
        <div className="flex items-center gap-3 w-full mt-7">
          <div className="relative">
            <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
              <FiSearch className="h-5 w-5" />
            </span>
            <Input
              placeholder="Search by Customer, Status..."
              value={search}
              onChange={handleSearchBar}
              className="w-[350px] h-[40px] text-xs text-gray-900 placeholder:text-gray-400 pl-10 pr-4 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
            />
          </div>
          <RequisitionsStatusFilter
            statuses={statusRequisitions}
            selected_status_ids={selectedStatus}
            onChange={handleStatusChange}
          />
          <button
            onClick={() => {
              setSearch("");
              setParams({
                search_key: "",
                status: [],
              });
              setSelectedRequisitionId(null);
              setSelectedStatus([]);
            }}
            className="text-sm px-4 py-2 rounded-lg bg-gray-200 hover:bg-gray-300 text-gray-800 transition-colors duration-200"
          >
            Clear
          </button>
        </div>
      </div>
      <Table>
        <TableHeader className="bg-default-200">
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <TableHead
                  key={header.id}
                  className={
                    ["candidates", "status"].includes(header.column.id)
                      ? "text-center"
                      : ""
                  }
                >
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
          {table.getRowModel().rows.length ? (
            table.getRowModel().rows.map((row) => (
              <TableRow
                key={row.id}
                data-state={row.getIsSelected() && "selected"}
              >
                {row.getVisibleCells().map((cell) => (
                  <TableCell key={cell.id} className="py-3">
                    <motion.div
                      layout
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.5, ease: "easeInOut" }}
                    >
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </motion.div>
                  </TableCell>
                ))}
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={columns.length} className="h-24 text-center">
                {isLoading ? (
                  <span className="inline-flex gap-1 items-center">
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Loading...
                  </span>
                ) : (
                  <p>No results were found...</p>
                )}
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
      <TablePagination table={table} />
    </div>
  );
};

export default AccountsTable;
