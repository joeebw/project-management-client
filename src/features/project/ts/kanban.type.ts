export interface Card {
  id: string;
  title: string;
  description: string;
}

export interface Board {
  [key: string]: Card[];
}

export interface DropIndicatorState {
  board: string | null;
  index: number | null;
}

export interface DragItem {
  card: Card;
  sourceBoard: string;
}
