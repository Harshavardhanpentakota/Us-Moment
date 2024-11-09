"use client";

import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { Resource } from "@/components/contentTable/columns"; // Assuming this is the correct path

interface ColumnData {
  id: number;
  name: string;
}

interface DataTableProps {
  columns: ColumnDef<Resource, ColumnData>[];
  data: Resource[];
}
export function DataTable({ columns, data }: DataTableProps) {
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <div className="rounded-md border overflow-auto bg-dark-new">
      <table className="w-full table-auto">
        <thead>
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <th
                  key={header.id}
                  className="p-2 text-left font-semibold text-sm text-gray-500"
                >
                  {header.isPlaceholder ? null : (
                    <div>
                      {flexRender(
                        header.column.columnDef.header,
                        header.getContext()
                      )}
                    </div>
                  )}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody>
          {table.getRowModel().rows.map((row) => (
            <tr
              key={row.id}
              className={`border-t ${
                row.getIsSelected() ? "bg-gray-700" : ""
              }
              hover:bg-gray-800 
              transition-colors duration-200
              `}
            >
              {row.getVisibleCells().map((cell) => (
                <td key={cell.id} className="p-2 text-sm">
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
