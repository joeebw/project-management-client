import {
  Tooltip,
  TooltipProvider,
  TooltipTrigger,
  TooltipContent,
} from "@/components/ui/tooltip";
import UserAvatar from "@/components/UserAvatar";
import clsx from "clsx";
import { Fragment } from "react/jsx-runtime";

type Props = {
  assignees: string[];
};

const PeopleAssigned = ({ assignees }: Props) => {
  return (
    <div className="flex items-center">
      {assignees.map((name, idx) => (
        <Fragment key={name}>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <div className={clsx(idx > 0 && "-ml-1.5")}>
                  <UserAvatar
                    name={name}
                    isLoading={false}
                    size="xs"
                    className="p-1.5"
                  />
                </div>
              </TooltipTrigger>
              <TooltipContent>
                <p>{name}</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </Fragment>
      ))}
    </div>
  );
};

export default PeopleAssigned;
