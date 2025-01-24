import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import DropdownRemove from "@/features/project/components/kanban/DropdownRemove";
import { Comment } from "@/features/project/ts/kanban.type";
import useFetch from "@/hooks/useFetch";
import { Fragment } from "react/jsx-runtime";

type Props = {
  taskId: number;
};

const KanbanCardCommentsList = ({ taskId }: Props) => {
  const { data: comments } = useFetch<Comment[]>(`/task/comment/?id=${taskId}`);

  return (
    <div className="p-2 mt-3 text-sm bg-gray-100 rounded-md max-h-[7rem] overflow-y-auto cursor-default">
      {comments?.map(({ id, text, userName }, idx) => (
        <Fragment key={id}>
          <div className="flex items-center justify-between">
            <div className="flex gap-2">
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger>
                    <Avatar className="w-6 h-6">
                      <AvatarImage
                        src={`https://avatar.iran.liara.run/username?username=${userName.replace(
                          " ",
                          "+"
                        )}`}
                      />
                      <AvatarFallback>
                        <Skeleton className="w-5 h-5 rounded-full" />
                      </AvatarFallback>
                    </Avatar>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>{userName}</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
              <p>{text}</p>
            </div>

            <DropdownRemove className="w-4" />
          </div>
          {idx !== comments.length - 1 && (
            <div className="my-1.5 border-b border-gray-300" />
          )}
        </Fragment>
      ))}
    </div>
  );
};

export default KanbanCardCommentsList;
