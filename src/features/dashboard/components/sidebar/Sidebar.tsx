import Projects from "@/features/dashboard/components/sidebar/Projects";
import SidebarHeader from "@/features/dashboard/components/sidebar/SidebarHeader";
import SidebarNavItem from "@/features/dashboard/components/sidebar/SidebarNavItems";

interface SidebarProps {
  isOpen: boolean;
}

const Sidebar = ({ isOpen }: SidebarProps) => {
  return (
    <div
      className={`
        fixed xl:static 
        flex flex-col 
        bg-foreground
        h-screen 
        w-[13.5rem] shrink-0
        text-white 
        z-30
        transition-transform duration-300 ease-in-out
        ${isOpen ? "translate-x-0" : "-translate-x-full xl:translate-x-0"}
      `}
    >
      <SidebarHeader />
      <SidebarNavItem />
      <Projects />
    </div>
  );
};

export default Sidebar;
