import { KanbanColumn } from "@/features/project/components/kanban/KanbanColumn";
import useKanbanBoard from "@/features/project/hooks/useKanbanBoard";
import { kanbanSections } from "@/features/project/ts/kanban.enum";
import { Board } from "@/features/project/ts/kanban.type";
import useFetch from "@/hooks/useFetch";
import { useStore } from "@/state/useStore";
import { Loader2 } from "lucide-react";
import { useEffect, useState } from "react";
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
  const [artificialLoading, setArtificialLoading] = useState(true);
  const {
    data: initialBoards,
    refetch: refetchBoards,
    loading,
  } = useFetch<Board>(`/task/tasks-project/?id=${id}`);
  const setRefetchBoards = useStore((state) => state.setRefetchBoards);

  const {
    boards,
    dropIndicator,
    handleDragStart,
    handleDragEnd,
    handleDragOver,
    handleDrop,
  } = useKanbanBoard(initialBoards);

  useEffect(() => {
    setRefetchBoards(refetchBoards);
  }, [refetchBoards]);

  useEffect(() => {
    setArtificialLoading(true);
  }, [id]);

  useEffect(() => {
    if (!loading) {
      const timer = setTimeout(() => {
        setArtificialLoading(false);
      }, 10);

      return () => clearTimeout(timer);
    }
  }, [loading]);

  const isLoading = loading || artificialLoading;

  return (
    <div className="py-4">
      <div className="grid grid-cols-4 gap-4 text-black">
        {isLoading ? (
          <div className="flex justify-center col-span-4 pt-28">
            <Loader2 className="w-8 h-8 animate-spin" />
          </div>
        ) : (
          boardConfig.map(({ name, title }) => (
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
          ))
        )}
      </div>
    </div>
  );
};

export default KanbanBoard;
