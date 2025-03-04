import SidebarContent from "@/features/dashboard/components/sidebar/SidebarContent";
import clsx from "clsx";
import { Home, UsersRound, Settings, Briefcase } from "lucide-react";
import { Link, useLocation } from "react-router";

const MENU_NAVIGATION = [
  {
    name: "Home",
    path: "/home",
    icon: Home,
  },
  {
    name: "Timeline",
    path: "/home/timeline",
    icon: Briefcase,
  },
  {
    name: "Settings",
    path: "/home/settings",
    icon: Settings,
  },
  {
    name: "Users",
    path: "/home/users",
    icon: UsersRound,
  },
];

const SidebarNavItems = () => {
  const { pathname } = useLocation();

  return (
    <div>
      {MENU_NAVIGATION.map(({ icon: Icon, name, path }) => (
        <Link to={path} key={path}>
          <div
            className={clsx(
              "py-4 transition cursor-pointer hover:bg-gray-500",
              pathname === path && "bg-gray-500 border-l-4 border-primary"
            )}
          >
            <SidebarContent className="flex items-center gap-2">
              <Icon className="w-5" />
              <span className="font-medium">{name}</span>
            </SidebarContent>
          </div>
        </Link>
      ))}
    </div>
  );
};

export default SidebarNavItems;
