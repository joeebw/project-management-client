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
