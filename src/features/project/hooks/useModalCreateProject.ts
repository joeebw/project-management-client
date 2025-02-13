import { DateErrors } from "@/features/project/hooks/useModalCreateTask/utils";
import projectService from "@/features/project/services/projectService";
import { useStore } from "@/state/useStore";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router";
import { toast } from "sonner";
import { z } from "zod";

export const createProjectFormSchema = z.object({
  projectName: z.string().min(1).max(100),
  description: z.string().max(500),
});

export type CreateProjectForm = z.infer<typeof createProjectFormSchema>;

const modalProjectDefaultValues = {
  projectName: "",
  description: "",
};

const useModalCreteProject = () => {
  const [startDate, setStartDate] = useState<Date>();
  const [endDate, setEndDate] = useState<Date>();
  const [dateErrors, setDateErrors] = useState<DateErrors>({
    startDate: "",
    endDate: "",
  });
  const [isLoading, setIsLoading] = useState(false);

  const setIsProjectModal = useStore((state) => state.setIsProjectModal);
  const isProjectModal = useStore((state) => state.isProjectModal);
  const refetchProjects = useStore((state) => state.refetchProjects);
  const navigate = useNavigate();

  const createProjectForm = useForm<CreateProjectForm>({
    resolver: zodResolver(createProjectFormSchema),
    defaultValues: modalProjectDefaultValues,
  });

  const resetDatePicker = () => {
    setStartDate(undefined);
    setEndDate(undefined);
    setDateErrors({ startDate: "", endDate: "" });
  };

  const handleOpenChange = (bool: boolean) => {
    setIsProjectModal(false);
    if (!bool) {
      createProjectForm.reset(modalProjectDefaultValues);
      resetDatePicker();
    }
  };

  const handleCreateProject = async (data: CreateProjectForm) => {
    const errors = {
      startDate: !startDate ? "Start date is required" : "",
      endDate: !endDate ? "End date is required" : "",
    };
    setDateErrors(errors);
    if (!startDate || !endDate) return;

    try {
      setIsLoading(true);
      const responseProject = await projectService.createProject({
        projectName: data.projectName,
        description: data.description,
        startDate,
        endDate,
      });

      createProjectForm.reset(modalProjectDefaultValues);
      resetDatePicker();

      refetchProjects?.();

      toast.success("Project created successfully.");

      setIsProjectModal(false);

      navigate(`/home/project/${responseProject.id}/${data.projectName}`);
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  return {
    isProjectModal,
    handleOpenChange,
    createProjectForm,
    handleCreateProject,
    startDate,
    setStartDate,
    endDate,
    setEndDate,
    dateErrors,
    isLoading,
  };
};

export default useModalCreteProject;
