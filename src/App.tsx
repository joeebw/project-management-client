import { Route, Routes } from "react-router";
import LoginPage from "./pages/LoginPage";
import RedirectIfAuthenticated from "@/components/RedirectIfAuthenticated";
import HomePage from "@/pages/HomePage";
import ProtectedRoute from "@/components/ProtectedRoute";
import Users from "@/features/Users/components/Users";
import Settings from "@/features/settings/components/Settings";
import Timeline from "@/features/timeline/components/Timeline";
import Project from "@/features/project/components/Project";
import Home from "@/features/home/components/Home";
import DesktopOnly from "@/components/DesktopOnly";
import NotFoundPage from "@/components/NotFoundPage";

function App() {
  return (
    <DesktopOnly>
      <Routes>
        <Route
          path="/"
          element={
            <RedirectIfAuthenticated>
              <LoginPage />
            </RedirectIfAuthenticated>
          }
        />
        <Route
          path="/home"
          element={
            <ProtectedRoute>
              <HomePage />
            </ProtectedRoute>
          }
        >
          <Route index element={<Home />} />
          <Route path="timeline" element={<Timeline />} />
          <Route path="settings" element={<Settings />} />
          <Route path="users" element={<Users />} />
          <Route path="project/:id/:projectName" element={<Project />} />
        </Route>
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </DesktopOnly>
  );
}

export default App;
