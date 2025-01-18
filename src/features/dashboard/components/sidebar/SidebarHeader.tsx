import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import SidebarContent from "@/features/dashboard/components/sidebar/SidebarContent";
import { Lock } from "lucide-react";

const SidebarHeader = () => {
  return (
    <>
      <SidebarContent className="py-4">
        <span className="text-xl font-medium">WolfTask</span>
      </SidebarContent>
      <div className="py-2.5 border-y border-gray-400">
        <SidebarContent className="flex items-center gap-2.5">
          <Avatar className="w-11 h-11">
            <AvatarImage
              src={
                "https://avatar.iran.liara.run/username?username=Joee+Garcia"
              }
            />
            <AvatarFallback>Doe</AvatarFallback>
          </Avatar>
          <div className="flex flex-col">
            <span className="font-medium">Joee Garcia</span>
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
