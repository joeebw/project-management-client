import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import FormInput from "@/features/auth/components/FormInput";
import DatePicker from "@/features/project/components/modal/DatePickerStart";
import SelectPriority from "@/features/project/components/modal/SelectPriority";
import SelectStatus from "@/features/project/components/modal/SelectStatus";
import SelectUser from "@/features/project/components/modal/selectUser/SelectUser";
import useTask from "@/features/project/hooks/useTask";
import { useStore } from "@/state/useStore";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2 } from "lucide-react";
import { useForm } from "react-hook-form";
import { z } from "zod";

const createTaskSchema = z.object({
  title: z.string().min(1).max(100),
  description: z.string().max(500),
  status: z.string(),
  priority: z.string(),
  tags: z.string().max(200).optional(),
  assignedUserIds: z
    .array(z.string())
    .min(1, "At least one user must be assigned")
    .max(10, "Cannot assign more than 10 users"),
  startDate: z.date(),
  endDate: z.date(),
});

export type CreateFormData = z.infer<typeof createTaskSchema>;

const ModalCreateTask = () => {
  const createTaskForm = useForm<CreateFormData>({
    resolver: zodResolver(createTaskSchema),
  });

  const isTaskModal = useStore((state) => state.isTaskModal);
  const setIsTaskModal = useStore((state) => state.setIsTaskModal);
  const { handleCreateTask } = useTask();

  return (
    <Dialog modal open={isTaskModal} onOpenChange={setIsTaskModal}>
      <DialogContent
        onPointerDownOutside={(e) => e.preventDefault()}
        onEscapeKeyDown={(e) => e.preventDefault()}
      >
        <DialogHeader>
          <DialogTitle>Create new Task</DialogTitle>
        </DialogHeader>
        <form
          className="flex flex-col gap-4"
          onSubmit={createTaskForm.handleSubmit(handleCreateTask)}
        >
          <FormInput
            type="text"
            placeholder="Title"
            register={createTaskForm.register("title")}
            error={createTaskForm.formState.errors.title}
          />

          <FormInput
            type="text"
            placeholder="Description"
            register={createTaskForm.register("description")}
            error={createTaskForm.formState.errors.description}
          />

          <div className="flex gap-4">
            <SelectStatus
              name="status"
              control={createTaskForm.control}
              error={createTaskForm.formState.errors.status}
            />
            <SelectPriority
              control={createTaskForm.control}
              name="priority"
              error={createTaskForm.formState.errors.priority}
            />
          </div>

          <FormInput
            type="text"
            placeholder="Tags (comma separated)"
            register={createTaskForm.register("tags")}
            error={createTaskForm.formState.errors.tags}
          />

          <div className="flex gap-4">
            <DatePicker
              name="startDate"
              placeholder="Select start date"
              control={createTaskForm.control}
              error={createTaskForm.formState.errors.startDate}
            />
            <DatePicker
              name="endDate"
              placeholder="Select end date"
              control={createTaskForm.control}
              minDate={createTaskForm.watch("startDate")}
              error={createTaskForm.formState.errors.endDate}
            />
          </div>

          <SelectUser
            control={createTaskForm.control}
            error={createTaskForm.formState.errors.assignedUserIds}
          />

          <Button
            className="w-full"
            type="submit"
            disabled={createTaskForm.formState.isSubmitting}
          >
            {createTaskForm.formState.isSubmitting && (
              <Loader2 className="mr-2 animate-spin" />
            )}
            Create Task
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default ModalCreateTask;
