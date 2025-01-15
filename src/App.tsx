import { Route, Routes } from "react-router";
import LoginPage from "./pages/LoginPage";
import RedirectIfAuthenticated from "@/components/RedirectIfAuthenticated";

function App() {
  return (
    <Routes>
      <Route path="/" element={<LoginPage />} />
    </Routes>
  );
}

export default App;
