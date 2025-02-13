import { useState, useMemo } from "react";
import { Tooltip } from "@/components/ui/tooltip";
import {
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import useFetch from "@/hooks/useFetch";
import { Project } from "@/ts/shared.types";
import { Loader2 } from "lucide-react";
import Pagination from "@/features/timeline/components/Pagination";

const ITEMS_PER_PAGE = 5;

const TimelineTable = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const { data: projects, loading } = useFetch<Project[]>("/project");

  const totalPages = projects ? Math.ceil(projects.length / ITEMS_PER_PAGE) : 0;

  const paginatedData = useMemo(() => {
    if (!projects) return [];
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    return projects.slice(startIndex, startIndex + ITEMS_PER_PAGE);
  }, [currentPage, projects]);

  const dateRange = useMemo(() => {
    if (!paginatedData || paginatedData.length === 0)
      return { start: null, end: null };

    const dates = paginatedData.flatMap((item) => [
      new Date(item.startDate),
      new Date(item.endDate),
    ]);

    const start = new Date(Math.min(...dates.map((date) => date.getTime())));
    start.setDate(1);

    const end = new Date(Math.max(...dates.map((date) => date.getTime())));
    end.setDate(1);
    end.setMonth(end.getMonth() + 1);

    return { start, end };
  }, [paginatedData]);

  const months = useMemo(() => {
    if (!dateRange.start || !dateRange.end) return [];

    const months = [];
    const current = new Date(dateRange.start);

    while (current < dateRange.end) {
      months.push(new Date(current));
      current.setMonth(current.getMonth() + 1);
    }

    return months;
  }, [dateRange]);

  const getBarStyle = (startDate: string, endDate: string) => {
    const start = new Date(startDate);
    const end = new Date(endDate);
    const monthWidth = 100;
    const minimumWidth = 100;

    if (!dateRange.start) return { left: "0px", width: "0px" };

    const startDiff =
      (start.getFullYear() - dateRange.start.getFullYear()) * 12 +
      (start.getMonth() - dateRange.start.getMonth()) +
      start.getDate() / 30;

    const endDiff =
      (end.getFullYear() - dateRange.start.getFullYear()) * 12 +
      (end.getMonth() - dateRange.start.getMonth()) +
      end.getDate() / 30;

    const left = startDiff * monthWidth;
    const width = Math.max((endDiff - startDiff) * monthWidth, minimumWidth);

    return {
      left: `${left}px`,
      width: `${width}px`,
    };
  };

  return (
    <div className="w-full h-[462px] flex flex-col border border-gray-200 bg-white rounded-lg shadow-md mt-5">
      {loading ? (
        <div className="flex items-center justify-center h-full">
          <Loader2 className="w-8 h-8 animate-spin" />
        </div>
      ) : !projects || projects.length === 0 ? (
        <div className="flex items-center justify-center h-full">
          <div className="text-muted-foreground">No projects found</div>
        </div>
      ) : (
        <>
          <div className="grid grid-cols-[440px_1fr] flex-1 overflow-auto">
            {/* Fixed columns */}
            <div className="border-r border-gray-200">
              <div className="grid grid-cols-[180px_120px_120px] items-center gap-1 px-4 h-[64.4px] border-b border-gray-200 text-sm text-muted-foreground font-medium">
                <div>Name</div>
                <div>Start Date</div>
                <div>End Date</div>
              </div>
              <div className="border-b divide-y divide-gray-200">
                {paginatedData.map((item) => (
                  <div
                    key={item.id}
                    className="grid grid-cols-[180px_120px_120px] items-center gap-1 px-4 h-[64.4px] text-sm"
                  >
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger className="w-full">
                          <div className="font-medium text-left truncate">
                            {item.name}
                          </div>
                        </TooltipTrigger>
                        <TooltipContent>
                          <p className="max-w-xs font-medium line-clamp-2">
                            {item.name}
                          </p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                    <div>{item.startDate}</div>
                    <div>{item.endDate}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Scrollable timeline */}
            <div className="overflow-x-auto">
              <div style={{ width: `max(100%, ${months.length * 100}px)` }}>
                <div className="flex px-4 h-[64.4px] border-b items-center border-gray-200">
                  {months.map((month) => (
                    <div
                      key={month.toISOString()}
                      className="flex-none w-[100px] text-sm font-medium text-muted-foreground"
                    >
                      {month.toLocaleDateString("default", {
                        month: "short",
                        year: "numeric",
                      })}
                    </div>
                  ))}
                </div>

                <div className="border-b divide-y divide-gray-200">
                  {paginatedData.map((item) => (
                    <div key={item.id} className="relative h-[64.4px] p-4">
                      <div
                        className="absolute bg-gradient-to-r from-blue-400 to-blue-800 rounded-xl h-11 top-2.5"
                        style={getBarStyle(item.startDate, item.endDate)}
                      >
                        <TooltipProvider>
                          <Tooltip>
                            <TooltipTrigger className="w-full h-full">
                              <div className="flex items-center justify-center h-full px-2 text-sm font-medium text-white">
                                <span className="truncate">{item.name}</span>
                              </div>
                            </TooltipTrigger>
                            <TooltipContent>
                              <p className="max-w-xs line-clamp-2">
                                {item.name}
                              </p>
                            </TooltipContent>
                          </Tooltip>
                        </TooltipProvider>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Pagination */}
          {projects && projects.length > 0 && (
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={setCurrentPage}
              projectsCount={paginatedData.length}
              className="py-5"
            />
          )}
        </>
      )}
    </div>
  );
};

export default TimelineTable;
