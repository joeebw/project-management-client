import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import FormInput from "@/features/auth/components/FormInput";
import DatePicker from "@/features/project/components/DatePickerStart";
import useModalCreteProject from "@/features/project/hooks/useModalCreateProject";
import { Loader2 } from "lucide-react";

const ModalCreateProject = () => {
  const {
    createProjectForm,
    handleCreateProject,
    handleOpenChange,
    isProjectModal,
    dateErrors,
    endDate,
    setEndDate,
    setStartDate,
    startDate,
    isLoading,
  } = useModalCreteProject();

  return (
    <Dialog modal open={isProjectModal} onOpenChange={handleOpenChange}>
      <DialogContent
        onPointerDownOutside={(e) => e.preventDefault()}
        onEscapeKeyDown={(e) => e.preventDefault()}
      >
        <DialogHeader>
          <DialogTitle>Create New Project</DialogTitle>
        </DialogHeader>
        <form
          className="flex flex-col gap-4"
          onSubmit={createProjectForm.handleSubmit(handleCreateProject)}
        >
          <FormInput
            placeholder="Project Name"
            type="text"
            register={createProjectForm.register("projectName")}
            error={createProjectForm.formState.errors.projectName}
          />

          <div>
            <Textarea
              placeholder="Description."
              className="resize-none"
              {...createProjectForm.register("description")}
            />
            {createProjectForm.formState.errors.description && (
              <p className="text-sm text-red-500">
                {createProjectForm.formState.errors.description.message}
              </p>
            )}
          </div>

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

          <Button className="w-full mt-1" type="submit">
            {isLoading && <Loader2 className="mr-2 animate-spin" />}
            Create Project
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default ModalCreateProject;
