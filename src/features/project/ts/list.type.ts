import { Card } from "@/features/project/ts/kanban.type";

export interface Task extends Card {
  status: string;
}
