import { Card } from "@/features/project/ts/kanban.type";
import {
  CreateProjectParam,
  CreateTaskParam,
  RespCreateTask,
} from "@/features/project/ts/projectService.type";
import api from "@/lib/apiService";
import { getErrorMessage } from "@/lib/utils";

const updateStatusTask = async (card: Card, targetBoard: string) => {
  try {
    await api.put(`/task/update/?id=${card.id}`, { status: targetBoard });
  } catch (err) {
    throw getErrorMessage(err);
  }
};

const createTask = async (creatTaskData: CreateTaskParam) => {
  try {
    await api.post("/task/create", creatTaskData);
  } catch (err) {
    throw getErrorMessage(err);
  }
};

const removeComment = async (idComment: number) => {
  try {
    await api.delete(`/task/comment/?id=${idComment}`);
  } catch (err) {
    throw getErrorMessage(err);
  }
};

const createProject = async (createProjectData: CreateProjectParam) => {
  const { description, endDate, projectName, startDate } = createProjectData;
  try {
    const response = await api.post<RespCreateTask>("/project/create", {
      name: projectName,
      description: description,
      startDate,
      endDate,
    });
    return response.data;
  } catch (err) {
    throw getErrorMessage(err);
  }
};

export default {
  updateStatusTask,
  createTask,
  removeComment,
  createProject,
};
