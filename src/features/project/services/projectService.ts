import { Card } from "@/features/project/ts/kanban.type";
import { CreateTaskParam } from "@/features/project/ts/projectService.type";
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

export default {
  updateStatusTask,
  createTask,
};
