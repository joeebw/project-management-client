import { avatarColors, sizeClasses } from "@/components/avatarName/constants";
import {
  formatName,
  getConsistentColorIndex,
} from "@/components/avatarName/utils";
import clsx from "clsx";

type Props = {
  name: string;
  size: "xs" | "sm" | "md" | "lg" | "xl" | "2xl";
  className?: string;
};

const AvatarName = ({ name, className, size = "md" }: Props) => {
  const colorClass = avatarColors[getConsistentColorIndex(name, avatarColors)];
  return (
    <div
      className={clsx(
        "flex items-center justify-center w-full h-full rounded-full aspect-square",
        "bg-red-600 text-white font-medium",
        sizeClasses[size],
        colorClass,
        className ? className : "p-2"
      )}
    >
      {formatName(name)}
    </div>
  );
};

export default AvatarName;
