import DropIndicator from "@/features/project/components/kanban/DropIndicator";
import EmptyBoardPlaceholder from "@/features/project/components/kanban/EmptyBoardPlaceholder";
import KanbanCard from "@/features/project/components/kanban/KanbanCard";
import { kanbanSections } from "@/features/project/ts/kanban.enum";
import { Card, DropIndicatorState } from "@/features/project/ts/kanban.type";
import { useStore } from "@/state/useStore";
import clsx from "clsx";
import { SquarePlus } from "lucide-react";
import { Fragment } from "react/jsx-runtime";

type Props = {
  boardName: string;
  title: string;
  cards: Card[] | undefined;
  dropIndicator: DropIndicatorState;
  onDragStart: (e: React.DragEvent, card: Card, sourceBoard: string) => void;
  onDragEnd: (e: React.DragEvent) => void;
  onDragOver: (e: React.DragEvent, board: string, index: number) => void;
  onDrop: (e: React.DragEvent, targetBoard: string, dropIndex: number) => void;
};

const borderSection: Record<string, string> = {
  [kanbanSections.todo]: "border-blue-500",
  [kanbanSections.inProgress]: "border-green-500",
  [kanbanSections.underReview]: "border-orange-500",
  [kanbanSections.completed]: "border-black",
};

export const KanbanColumn = ({
  boardName,
  title,
  cards,
  dropIndicator,
  onDragStart,
  onDragEnd,
  onDragOver,
  onDrop,
}: Props) => {
  const setIsTaskModal = useStore((state) => state.setIsTaskModal);

  const handleColumnDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    const column = e.currentTarget as HTMLElement;
    const columnRect = column.getBoundingClientRect();
    const y = e.clientY - columnRect.top;

    const cardHeight = 100;
    let nearestIndex = Math.floor(y / cardHeight);

    nearestIndex = Math.max(0, Math.min(nearestIndex, cards?.length ?? 0));

    onDragOver(e, boardName, nearestIndex);
  };

  return (
    <div
      className="bg-gray-100 rounded-lg min-h-96"
      onDragOver={handleColumnDragOver}
      onDrop={(e) =>
        onDrop(e, boardName, dropIndicator.index ?? cards?.length ?? 0)
      }
    >
      <div
        className={clsx(
          "flex justify-between p-4 mb-4 bg-white rounded-2xl",
          "border-l-8",
          borderSection[title]
        )}
      >
        <h2 className="text-lg font-bold">{title}</h2>
        <SquarePlus
          className="text-gray-700 transition-all cursor-pointer hover:text-blue-600"
          onClick={() => setIsTaskModal(true)}
        />
      </div>

      <div className="space-y-3">
        {cards?.map((card, index) => (
          <Fragment key={card.id}>
            {dropIndicator.board === boardName &&
              dropIndicator.index === index && <DropIndicator />}
            <KanbanCard
              card={card}
              boardName={boardName}
              index={index}
              onDragStart={onDragStart}
              onDragEnd={onDragEnd}
              onDragOver={onDragOver}
              onDrop={onDrop}
            />
          </Fragment>
        ))}

        {/* Área vacía al final de la columna */}
        <div
          className={`relative ${
            !cards || cards.length === 0
              ? "border-2 border-dashed border-gray-300 h-24"
              : "h-16"
          } rounded-lg`}
        >
          {(!cards || cards.length === 0) && <EmptyBoardPlaceholder />}
          {dropIndicator.board === boardName &&
            dropIndicator.index === (cards?.length ?? 0) && <DropIndicator />}
        </div>
      </div>
    </div>
  );
};
