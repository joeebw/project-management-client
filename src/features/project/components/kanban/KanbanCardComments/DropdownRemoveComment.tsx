import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import projectService from "@/features/project/services/projectService";
import clsx from "clsx";
import { EllipsisVertical } from "lucide-react";
import { toast } from "sonner";

type Props = {
  className?: string;
  idComment: number;
  refetch: () => void;
};

const DropdownRemoveComment = ({ className, idComment, refetch }: Props) => {
  const handleRemoveComment = async () => {
    try {
      await projectService.removeComment(idComment);
      refetch();
    } catch (err) {
      toast.error("Failed to remove comment");
      console.error(err);
    }
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <EllipsisVertical className={clsx("cursor-pointer", className)} />
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuItem
          className="text-xs text-red-500"
          onClick={handleRemoveComment}
        >
          Remove
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default DropdownRemoveComment;
