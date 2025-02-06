import { Button } from "@/components/ui/button";
import { useStore } from "@/state/useStore";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import clsx from "clsx";
import { useEffect, useState } from "react";
import useFetch from "@/hooks/useFetch";
import { Task } from "@/features/project/ts/list.type";
import { useParams } from "react-router";
import {
  getStatusColor,
  tagPriorityColor,
} from "@/features/project/lib/project";
import { Loader2 } from "lucide-react";

import DropdownRemoveTask from "@/features/project/components/kanban/DropdownRemoveTask";

const ITEMS_PER_PAGE = 6;

const TableTask = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const { id } = useParams();
  const {
    data: tasks,
    loading,
    refetch,
  } = useFetch<Task[]>(`/task/tasks-project/?id=${id}&section=list`);

  const setIsTaskModal = useStore((state) => state.setIsTaskModal);
  const setRefetchTable = useStore((state) => state.setRefetchTable);

  const totalPages = tasks ? Math.ceil(tasks.length / ITEMS_PER_PAGE) : 0;

  const getCurrentPageItems = () => {
    if (!tasks) return [];
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    const endIndex = startIndex + ITEMS_PER_PAGE;
    return tasks.slice(startIndex, endIndex);
  };

  useEffect(() => {
    setRefetchTable(refetch);
  }, [refetch]);

  return (
    <div className="p-4">
      <div className="flex items-center justify-between">
        <h3 className="text-xl font-medium">Table</h3>
        <Button onClick={() => setIsTaskModal(true)}>New Task</Button>
      </div>
      {/* Table Tasks */}
      <div className="px-4 mt-6">
        <div className="bg-white rounded-lg shadow-md">
          <div className="overflow-auto h-[24.5rem]">
            <Table>
              <TableHeader className="sticky top-0 bg-white">
                <TableRow>
                  <TableHead className="w-48">Title</TableHead>
                  <TableHead className="w-64">Description</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Priority</TableHead>
                  <TableHead>Tags</TableHead>
                  <TableHead>Start Date</TableHead>
                  <TableHead>End Date</TableHead>
                  <TableHead>Assignee</TableHead>
                  <TableHead></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {loading ? (
                  <TableRow>
                    <TableCell colSpan={8} className="h-32">
                      <div className="flex items-center justify-center w-full h-full">
                        <Loader2 className="w-8 h-8 animate-spin" />
                      </div>
                    </TableCell>
                  </TableRow>
                ) : !tasks || tasks.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={8} className="py-8 text-center">
                      No tasks found
                    </TableCell>
                  </TableRow>
                ) : (
                  getCurrentPageItems().map((task, index) => (
                    <TableRow key={index} className="group">
                      <TableCell className="font-medium">
                        {task.title}
                      </TableCell>
                      <TableCell>{task.description}</TableCell>
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
                      <TableCell>
                        <div className="flex gap-1">
                          {task.tags?.map((tag, tagIndex) => (
                            <span
                              key={tagIndex}
                              className={clsx(
                                "bg-blue-100",
                                "text-blue-800 font-medium text-xs p-1.5 rounded-2xl cursor-default"
                              )}
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                      </TableCell>
                      <TableCell>{task.startDate}</TableCell>
                      <TableCell>{task.endDate}</TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <span className="text-sm">
                            {task.assignees.join(", ")}
                          </span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="p-2 transition-all rounded-md opacity-0 cursor-pointer group-hover:opacity-100 hover:bg-gray-100 w-fit">
                          <DropdownRemoveTask
                            idTask={task.id}
                            refetch={refetch}
                            className="w-5 h-5"
                          />
                        </div>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </div>
          {/* Pagination */}
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
    </div>
  );
};

export default TableTask;
