import { CreateFormData } from "@/features/project/components/modal/ModalCreateTask";
import projectService from "@/features/project/services/projectService";
import { useParams } from "react-router";

const useTask = () => {
  const { id } = useParams();

  const handleCreateTask = async (data: CreateFormData) => {
    if (!id) return;

    try {
      await projectService.createTask({
        ...data,
        tags: data.tags ? data.tags.split(",") : null,
        assignedUserIds: data.assignedUserIds.map((id) => Number(id)),
        projectId: Number(id),
      });
    } catch (err) {
      console.error(err);
    }
  };

  return { handleCreateTask };
};

export default useTask;
