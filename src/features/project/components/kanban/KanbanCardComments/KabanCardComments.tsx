import InputComments from "@/features/project/components/kanban/KanbanCardComments/InputComments";
import KanbanCardCommentsList from "@/features/project/components/kanban/KanbanCardComments/KanbanCardCommentsList";

type Props = {
  isCommentsOpen: boolean;
  taskId: number;
};

const KabanCardComments = ({ isCommentsOpen, taskId }: Props) => {
  return (
    <>
      {isCommentsOpen && (
        <>
          <KanbanCardCommentsList taskId={taskId} />
          <InputComments taskId={taskId} />
        </>
      )}
    </>
  );
};

export default KabanCardComments;
