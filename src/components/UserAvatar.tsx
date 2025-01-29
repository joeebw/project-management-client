import AvatarName from "@/components/avatarName/AvatarName";
import { AvatarFallback } from "@/components/ui/avatar";
import { Skeleton } from "@/components/ui/skeleton";
import { Avatar } from "@radix-ui/react-avatar";
import clsx from "clsx";

type Props = {
  name: string;
  size: "xs" | "sm" | "md" | "lg" | "xl" | "2xl";
  isLoading: boolean;
  className?: string;
};

const UserAvatar = ({ name, size, isLoading, className }: Props) => {
  return (
    <Avatar className={clsx("aspect-square cursor-default")}>
      {isLoading ? (
        <AvatarFallback>
          <Skeleton className="w-full h-full bg-gray-400 rounded-full" />
        </AvatarFallback>
      ) : (
        <AvatarName name={name} size={size} className={className} />
      )}
    </Avatar>
  );
};

export default UserAvatar;
