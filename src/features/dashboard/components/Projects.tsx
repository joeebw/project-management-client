import SidebarContent from "@/features/dashboard/components/sidebar/SidebarContent";
import { Project } from "@/features/dashboard/ts/project.type";
import useFetch from "@/hooks/useFetch";
import clsx from "clsx";
import { Briefcase } from "lucide-react";
import { Link, useLocation } from "react-router";

const MENU_NAVIGATION = [
  {
    name: "Project Management",
    id: 1,
  },
  {
    name: "Calendar App",
    id: 2,
  },
  {
    name: "Hive Hosting App",
    id: 3,
  },
];

const Projects = () => {
  const { pathname } = useLocation();

  const { data: menuNavigation } = useFetch<Project[]>("/project");

  return (
    <div className="flex flex-col flex-1 min-h-0 mt-3">
      <SidebarContent className="text-sm font-bold text-muted">
        Projects
      </SidebarContent>

      <div className="flex-1 mt-1.5 overflow-y-auto">
        {menuNavigation?.map(({ name, id }) => (
          <Link to={`/home/project/${id}`} key={id}>
            <div
              className={clsx(
                "py-4 transition cursor-pointer hover:bg-gray-500",
                pathname.split("/").pop() === id.toString() && "bg-gray-500"
              )}
            >
              <SidebarContent className="flex items-center gap-2">
                <Briefcase className="w-5 min-w-5" />
                <span className="font-medium line-clamp-1">{name}</span>
              </SidebarContent>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Projects;
