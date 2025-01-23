import { KanbanColumn } from "@/features/project/components/kanban/KanbanColumn";
import useKanbanBoard from "@/features/project/hooks/useKanbanBoard";
import { kanbanSections } from "@/features/project/ts/kanban.enum";
import { Board } from "@/features/project/ts/kanban.type";
import useFetch from "@/hooks/useFetch";
import { useParams } from "react-router";

type BoardConfig = {
  name: string;
  title: string;
};

const boardConfig: BoardConfig[] = [
  { name: "todo", title: kanbanSections.todo },
  { name: "in-progress", title: kanbanSections.inProgress },
  { name: "under-review", title: kanbanSections.underReview },
  { name: "completed", title: kanbanSections.completed },
];

const KanbanBoard = () => {
  const { id } = useParams();
  const { data: initialBoards } = useFetch<Board>(
    `/task/tasks-project/?id=${id}`
  );

  const {
    boards,
    dropIndicator,
    handleDragStart,
    handleDragEnd,
    handleDragOver,
    handleDrop,
  } = useKanbanBoard(initialBoards);

  return (
    <div className="py-4">
      <div className="grid grid-cols-4 gap-4 text-black">
        {boardConfig.map(({ name, title }) => (
          <KanbanColumn
            key={name}
            boardName={name}
            title={title}
            cards={boards?.[name]}
            dropIndicator={dropIndicator}
            onDragStart={handleDragStart}
            onDragEnd={handleDragEnd}
            onDragOver={handleDragOver}
            onDrop={handleDrop}
          />
        ))}
      </div>
    </div>
  );
};

export default KanbanBoard;
