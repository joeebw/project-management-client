import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Comment } from "@/features/project/ts/kanban.type";
import api from "@/lib/apiService";
import { useStore } from "@/state/useStore";
import { Loader2, Send } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

type Props = {
  taskId: number;
};

const InputComments = ({ taskId }: Props) => {
  const [comment, setComment] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const addComment = useStore((state) => state.addComment);

  const isDisabled = !comment || isLoading;

  const handleAddComment = async () => {
    if (comment.length >= 100) {
      return setError("Your comment must be under 100 characters.");
    }

    try {
      setIsLoading(true);
      const response = await api.post<Comment>("/task/comment", {
        comment: comment.trim(),
        taskId,
      });

      const newComment = response.data;

      if (error) {
        setError("");
      }

      addComment(taskId, newComment);

      setComment("");
    } catch (err) {
      console.log(err);
      toast.error("Oops! Something unexpected happened.Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex gap-1.5 mt-2.5">
      <div className="w-full">
        <Input
          placeholder="Add a comment..."
          onChange={(e) => setComment(e.target.value)}
          value={comment}
          onKeyDown={(e) => e.key === "Enter" && handleAddComment()}
        />
        {error && <p className="text-sm text-red-500">{error}</p>}
      </div>
      <Button size="icon" disabled={isDisabled} onClick={handleAddComment}>
        {isLoading ? <Loader2 className="animate-spin" /> : <Send />}
      </Button>
    </div>
  );
};

export default InputComments;
