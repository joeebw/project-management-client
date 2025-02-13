import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import api from "@/lib/apiService";
import { useStore } from "@/state/useStore";
import clsx from "clsx";
import { EllipsisVertical } from "lucide-react";
import { useNavigate } from "react-router";
import { toast } from "sonner";

type Props = {
  className?: string;
  idProject: number;
  refetch: (() => void) | null;
};

const DropdownRemoveProject = ({ className, idProject, refetch }: Props) => {
  const navigate = useNavigate();
  const openConfirmationModal = useStore(
    (state) => state.openConfirmationModal
  );

  const handleRemoveProject = async () => {
    openConfirmationModal({
      title: "Delete Project",
      description:
        "Are you sure you want to delete this project? This action cannot be undone and all associated data will be permanently removed.",
      confirmLabel: "Delete Project",
      cancelLabel: "Cancel",
      onConfirm: async () => {
        try {
          await api.delete(`/project/delete/?id=${idProject}`);
          toast.success("Your project has been successfully deleted.");
          refetch?.();
          navigate("/home/");
        } catch (err) {
          console.log(err);
          toast.error("Oops! Something unexpected happened.Please try again.");
        }
      },
    });
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <EllipsisVertical className={clsx("cursor-pointer", className)} />
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuItem
          className="text-xs text-red-500"
          onClick={handleRemoveProject}
        >
          Remove
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default DropdownRemoveProject;
