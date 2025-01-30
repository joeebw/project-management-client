import ConfirmationModal from "@/components/ConfirmationModal";
import NavBar from "@/features/dashboard/components/navBar/NavBar";
import Sidebar from "@/features/dashboard/components/sidebar/Sidebar";
import { Outlet } from "react-router";
import { Toaster } from "sonner";

const HomePage = () => {
  return (
    <div className="flex h-screen">
      <ConfirmationModal />
      <Toaster richColors position="top-center" />

      {/* Sidebar */}
      <Sidebar />

      {/* Screen */}
      <div className="flex flex-col flex-1 bg-background">
        <NavBar />
        <div className="flex-1 overflow-y-auto bg-background">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default HomePage;
