import KanbanCardCommentsList from "@/features/project/components/kanban/KanbanCardCommentsList";

type Props = {
  isCommentsOpen: boolean;
  taskId: number;
};

const KabanCardComments = ({ isCommentsOpen, taskId }: Props) => {
  return <>{isCommentsOpen && <KanbanCardCommentsList taskId={taskId} />}</>;
};

export default KabanCardComments;
