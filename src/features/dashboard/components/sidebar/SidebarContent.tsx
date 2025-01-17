import clsx from "clsx";
import { ReactNode } from "react";

const SidebarContent = ({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) => {
  return <div className={clsx("px-5", className)}>{children}</div>;
};

export default SidebarContent;
