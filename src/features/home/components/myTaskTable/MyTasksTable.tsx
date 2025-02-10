import { Card, CardContent, CardHeader } from "@/components/ui/card";
import useFetch from "@/hooks/useFetch";
import { columns } from "@/features/home/components/myTaskTable/utils";
import CustomTable from "@/components/CustomeTable";

export type MyTask = {
  id: string | number;
  title: string;
  status: "pending" | "in_progress" | "completed" | "cancelled" | string;
  priority: "low" | "medium" | "high" | string;
  endDate: string;
};

const ITEMS_PER_PAGE = 6;

const MyTasksTable = () => {
  const { data: tasks, loading } = useFetch<MyTask[]>(`/task/my-tasks`);

  return (
    <Card className="mt-6">
      <CardHeader className="pb-3">
        <h3 className="text-xl font-medium">Your Tasks</h3>
      </CardHeader>

      <CardContent>
        <div className="bg-white rounded-lg shadow-md">
          <CustomTable<MyTask>
            data={tasks}
            columns={columns}
            loading={loading}
            itemsPerPage={ITEMS_PER_PAGE}
          />
        </div>
      </CardContent>
    </Card>
  );
};

export default MyTasksTable;
