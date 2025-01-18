import { KanbanColumn } from "@/features/project/components/kanban/KanbanColumn";
import useKanbanBoard from "@/features/project/hooks/useKanbanBoard";
import { kanbanSections } from "@/features/project/ts/kanban.enum";
import { Board } from "@/features/project/ts/kanban.type";

type BoardConfig = {
  name: string;
  title: string;
};

const INITIAL_BOARDS: Board = {
  todo: [
    { id: "1", title: "Tarea 1", description: "Descripción de la tarea 1" },
    { id: "2", title: "Tarea 2", description: "Descripción de la tarea 2" },
  ],
  "in-progress": [
    { id: "3", title: "Tarea 3", description: "Descripción de la tarea 3" },
  ],
  "under-review": [
    { id: "4", title: "Tarea 4", description: "Descripción de la tarea 4" },
  ],
  completed: [
    { id: "5", title: "Tarea 5", description: "Descripción de la tarea 5" },
  ],
};

const KanbanBoard = () => {
  const {
    boards,
    dropIndicator,
    handleDragStart,
    handleDragEnd,
    handleDragOver,
    handleDrop,
  } = useKanbanBoard(INITIAL_BOARDS);

  const boardConfig: BoardConfig[] = [
    { name: "todo", title: kanbanSections.todo },
    { name: "in-progress", title: kanbanSections.inProgress },
    { name: "under-review", title: kanbanSections.underReview },
    { name: "completed", title: kanbanSections.completed },
  ];

  return (
    <div className="py-4">
      <div className="grid grid-cols-4 gap-4 text-black">
        {boardConfig.map(({ name, title }) => (
          <KanbanColumn
            key={name}
            boardName={name}
            title={title}
            cards={boards[name]}
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
