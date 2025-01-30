import ConfirmationModal from "@/components/confirmationModal/ConfirmationModal";
import NavBar from "@/features/dashboard/components/navBar/NavBar";
import Sidebar from "@/features/dashboard/components/sidebar/Sidebar";
import { Outlet } from "react-router";
import { Toaster } from "sonner";

const HomePage = () => {
  return (
    <>
      <div className="flex h-screen">
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

      <Toaster richColors position="top-center" />
      <ConfirmationModal />
    </>
  );
};

export default HomePage;
