import {
  CreateFormData,
  modalTaskDefaultValues,
} from "@/features/project/hooks/useModalCreateTask/utils";
import projectService from "@/features/project/services/projectService";
import { useStore } from "@/state/useStore";
import { UseFormReturn } from "react-hook-form";
import { useParams } from "react-router";
import { toast } from "sonner";

type CreateTaskForm = UseFormReturn<
  {
    title: string;
    description: string;
    status: string;
    priority: string;
    assignedUserIds: string[];
    tags?: string | undefined;
  },
  any,
  undefined
>;

type ResetDatePicker = () => void;

const useTask = () => {
  const { id } = useParams();
  const setIsTaskModal = useStore((state) => state.setIsTaskModal);

  const handleCreateTask = async (
    data: CreateFormData & { startDate: Date; endDate: Date },
    createTaskForm: CreateTaskForm,
    resetDatePicker: ResetDatePicker,
    refetchFunction: () => void
  ) => {
    if (!id) return;

    try {
      await projectService.createTask({
        ...data,
        tags: data.tags ? data.tags.split(",") : null,
        assignedUserIds: data.assignedUserIds.map((id) => Number(id)),
        projectId: Number(id),
      });
      createTaskForm.reset(modalTaskDefaultValues);
      resetDatePicker();
      setIsTaskModal(false);
      refetchFunction();
      toast.success("Task created successfully!!");
    } catch (err) {
      console.error(err);
    }
  };

  return { handleCreateTask };
};

export default useTask;
