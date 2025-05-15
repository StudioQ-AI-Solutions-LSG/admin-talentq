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
import { columns } from "./components/candidates-columns";
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

import TablePagination from "./components/candidates-table-pagination";
import { useCandidates } from "./hooks/use-candidates";
import { Loader2 } from "lucide-react";
import { useCandidatesStore } from "@/store/candidate.store";
import { CandidatesRequisitionFilter } from "./components/candidates-requisition-filter";
import { useRequisitionsFilter } from "./hooks/use-requisitions-filter";

const AccountsTable = () => {
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [columnVisibility, setColumnVisibility] = React.useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = React.useState({});
  const [ selectedRequisitionId, setSelectedRequisitionId ] = React.useState<string | null>(null);

  const {
    search_key,
    page,
    limit,
    setParams,
  } = useCandidatesStore();

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

  const handleRequisitionChange = (value: string | null) => {
    setSelectedRequisitionId(value);
    setParams({ requisition_position_id: value }); // o el nombre del filtro que uses en tu backend
  };

  const {
    candidates,
    pagination: servicePagination,
    isLoading,
    error,
  } = useCandidates();

  const {
    requisitions,
  } = useRequisitionsFilter();

  const paginationState = {
    pageIndex: page - 1,
    pageSize: limit,
  };

  const table = useReactTable({
    data: candidates ?? [],
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
          Candidates
        </div>

        <div className="flex items-center gap-3 max-w-xl">
          <div className="relative w-full">
            <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
              <FiSearch className="h-5 w-5" />
            </span>
            <Input
              placeholder="Search by Name, Email, Requisition..."
              value={search}
              onChange={handleSearchBar}
              className="w-[350px] pl-10 pr-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
              />
          </div>
          <CandidatesRequisitionFilter requisitions={requisitions} selected_requisition_id={selectedRequisitionId} onChange={handleRequisitionChange} />
          <button
            onClick={() => {
              setSearch("");
              setParams({ search_key: "", requisition_position_id: null });
              setSelectedRequisitionId(null)
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
                    ["timeline", "status"].includes(header.column.id)
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
                  <TableCell key={cell.id}>
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
