import { Skeleton } from "@/components/ui/skeleton";
import SidebarContent from "@/features/dashboard/components/sidebar/SidebarContent";
import { Project } from "@/features/dashboard/ts/project.type";
import useFetch from "@/hooks/useFetch";
import { useStore } from "@/state/useStore";
import clsx from "clsx";
import { Briefcase } from "lucide-react";
import { useEffect } from "react";
import { Link, useLocation } from "react-router";

const Projects = () => {
  const setRefetchProjects = useStore((state) => state.setRefetchProjects);
  const { pathname } = useLocation();

  const {
    data: menuNavigation,
    loading,
    refetch,
  } = useFetch<Project[]>("/project");

  useEffect(() => {
    setRefetchProjects(refetch);
  }, [refetch]);

  return (
    <div className="flex flex-col flex-1 min-h-0 mt-3">
      <SidebarContent className="text-sm font-bold text-muted">
        Projects
      </SidebarContent>

      {loading ? (
        <div className="flex flex-col gap-1 mt-1.5">
          <Skeleton className="w-full h-16 bg-gray-200 rounded-2xl" />
          <Skeleton className="w-full h-16 bg-gray-200 rounded-2xl" />
          <Skeleton className="w-full h-16 bg-gray-200 rounded-2xl" />
        </div>
      ) : (
        <div className="flex-1 mt-1.5 overflow-y-auto">
          {menuNavigation?.map(({ name, id }) => (
            <Link to={`/home/project/${id}`} key={id}>
              <div
                className={clsx(
                  "py-4 transition cursor-pointer hover:bg-gray-500",
                  pathname.split("/").pop() === id.toString() &&
                    "bg-gray-500 border-l-4 border-blue-400"
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
      )}
    </div>
  );
};

export default Projects;
