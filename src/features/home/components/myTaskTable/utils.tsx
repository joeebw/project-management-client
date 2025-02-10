import { Column } from "@/components/CustomeTable";
import {
  getStatusColor,
  tagPriorityColor,
} from "@/features/project/lib/project";

export type MyTask = {
  id: string | number;
  title: string;
  status: "pending" | "in_progress" | "completed" | "cancelled" | string;
  priority: "low" | "medium" | "high" | string;
  endDate: string;
};

export const columns: Column<MyTask>[] = [
  {
    field: "title" as keyof MyTask,
    header: "Title",
    width: 200,
  },
  {
    field: "status" as keyof MyTask,
    header: "Status",
    width: 150,
    render: (value) => (
      <span
        className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(
          value as string
        )}`}
      >
        {value}
      </span>
    ),
  },
  {
    field: "priority" as keyof MyTask,
    header: "Priority",
    width: 150,
    render: (value) => (
      <span
        className={`px-2 py-1 rounded-full text-xs font-medium ${
          tagPriorityColor[value as string]
        }`}
      >
        {value}
      </span>
    ),
  },
  {
    field: "endDate" as keyof MyTask,
    header: "End Date",
    width: 150,
  },
];
