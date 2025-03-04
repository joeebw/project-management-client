import SidebarContent from "@/features/dashboard/components/sidebar/SidebarContent";
import clsx from "clsx";
import { Briefcase } from "lucide-react";
import { Link } from "react-router";
import { useState } from "react";
import DropdownRemoveProject from "@/features/dashboard/components/sidebar/DropdownRemoveProject";
import { useStore } from "@/state/useStore";
import {
  TooltipProvider,
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";

type Props = {
  pathname: string;
  id: number;
  name: string;
};

const ProjectItem = ({ pathname, id, name }: Props) => {
  const [isHovering, setIsHovering] = useState(false);
  const refetchProjects = useStore((state) => state.refetchProjects);

  return (
    <Link to={`/home/project/${id}/${encodeURIComponent(name)}`} key={id}>
      <div
        className={clsx(
          "py-4 transition cursor-pointer hover:bg-gray-500",
          pathname.split("/")[3] === id.toString() &&
            "bg-gray-500 border-l-4 border-primary"
        )}
        onMouseEnter={() => setIsHovering(true)}
        onMouseLeave={() => setIsHovering(false)}
      >
        <SidebarContent className="flex items-center justify-between">
          <div className="flex items-center flex-1 gap-1.5 overflow-hidden">
            <Briefcase className="w-5 h-5 shrink-0" />
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <p className="font-medium truncate">{name}</p>
                </TooltipTrigger>
                <TooltipContent>
                  <span className="font-medium">{name}</span>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
          <div
            onClick={(e) => e.stopPropagation()}
            className={clsx(
              "transition-opacity duration-200",
              isHovering ? "opacity-100" : "opacity-0"
            )}
          >
            <DropdownRemoveProject
              idProject={id}
              refetch={refetchProjects}
              className="w-5 h-5 "
            />
          </div>
        </SidebarContent>
      </div>
    </Link>
  );
};

export default ProjectItem;
