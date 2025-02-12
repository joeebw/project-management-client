import ConfirmationModal from "@/components/confirmationModal/ConfirmationModal";
import NavBar from "@/features/dashboard/components/navBar/NavBar";
import Sidebar from "@/features/dashboard/components/sidebar/Sidebar";
import { Outlet } from "react-router";
import { Toaster } from "sonner";
import { useState } from "react";

const HomePage = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <>
      <div className="flex h-screen">
        {/* Mobile Overlay */}
        {isSidebarOpen && (
          <div
            className="fixed inset-0 z-20 bg-black bg-opacity-50 xl:hidden"
            onClick={() => setIsSidebarOpen(false)}
          />
        )}

        {/* Sidebar */}
        <Sidebar isOpen={isSidebarOpen} />

        {/* Screen */}
        <div className="flex flex-col flex-1 bg-background">
          <NavBar onMenuClick={() => setIsSidebarOpen(true)} />
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
