import UserAvatar from "@/components/UserAvatar";
import SidebarContent from "@/features/dashboard/components/sidebar/SidebarContent";
import { Lock } from "lucide-react";
import { useStore } from "@/state/useStore";

const SidebarHeader = () => {
  const user = useStore((state) => state.user);

  return (
    <>
      <SidebarContent className="py-4">
        <span className="text-xl font-medium">Proflow</span>
      </SidebarContent>
      <div className="py-2.5 border-y border-gray-400">
        <SidebarContent className="flex items-center gap-2.5">
          {/* // ! I need to change userAvatar to have a real name */}
          <UserAvatar
            name={user?.userName || "User"}
            isLoading={false}
            size="2xl"
            className="p-3"
          />

          <div className="flex flex-col">
            <span className="font-medium">{user?.userName}</span>
            <div className="flex items-center gap-1">
              <Lock className="w-3.5" />
              <span className="text-sm font-medium text-muted">Private</span>
            </div>
          </div>
        </SidebarContent>
      </div>
    </>
  );
};

export default SidebarHeader;
