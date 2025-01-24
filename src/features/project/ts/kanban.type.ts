export interface DropIndicatorState {
  board: string | null;
  index: number | null;
}

export interface DragItem {
  card: Card;
  sourceBoard: string;
}

export interface Tags {
  tag: string;
  color: string;
}

export interface Card {
  id: number;
  title: string;
  description: string;
  tags: Tags[];
  startDate: string;
  endDate: string;
  assignees: string[];
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
