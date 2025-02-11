import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import FormInput from "@/components/FormInput";
import DatePicker from "@/features/project/components/DatePickerStart";
import SelectPriority from "@/features/project/components/modalCreateTask/SelectPriority";
import SelectStatus from "@/features/project/components/modalCreateTask/SelectStatus";
import SelectUser from "@/features/project/components/modalCreateTask/selectUser/SelectUser";

import useModalCreateTask from "@/features/project/hooks/useModalCreateTask/useModalCreateTask";
import { Loader2 } from "lucide-react";

const ModalCreateTask = () => {
  const {
    startDate,
    setStartDate,
    endDate,
    setEndDate,
    dateErrors,
    createTaskForm,
    isTaskModal,
    handleOpenChange,
    onSubmit,
  } = useModalCreateTask();

  return (
    <Dialog modal open={isTaskModal} onOpenChange={handleOpenChange}>
      <DialogContent
        onPointerDownOutside={(e) => e.preventDefault()}
        onEscapeKeyDown={(e) => e.preventDefault()}
      >
        <DialogHeader>
          <DialogTitle>Create New Task</DialogTitle>
        </DialogHeader>
        <form
          className="flex flex-col gap-4"
          onSubmit={createTaskForm.handleSubmit(onSubmit)}
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
              placeholder="Select start date"
              value={startDate}
              onChange={setStartDate}
              error={dateErrors.startDate}
            />
            <DatePicker
              placeholder="Select end date"
              value={endDate}
              onChange={setEndDate}
              minDate={startDate}
              error={dateErrors.endDate}
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
