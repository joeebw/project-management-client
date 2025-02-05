export type CreateTaskParam = {
  title: string;
  description: string;
  status: string;
  priority: string;
  assignedUserIds: number[];
  startDate: Date;
  endDate: Date;
  tags: string[] | null;
  projectId: number;
};

export type RespCreateTask = {
  id: number;
};

export type CreateProjectParam = {
  projectName: string;
  description: string;
  startDate: Date;
  endDate: Date;
};
