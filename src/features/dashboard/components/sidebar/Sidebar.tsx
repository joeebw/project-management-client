import Projects from "@/features/dashboard/components/Projects";
import SidebarHeader from "@/features/dashboard/components/sidebar/SidebarHeader";
import SidebarNavItem from "@/features/dashboard/components/sidebar/SidebarNavItems";

const Sidebar = () => {
  return (
    <div className="flex flex-col bg-primary h-screen w-[16.5rem] text-white py-2">
      <SidebarHeader />

      <SidebarNavItem />

      <Projects />
    </div>
  );
};

export default Sidebar;
