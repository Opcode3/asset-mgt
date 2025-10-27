import { useState } from "react";
import {
  useReactTable,
  getCoreRowModel,
  getFilteredRowModel,
  getSortedRowModel,
  getPaginationRowModel,
  flexRender,
} from "@tanstack/react-table";
import type { ColumnDef, SortingState } from "@tanstack/react-table";
import { BiSort, BiSortUp, BiSortDown } from "react-icons/bi";
import { rankItem } from "@tanstack/match-sorter-utils";

type DataTableProps<T> = {
  data: T[];
  columns: ColumnDef<T>[];
};

const fuzzyFilter = (row: any, columnId: string, value: string) => {
  return rankItem(row.getValue(columnId), value).passed;
};

export function DataTable<T>({ data, columns }: DataTableProps<T>) {
  const [globalFilter, setGlobalFilter] = useState("");
  const [sorting, setSorting] = useState<SortingState>([]);

  const table = useReactTable({
    data,
    columns,
    state: { globalFilter, sorting },
    onGlobalFilterChange: setGlobalFilter,
    onSortingChange: setSorting,
    globalFilterFn: fuzzyFilter,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
  });

  return (
    <div className="bg-white">
      {/* <div className="py-4 bg-white rounded-xl shadow"> */}
      {/* Global Search */}
      <div className="px-6 flex items-center justify-end">
        <input
          type="text"
          placeholder="Search..."
          value={globalFilter ?? ""}
          onChange={(e) => setGlobalFilter(e.target.value)}
          className="max-w-full border border-gray-200 w-[300px] rounded focus:outline-none focus:ring-0 focus:border-gray-300 transition-all focus:shadow px-4 py-2.5 text-sm font-medium text-secondary"
        />
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full table-auto">
          <thead className="text-left text-secondary border-b border-b-gray-200">
            {table.getHeaderGroups().map((headerGroup) => (
              <tr key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <th
                    key={header.id}
                    className="py-3.5 px-6 text-base text-secondary font-semibold"
                  >
                    <button
                      className={`flex items-center gap-1 ${
                        header.column.getCanSort() ? "cursor-pointer" : ""
                      }`}
                      onClick={header.column.getToggleSortingHandler()}
                    >
                      {flexRender(
                        header.column.columnDef.header,
                        header.getContext()
                      )}
                      {header.column.getCanSort() && (
                        <>
                          {header.column.getIsSorted() === "asc" && (
                            <BiSortUp className="text-gray-500" />
                          )}
                          {header.column.getIsSorted() === "desc" && (
                            <BiSortDown className="text-gray-500" />
                          )}
                          {!header.column.getIsSorted() && (
                            <BiSort className="text-gray-300" />
                          )}
                        </>
                      )}
                    </button>
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody className="text-sm text-gray-800 pt-10">
            {table.getRowModel().rows.map((row) => (
              <tr
                key={row.id}
                className="border-b border-b-gray-200 hover:bg-gray-50 group"
              >
                {row.getVisibleCells().map((cell) => (
                  <td key={cell.id} className="px-5 py-3">
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </td>
                ))}
              </tr>
            ))}

            {table.getRowModel().rows.length === 0 && (
              <tr>
                <td
                  colSpan={columns.length}
                  className="p-5 text-base font-normal text-center text-gray-400"
                >
                  No data available
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="mt-4 flex justify-between items-center text-sm text-secondary px-6 py-2.5">
        <div>
          Page {table.getState().pagination.pageIndex + 1} of{" "}
          {table.getPageCount()}
        </div>
        <div className="space-x-2">
          <button
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
            className="px-3 py-1 border rounded disabled:opacity-30"
          >
            Prev
          </button>
          <button
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
            className="px-3 py-1 border rounded disabled:opacity-30"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
}
