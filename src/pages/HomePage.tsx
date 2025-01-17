import Sidebar from "@/features/dashboard/components/sidebar/Sidebar";
import { Outlet } from "react-router";

const HomePage = () => {
  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <Sidebar />

      {/* Screen */}
      <div className="flex-1 bg-background">
        <Outlet />
      </div>
    </div>
  );
};

export default HomePage;
