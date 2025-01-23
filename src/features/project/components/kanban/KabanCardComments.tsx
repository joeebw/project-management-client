import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import DropdownRemove from "@/features/project/components/kanban/DropdownRemove";
import { Fragment } from "react/jsx-runtime";

type Props = {
  isCommentsOpen: boolean;
};

const COMMENTS = [
  {
    id: 0,
    text: "Hola bro",
    userName: "Bodo",
  },
  {
    id: 1,
    text: "Todo excelente y tu?",
    userName: "Alex",
  },
];

const KabanCardComments = ({ isCommentsOpen }: Props) => {
  return (
    <>
      {isCommentsOpen && (
        <div className="p-2 mt-3 text-sm bg-gray-100 rounded-md max-h-[7rem] overflow-y-auto cursor-default">
          {COMMENTS.map((comment, idx) => (
            <Fragment key={comment.id}>
              <div className="flex items-center justify-between">
                <div className="flex gap-2">
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger>
                        <Avatar className="w-6 h-6">
                          <AvatarImage
                            src={`https://avatar.iran.liara.run/username?username=${comment.userName.replace(
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
                        <p>{comment.userName}</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                  <p>{comment.text}</p>
                </div>

                <DropdownRemove className="w-4" />
              </div>
              {idx !== COMMENTS.length - 1 && (
                <div className="my-1.5 border-b border-gray-300" />
              )}
            </Fragment>
          ))}
        </div>
      )}
    </>
  );
};

export default KabanCardComments;
