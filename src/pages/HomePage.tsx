import NavBar from "@/features/dashboard/components/navBar/NavBar";
import Sidebar from "@/features/dashboard/components/sidebar/Sidebar";
import { Outlet } from "react-router";

const HomePage = () => {
  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <Sidebar />

      {/* Screen */}
      <div className="flex flex-col flex-1 bg-background">
        <NavBar />
        <div className="flex-1 bg-background">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default HomePage;
