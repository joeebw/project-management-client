import {
  Board,
  Card,
  DragItem,
  DropIndicatorState,
} from "@/features/project/ts/kanban.type";
import { useState } from "react";

const useKanbanBoard = (initialBoards: Board) => {
  const [boards, setBoards] = useState<Board>(initialBoards);
  const [draggedItem, setDraggedItem] = useState<DragItem | null>(null);
  const [dropIndicator, setDropIndicator] = useState<DropIndicatorState>({
    board: null,
    index: null,
  });

  const handleDragStart = (
    e: React.DragEvent,
    card: Card,
    sourceBoard: string
  ) => {
    setDraggedItem({ card, sourceBoard });
    e.dataTransfer.setData(
      "application/json",
      JSON.stringify({ card, sourceBoard })
    );
    const target = e.target as HTMLElement;
    target.style.opacity = "0.5";
  };

  const handleDragEnd = (e: React.DragEvent) => {
    const target = e.target as HTMLElement;
    target.style.opacity = "1";
    setDraggedItem(null);
    setDropIndicator({ board: null, index: null });
  };

  const handleDragOver = (e: React.DragEvent, board: string, index: number) => {
    e.preventDefault();
    if (!draggedItem) return;

    const rect = (e.currentTarget as HTMLElement).getBoundingClientRect();
    const y = e.clientY - rect.top;
    const height = rect.height;

    if (y > height / 2) {
      index += 1;
    }

    setDropIndicator({ board, index });
  };

  const handleDrop = (
    e: React.DragEvent,
    targetBoard: string,
    dropIndex: number
  ) => {
    e.preventDefault();

    const data = JSON.parse(
      e.dataTransfer.getData("application/json")
    ) as DragItem;
    const { card, sourceBoard } = data;

    if (
      sourceBoard === targetBoard &&
      dropIndex === boards[targetBoard].findIndex((c) => c.id === card.id)
    ) {
      return;
    }

    setBoards((prev) => {
      const newBoards = { ...prev };
      newBoards[sourceBoard] = prev[sourceBoard].filter(
        (c) => c.id !== card.id
      );
      const targetCards = [...newBoards[targetBoard]];
      targetCards.splice(dropIndex, 0, card);
      newBoards[targetBoard] = targetCards;
      return newBoards;
    });

    setDropIndicator({ board: null, index: null });
  };

  return {
    boards,
    dropIndicator,
    handleDragStart,
    handleDragEnd,
    handleDragOver,
    handleDrop,
  };
};

export default useKanbanBoard;
