import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import useFetch from "@/hooks/useFetch";
import {
  getStatusColor,
  tagPriorityColor,
} from "@/features/project/lib/project";
import clsx from "clsx";
import { useParams } from "react-router";
import { useStore } from "@/state/useStore";

import DropdownRemoveTask from "@/features/project/components/kanban/DropdownRemoveTask";
import CustomTable, { Column } from "@/components/CustomeTable";

export type Task = {
  id: string | number;
  title: string;
  description: string;
  status: string;
  priority: string;
  tags?: string[];
  startDate: string;
  endDate: string;
  assignees: string[];
};

const TableTask = () => {
  const { id } = useParams();
  const {
    data: tasks,
    loading,
    refetch,
  } = useFetch<Task[]>(`/task/tasks-project/?id=${id}&section=list`);

  const setIsTaskModal = useStore((state) => state.setIsTaskModal);
  const setRefetchTable = useStore((state) => state.setRefetchTable);

  useEffect(() => {
    setRefetchTable(refetch);
  }, [refetch]);

  const columns: Column<Task>[] = [
    {
      field: "title",
      header: "Title",
      width: 200,
    },
    {
      field: "description",
      header: "Description",
      width: 250,
    },
    {
      field: "status",
      header: "Status",
      width: 150,
      render: (value) => {
        const status = value as Task["status"];
        return (
          <span
            className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(
              status
            )}`}
          >
            {status}
          </span>
        );
      },
    },
    {
      field: "priority",
      header: "Priority",
      width: 150,
      render: (value) => {
        const priority = value as Task["priority"];
        return (
          <span
            className={`px-2 py-1 rounded-full text-xs font-medium ${tagPriorityColor[priority]}`}
          >
            {priority}
          </span>
        );
      },
    },
    {
      field: "tags",
      header: "Tags",
      width: 200,
      render: (value) => {
        const tags = value as Task["tags"];
        return (
          <div className="flex gap-1">
            {tags?.map((tag, tagIndex) => (
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
        );
      },
    },
    {
      field: "startDate",
      header: "Start Date",
      width: 150,
    },
    {
      field: "endDate",
      header: "End Date",
      width: 150,
    },
    {
      field: "assignees",
      header: "Assignee",
      width: 200,
      render: (value) => {
        const assignees = value as Task["assignees"];
        return (
          <div className="flex items-center gap-2">
            <span className="text-sm">{assignees.join(", ")}</span>
          </div>
        );
      },
    },
    {
      field: "id",
      header: "",
      width: 100,
      render: (value) => {
        const id = value as Task["id"];
        return (
          <div className="p-2 transition-all rounded-md opacity-0 cursor-pointer group-hover:opacity-100 hover:bg-gray-100 w-fit">
            <DropdownRemoveTask
              idTask={id as number}
              refetch={refetch}
              className="w-5 h-5"
            />
          </div>
        );
      },
    },
  ];

  return (
    <div className="p-4">
      <div className="flex items-center justify-between">
        <h3 className="text-xl font-medium">Table</h3>
        <Button onClick={() => setIsTaskModal(true)}>New Task</Button>
      </div>

      <div className="px-4 mt-6">
        <div className="bg-white rounded-lg shadow-md">
          <CustomTable<Task> data={tasks} columns={columns} loading={loading} />
        </div>
      </div>
    </div>
  );
};

export default TableTask;
