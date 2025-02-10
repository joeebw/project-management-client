import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import TaskField from "@/features/project/components/list/TaskField";
import { Task } from "@/features/project/ts/list.type";
import useFetch from "@/hooks/useFetch";
import { useStore } from "@/state/useStore";
import { LoaderCircle } from "lucide-react";
import { useEffect } from "react";
import { useParams } from "react-router";

const List = () => {
  const { id } = useParams();
  const {
    data: tasks,
    loading,
    refetch,
  } = useFetch<Task[]>(`/task/tasks-project/?id=${id}&section=list`);
  const setIsTaskModal = useStore((state) => state.setIsTaskModal);
  const setRefetchList = useStore((state) => state.setRefetchList);

  useEffect(() => {
    setRefetchList(refetch);
  }, [refetch]);

  return (
    <div className="p-4">
      <div className="flex items-center justify-between">
        <h3 className="text-xl font-medium">List</h3>
        <Button onClick={() => setIsTaskModal(true)}>New Task</Button>
      </div>

      {loading ? (
        <div className="flex justify-center pt-24">
          <LoaderCircle className="w-9 h-9 animate-spin" />
        </div>
      ) : !tasks || tasks.length === 0 ? (
        <div className="flex items-center justify-center h-[250px]">
          <div className="text-muted-foreground">No tasks found</div>
        </div>
      ) : (
        <div className="grid grid-cols-3 gap-5 mt-6">
          {tasks.map((task) => (
            <Card key={task.id}>
              <CardContent className="flex flex-col gap-2 pt-6">
                <TaskField label="ID" value={task.id} />
                <TaskField label="Title" value={task.title} />
                <TaskField label="Description" value={task.description} />
                <TaskField label="Status" value={task.status} />
                <TaskField label="Priority" value={task.priority} />
                <TaskField label="Tags" value={task.tags?.join(", ")} />
                <TaskField label="Start Date" value={task.startDate} />
                <TaskField label="End Date" value={task.endDate} />
                <TaskField label="Assignee" value={task.assignees.join(", ")} />
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};

export default List;
