import {
  Board,
  Card,
  DragItem,
  DropIndicatorState,
} from "@/features/project/ts/kanban.type";
import { useEffect, useRef, useState } from "react";

const useKanbanBoard = (initialBoards: Board | undefined) => {
  const [boards, setBoards] = useState<Board>();
  const draggedItemRef = useRef<DragItem | null>(null);
  const [dropIndicator, setDropIndicator] = useState<DropIndicatorState>({
    board: null,
    index: null,
  });

  const handleDragStart = (
    e: React.DragEvent,
    card: Card,
    sourceBoard: string
  ) => {
    draggedItemRef.current = { card, sourceBoard };
    e.dataTransfer.effectAllowed = "move";
    e.dataTransfer.setData(
      "application/json",
      JSON.stringify({ card, sourceBoard })
    );
  };

  const handleDragOver = (e: React.DragEvent, board: string, index: number) => {
    e.preventDefault();
    const draggedItem = draggedItemRef.current;
    if (!draggedItem) return;

    const rect = (e.currentTarget as HTMLElement).getBoundingClientRect();
    const y = e.clientY - rect.top;

    let adjustedIndex = index;
    if (y > rect.height / 2) {
      adjustedIndex += 1;
    }

    const maxIndex = boards?.[board]?.length ?? 0;
    const safeIndex = Math.max(0, Math.min(adjustedIndex, maxIndex));

    if (dropIndicator.board !== board || dropIndicator.index !== safeIndex) {
      setDropIndicator({ board, index: safeIndex });
    }
  };

  const handleDragEnd = () => {
    draggedItemRef.current = null;
    setDropIndicator({ board: null, index: null });
  };

  const handleDrop = async (
    e: React.DragEvent,
    targetBoard: string,
    dropIndex: number
  ) => {
    e.preventDefault();
    const draggedItem = draggedItemRef.current;
    if (!draggedItem || !boards) return;

    const { card, sourceBoard } = draggedItem;
    const sourceIndex = boards[sourceBoard]?.findIndex((c) => c.id === card.id);

    if (sourceBoard === targetBoard && dropIndex === sourceIndex) return;

    setBoards((prev) => {
      if (!prev) return prev;
      const newBoards = structuredClone(prev);

      newBoards[sourceBoard] = newBoards[sourceBoard].filter(
        (c) => c.id !== card.id
      );

      if (!newBoards[targetBoard]) newBoards[targetBoard] = [];
      const targetCards = [...newBoards[targetBoard]];
      targetCards.splice(dropIndex, 0, card);
      newBoards[targetBoard] = targetCards;

      return newBoards;
    });

    draggedItemRef.current = null;
    setDropIndicator({ board: null, index: null });
  };

  useEffect(() => {
    setBoards(initialBoards);
  }, [initialBoards]);

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
