import PeopleAssigned from "@/features/project/components/kanban/PeopleAssigned";
import { Card } from "@/features/project/ts/kanban.type";
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

  return (
    <div
      className="p-3.5 bg-white shadow cursor-move rounded-xl"
      draggable
      onDragStart={(e) => onDragStart(e, card, boardName)}
      onDragEnd={onDragEnd}
      onDragOver={(e) => onDragOver(e, boardName, index)}
      onDrop={(e) => onDrop(e, boardName, index)}
    >
      <h3 className="font-semibold">{card.title}</h3>
      <div className="mt-1.5">
        <p className="text-sm font-medium text-gray-500">11-4-2024</p>
        <p className="text-sm font-medium text-gray-500">{card.description}</p>
      </div>
      {/* Divider */}
      <div className="my-2 border-b border-gray-300" />

      <div className="flex items-center justify-between">
        <PeopleAssigned />
        <MessageSquareMore
          className="w-5 h-5 text-gray-700 cursor-pointer"
          onClick={() => setIsCommentsOpen(!isCommentsOpen)}
        />
      </div>

      {/* Comments */}
      {isCommentsOpen && (
        <div className="p-2 mt-3 text-sm bg-gray-100 rounded-md max-h-[7rem] overflow-y-auto">
          <p>Hola Como estan Guys? Yo bien y ustedes?</p>
          <div className="my-1 border-b border-gray-300" />
          <p>Hola Como estan Guys? Yo bien y ustedes?</p>
        </div>
      )}
    </div>
  );
};

export default KanbanCard;
