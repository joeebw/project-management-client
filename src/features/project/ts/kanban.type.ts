export interface DropIndicatorState {
  board: string | null;
  index: number | null;
}

export interface DragItem {
  card: Card;
  sourceBoard: string;
}

export interface Card {
  id: number;
  title: string;
  description: string;
  tags: string[] | null;
  startDate: string;
  endDate: string;
  assignees: string[];
  priority: "low" | "medium" | "high";
  hasComments: boolean;
}

export interface Board {
  completed: Card[];
  todo: Card[];
  in_progress: Card[];
  under_review: Card[];
  [key: string]: Card[];
}

export interface Comment {
  id: number;
  text: string;
  userName: string;
}

export interface User {
  id: number;
  userName: string;
}
