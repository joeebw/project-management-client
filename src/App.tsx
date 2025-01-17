import { Route, Routes } from "react-router";
import LoginPage from "./pages/LoginPage";
import RedirectIfAuthenticated from "@/components/RedirectIfAuthenticated";
import HomePage from "@/pages/HomePage";
import ProtectedRoute from "@/components/ProtectedRoute";
import Users from "@/features/Users/components/Users";
import Settings from "@/features/settings/components/Settings";
import Timeline from "@/features/timeline/components/Timeline";
import Project from "@/features/project/components/Project";

function App() {
  return (
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
        <Route path="timeline" element={<Timeline />} />
        <Route path="settings" element={<Settings />} />
        <Route path="users" element={<Users />} />
        <Route path="project/:id" element={<Project />} />
      </Route>
    </Routes>
  );
}

export default App;
