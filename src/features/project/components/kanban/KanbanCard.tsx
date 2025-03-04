import DropdownRemoveTask from "@/features/project/components/kanban/DropdownRemoveTask";
import KabanCardComments from "@/features/project/components/kanban/KanbanCardComments/KabanCardComments";
import PeopleAssigned from "@/features/project/components/kanban/PeopleAssigned";
import { tagPriorityColor } from "@/features/project/lib/project";
import { Card } from "@/features/project/ts/kanban.type";
import { useStore } from "@/state/useStore";
import clsx from "clsx";
import { MessageSquareMore } from "lucide-react";
import { useState } from "react";

type Props = {
  card: Card;
  boardName: string;
  index: number;
  onDragStart: (e: React.DragEvent, card: Card, sourceBoard: string) => void;
  onDragEnd: (e: React.DragEvent) => void;
  onDragOver: (e: React.DragEvent, board: string, index: number) => void;
  onDrop: (e: React.DragEvent, targetBoard: string, dropIndex: number) => void;
};

const KanbanCard = ({
  card,
  boardName,
  onDragStart,
  onDragEnd,
  onDragOver,
  onDrop,
  index,
}: Props) => {
  const [isCommentsOpen, setIsCommentsOpen] = useState(false);

  const refetchBoards = useStore((state) => state.refetchBoards);

  return (
    <div
      className="p-3.5 bg-white shadow-lg cursor-move rounded-xl"
      draggable
      onDragStart={(e) => onDragStart(e, card, boardName)}
      onDragEnd={onDragEnd}
      onDragOver={(e) => onDragOver(e, boardName, index)}
      onDrop={(e) => onDrop(e, boardName, index)}
    >
      <div className="flex justify-between">
        {/* Tags  */}
        <div className="flex gap-2 mb-2.5">
          <span
            className={clsx(
              tagPriorityColor[card.priority],
              "font-medium text-xs p-1.5 rounded-2xl cursor-default"
            )}
            key={card.priority}
          >
            {card.priority}
          </span>
          {card.tags?.map((tag) => (
            <span
              className={clsx(
                "bg-blue-100",
                "text-blue-800 font-medium text-xs p-1.5 rounded-2xl cursor-default"
              )}
              key={tag}
            >
              {tag}
            </span>
          ))}
        </div>

        <DropdownRemoveTask
          className="w-5"
          idTask={card.id}
          refetch={refetchBoards}
        />
      </div>

      <h3 className="font-semibold">{card.title}</h3>
      <div className="mt-1.5">
        <p className="text-sm font-medium text-gray-500">
          {card.startDate} - {card.endDate}
        </p>

        <p className="text-sm font-medium text-gray-500">{card.description}</p>
      </div>
      {/* Divider */}
      <div className="my-2 border-b border-gray-300" />

      <div className="flex items-center justify-between">
        <PeopleAssigned assignees={card.assignees} />
        <div className="relative">
          <MessageSquareMore
            className="w-5 h-5 text-black cursor-pointer"
            onClick={() => setIsCommentsOpen(!isCommentsOpen)}
          />
          {card.hasComments && (
            <div className="absolute w-4 h-4 text-xs text-white bg-blue-500 rounded-full -top-2 -right-2" />
          )}
        </div>
      </div>

      {/* Comments */}
      <KabanCardComments isCommentsOpen={isCommentsOpen} taskId={card.id} />
    </div>
  );
};

export default KanbanCard;
