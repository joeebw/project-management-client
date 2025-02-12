import { Skeleton } from "@/components/ui/skeleton";
import ProjectItem from "@/features/dashboard/components/sidebar/ProjectItem";
import SidebarContent from "@/features/dashboard/components/sidebar/SidebarContent";
import useFetch from "@/hooks/useFetch";
import { useStore } from "@/state/useStore";
import { Project } from "@/ts/shared.types";
import { useEffect } from "react";
import { useLocation } from "react-router";

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
            <ProjectItem key={id} pathname={pathname} id={id} name={name} />
          ))}
        </div>
      )}
    </div>
  );
};

export default Projects;
