import { Button } from "@/components/ui/button";
import KanbanBoard from "@/features/project/components/kanban/KanbanBoard";
import ModalCreateTask from "@/features/project/components/modal/ModalCreateTask";
import TabsProject from "@/features/project/components/TabsProject";
import { SquarePlus } from "lucide-react";

const Project = () => {
  return (
    <>
      {/* Header */}
      <div className="flex items-center justify-between p-5">
        <span className="text-2xl font-semibold">
          Product Design Development
        </span>
        <Button>
          <SquarePlus />
          New Boards
        </Button>
      </div>

      <ModalCreateTask />

      {/* Divider */}
      <div className="mx-5 border-b border-gray-300" />

      {/* Tabs */}
      <TabsProject />

      <KanbanBoard />
    </>
  );
};

export default Project;
