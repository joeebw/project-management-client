import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Tooltip,
  TooltipProvider,
  TooltipTrigger,
  TooltipContent,
} from "@/components/ui/tooltip";
import clsx from "clsx";

type Props = {
  assignees: string[];
};

const PeopleAssigned = ({ assignees }: Props) => {
  return (
    <div className="flex items-center">
      {assignees.map((name, idx) => (
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger>
              <Avatar className={clsx("w-7 h-7", idx > 0 && "-ml-1.5")}>
                <AvatarImage
                  src={`https://avatar.iran.liara.run/username?username=${name.replace(
                    " ",
                    "+"
                  )}`}
                />
                <AvatarFallback>
                  <Skeleton className="rounded-full w-7 h-7" />
                </AvatarFallback>
              </Avatar>
            </TooltipTrigger>
            <TooltipContent>
              <p>{name}</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      ))}
    </div>
  );
};

export default PeopleAssigned;
