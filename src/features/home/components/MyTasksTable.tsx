import React, { useState, useEffect } from "react";
import {
  Table,
  TableHeader,
  TableBody,
  TableHead,
  TableRow,
  TableCell,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import useFetch from "@/hooks/useFetch";
import {
  getStatusColor,
  tagPriorityColor,
} from "@/features/project/lib/project";
import { MyTask } from "@/features/home/ts/charts.types";
import { Card, CardContent, CardHeader } from "@/components/ui/card";

const ITEMS_PER_PAGE = 6;

const MyTasksTable = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const { data: tasks, loading } = useFetch<MyTask[]>(`/task/my-tasks`);

  const totalPages = tasks ? Math.ceil(tasks.length / ITEMS_PER_PAGE) : 0;

  const getCurrentPageItems = () => {
    if (!tasks) return [];
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    const endIndex = startIndex + ITEMS_PER_PAGE;
    return tasks.slice(startIndex, endIndex);
  };

  return (
    <Card className="mt-6">
      <CardHeader className="pb-3">
        <h3 className="text-xl font-medium">Your Tasks</h3>
      </CardHeader>

      <CardContent>
        <div>
          <div className="bg-white rounded-lg shadow-md">
            <div className="overflow-auto h-[14.8rem]">
              <Table>
                <TableHeader className="sticky top-0 bg-white">
                  <TableRow>
                    <TableHead className="w-48">Title</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Priority</TableHead>
                    <TableHead>End Date</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {loading ? (
                    <TableRow>
                      <TableCell colSpan={4} className="h-32">
                        <div className="flex items-center justify-center w-full h-full">
                          <Loader2 className="w-8 h-8 animate-spin" />
                        </div>
                      </TableCell>
                    </TableRow>
                  ) : !tasks || tasks.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={4} className="py-8 text-center">
                        No tasks found
                      </TableCell>
                    </TableRow>
                  ) : (
                    getCurrentPageItems().map((task, index) => (
                      <TableRow key={index} className="group">
                        <TableCell className="font-medium">
                          {task.title}
                        </TableCell>
                        <TableCell>
                          <span
                            className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(
                              task.status
                            )}`}
                          >
                            {task.status}
                          </span>
                        </TableCell>
                        <TableCell>
                          <span
                            className={`px-2 py-1 rounded-full text-xs font-medium ${
                              tagPriorityColor[task.priority]
                            }`}
                          >
                            {task.priority}
                          </span>
                        </TableCell>
                        <TableCell>{task.endDate}</TableCell>
                      </TableRow>
                    ))
                  )}
                </TableBody>
              </Table>
            </div>

            {tasks && tasks.length > 0 && (
              <div className="flex justify-end px-8 py-3 border-t">
                <div className="flex items-center gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() =>
                      setCurrentPage((prev) => Math.max(prev - 1, 1))
                    }
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
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default MyTasksTable;
