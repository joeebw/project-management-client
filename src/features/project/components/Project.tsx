import { Button } from "@/components/ui/button";
import KanbanBoard from "@/features/project/components/kanban/KanbanBoard";
import List from "@/features/project/components/list/List";
import ModalCreateProject from "@/features/project/components/modalCreateProject/ModalCreateProject";
import ModalCreateTask from "@/features/project/components/modalCreateTask/ModalCreateTask";
import Table from "@/features/project/components/table/Table";
import TabsProject from "@/features/project/components/TabsProject";
import { useStore } from "@/state/useStore";
import { SquarePlus } from "lucide-react";
import { useParams } from "react-router";

const Project = () => {
  const { projectName } = useParams();
  const decodedProjectName = decodeURIComponent(projectName || "");
  const projectSection = useStore((state) => state.projectSection);
  const setIsProjectModal = useStore((state) => state.setIsProjectModal);

  return (
    <>
      {/* Header */}
      <div className="flex items-center justify-between p-5">
        <span className="text-2xl font-semibold">{decodedProjectName}</span>
        <Button onClick={() => setIsProjectModal(true)}>
          <SquarePlus />
          New Boards
        </Button>
      </div>

      <ModalCreateTask />
      <ModalCreateProject />

      {/* Divider */}
      <div className="mx-5 border-b border-gray-300" />

      {/* Tabs */}
      <TabsProject />

      {/* Content */}
      {projectSection === "board" && <KanbanBoard />}
      {projectSection === "list" && <List />}
      {projectSection === "table" && <Table />}
    </>
  );
};

export default Project;
