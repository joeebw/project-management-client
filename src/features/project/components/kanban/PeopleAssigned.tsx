import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Tooltip,
  TooltipProvider,
  TooltipTrigger,
  TooltipContent,
} from "@/components/ui/tooltip";

const PeopleAssigned = () => {
  return (
    <div className="flex items-center">
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger>
            <Avatar className="w-7 h-7">
              <AvatarImage
                src={
                  "https://avatar.iran.liara.run/username?username=Joee+Garcia"
                }
              />
              <AvatarFallback>Doe</AvatarFallback>
            </Avatar>
          </TooltipTrigger>
          <TooltipContent>
            <p>Joee Garcia</p>
          </TooltipContent>
        </Tooltip>
        <Tooltip>
          <TooltipTrigger>
            <Avatar className="-ml-2 w-7 h-7">
              <AvatarImage
                src={
                  "https://avatar.iran.liara.run/username?username=Sheri+Garcia"
                }
              />
              <AvatarFallback>Doe</AvatarFallback>
            </Avatar>
          </TooltipTrigger>
          <TooltipContent>
            <p>Sheri Garcia</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    </div>
  );
};

export default PeopleAssigned;
