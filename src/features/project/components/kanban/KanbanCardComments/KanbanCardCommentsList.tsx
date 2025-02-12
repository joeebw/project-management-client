import { Skeleton } from "@/components/ui/skeleton";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import UserAvatar from "@/components/UserAvatar";
import DropdownRemoveComment from "@/features/project/components/kanban/KanbanCardComments/DropdownRemoveComment";
import { Comment } from "@/features/project/ts/kanban.type";
import useFetch from "@/hooks/useFetch";
import { useStore } from "@/state/useStore";
import { Fragment } from "react/jsx-runtime";

type Props = {
  taskId: number;
};

const KanbanCardCommentsList = ({ taskId }: Props) => {
  const comments = useStore((state) => state.comments[taskId]);
  const setComments = useStore((state) => state.setComments);

  const { loading, refetch } = useFetch<Comment[]>(
    `/task/comment/?id=${taskId}`,
    {
      onSuccess: (data) => {
        setComments(taskId, data);
      },
    }
  );

  if (loading) {
    return <Skeleton className="w-full mt-3 h-[7rem]" />;
  }

  return (
    <div className="p-2 mt-3 text-sm bg-gray-100 rounded-md h-[7rem] overflow-y-auto cursor-default">
      {comments?.map(({ id, text, userName }, idx) => (
        <Fragment key={id}>
          <div className="flex items-center justify-between">
            <div className="flex items-start gap-2">
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger className="flex-shrink-0">
                    <UserAvatar
                      isLoading={false}
                      name={userName}
                      size="xs"
                      className="p-1"
                    />
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>{userName}</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
              <p className="break-words">{text}</p>
            </div>

            <DropdownRemoveComment
              className="w-4"
              idComment={id}
              refetch={refetch}
            />
          </div>
          {idx !== comments.length - 1 && (
            <div className="my-1.5 border-b border-gray-300" />
          )}
        </Fragment>
      ))}

      {comments?.length === 0 && (
        <span className="flex items-center justify-center font-medium text-sm text-gray-900 h-[7rem]">
          There are no comments yet.
        </span>
      )}
    </div>
  );
};

export default KanbanCardCommentsList;
