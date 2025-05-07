import { Button } from '@/components/ui/button';
import { Table } from '@tanstack/react-table';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import React from 'react';

interface DataTablePaginationProps {
  table: Table<any>;
}


const TablePagination = ({ table }: DataTablePaginationProps) => {

  const currentPage = table.getState().pagination.pageIndex;
  const totalPages = table.getPageCount();

  const getPageButtons = () => {
  const pages = new Set<number>();

  pages.add(0); // First page
  pages.add(totalPages - 1); // Last page

  for (let i = currentPage - 2; i <= currentPage + 2; i++) {
    if (i > 0 && i < totalPages - 1) {
      pages.add(i);
    }
  }

  return Array.from(pages).sort((a, b) => a - b);
};

  return (
    <div className="flex items-center justify-end py-4 px-10">
      <div className="flex-1 text-sm text-muted-foreground">
        {table.getFilteredSelectedRowModel().rows.length} of{" "}
        {table.getFilteredRowModel().rows.length} row(s) selected.
      </div>
   
       <div className="flex items-center gap-2 flex-none">
        <Button
          variant="outline"
          size="icon"
          onClick={() => table.previousPage()}
          disabled={!table.getCanPreviousPage()}
          className='w-8 h-8'
        >
          <ChevronLeft className='w-4 h-4' />
        </Button>
        {getPageButtons().map((page, idx, arr) => {
          const prev = arr[idx - 1];
          const showEllipsis = prev !== undefined && page - prev > 1;
                
          return (
            <React.Fragment key={page}>
              {showEllipsis && <span className="px-1">…</span>}
              <Button
                onClick={() => table.setPageIndex(page)}
                size="icon"
                className="w-8 h-8"
                variant={table.getState().pagination.pageIndex === page ? 'default' : 'outline'}
              >
                {page + 1}
              </Button>
            </React.Fragment>
          );
        })}
        <Button
          variant="outline"
          size="icon"
          onClick={() => table.nextPage()}
          disabled={!table.getCanNextPage()}
          className='w-8 h-8'
        >
          <ChevronRight className='w-4 h-4' />
        </Button>
      </div>
    </div>
  );
};

export default TablePagination;