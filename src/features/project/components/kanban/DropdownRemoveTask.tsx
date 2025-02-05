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
import { toast } from "sonner";

type Props = {
  className?: string;
  idTask: number;
  refetch: (() => void) | null;
};

const DropdownRemoveTask = ({ className, idTask, refetch }: Props) => {
  const openConfirmationModal = useStore(
    (state) => state.openConfirmationModal
  );

  const handleRemoveTask = async () => {
    openConfirmationModal({
      title: "Delete Task",
      description:
        "Are you sure you want to delete this task? This action cannot be undone and all associated data will be permanently removed.",
      confirmLabel: "Delete Task",
      cancelLabel: "Cancel",
      onConfirm: async () => {
        try {
          await api.delete(`/task/delete/?id=${idTask}`);
          toast.success("Your task has been successfully deleted.");
          refetch?.();
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
          onClick={handleRemoveTask}
        >
          Remove
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default DropdownRemoveTask;
