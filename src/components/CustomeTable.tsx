import React, { useState, useMemo } from "react";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import clsx from "clsx";

export type Column<T> = {
  field: keyof T;
  header: string;
  width?: number;
  render?: (value: T[keyof T], row: T) => React.ReactNode;
};

type CustomTableProps<T> = {
  data: T[] | undefined;
  columns: Column<T>[];
  loading?: boolean;
  itemsPerPage?: number;
  className?: string;
};

const CustomTable = <T extends Record<string, any>>({
  data,
  columns,
  loading = false,
  itemsPerPage = 5,
  className = "",
}: CustomTableProps<T>) => {
  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = Math.ceil((data?.length || 0) / itemsPerPage);

  const paginatedData = useMemo(() => {
    if (!data) return [];
    const startIndex = (currentPage - 1) * itemsPerPage;
    return data.slice(startIndex, startIndex + itemsPerPage);
  }, [currentPage, data, itemsPerPage]);

  const tableWidth = columns.reduce((acc, col) => acc + (col.width || 150), 0);

  return (
    <div
      className={`w-full border border-gray-200 bg-gray-50 rounded-lg shadow-md flex flex-col ${className}`}
    >
      <div className="flex-1 min-h-[377px] overflow-hidden">
        {loading ? (
          <div className="flex items-center justify-center min-h-[inherit] h-full">
            <Loader2 className="w-8 h-8 animate-spin" />
          </div>
        ) : !data || data.length === 0 ? (
          <div className="flex items-center justify-center min-h-[inherit] h-full">
            <div className="text-muted-foreground">No data found</div>
          </div>
        ) : (
          <div className="h-full overflow-y-auto">
            <div className="overflow-x-auto">
              <div style={{ minWidth: `${tableWidth}px` }}>
                {/* Header */}
                <div
                  className="sticky top-0 z-10 grid border-b border-gray-200 bg-gray-50"
                  style={{
                    gridTemplateColumns: columns
                      .map((col) => `${col.width || 150}px`)
                      .join(" "),
                  }}
                >
                  {columns.map((column) => (
                    <div
                      key={String(column.field)}
                      className="px-4 py-4 text-sm font-medium text-muted-foreground"
                    >
                      {column.header}
                    </div>
                  ))}
                </div>

                {/* Body */}
                <div className="border-b divide-y divide-gray-200">
                  {paginatedData.map((row, rowIndex) => (
                    <div
                      key={rowIndex}
                      className="grid items-center transition-colors hover:bg-gray-100"
                      style={{
                        gridTemplateColumns: columns
                          .map((col) => `${col.width || 150}px`)
                          .join(" "),
                      }}
                    >
                      {columns.map((column) => (
                        <div
                          key={`${rowIndex}-${String(column.field)}`}
                          className="flex px-4 h-[4rem] items-center text-sm"
                        >
                          <TooltipProvider>
                            <Tooltip>
                              <TooltipTrigger className="w-full">
                                <div className="text-left truncate">
                                  {column.render
                                    ? column.render(row[column.field], row)
                                    : row[column.field]}
                                </div>
                              </TooltipTrigger>
                              <TooltipContent>
                                <p className="max-w-xs line-clamp-2">
                                  {String(row[column.field])}
                                </p>
                              </TooltipContent>
                            </Tooltip>
                          </TooltipProvider>
                        </div>
                      ))}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      <div
        className={clsx(
          "flex justify-end px-8 py-5",
          paginatedData.length !== 5 && "border-t"
        )}
      >
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
          >
            Previous
          </Button>
          <span className="text-sm">
            Page {currentPage} of {totalPages}
          </span>
          <Button
            variant="outline"
            size="sm"
            onClick={() =>
              setCurrentPage((prev) => Math.min(prev + 1, totalPages))
            }
            disabled={currentPage === totalPages}
          >
            Next
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CustomTable;
