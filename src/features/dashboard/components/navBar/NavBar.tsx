import { Button } from "@/components/ui/button";
import ProjectSearchInput from "@/features/dashboard/components/navBar/ProjectSearchInput";
import { removeTokens } from "@/lib/auth";
import { useStore } from "@/state/useStore";
import { useNavigate } from "react-router";

const NavBar = () => {
  const navigate = useNavigate();
  const resetStore = useStore((state) => state.resetStore);

  const handleSignOut = () => {
    removeTokens();
    resetStore();
    navigate("/", { replace: true });
  };

  return (
    <div className="flex justify-between items-center text-white bg-primary min-h-[3.9rem] px-10">
      <ProjectSearchInput />

      <Button variant="secondary" onClick={handleSignOut}>
        Sign out
      </Button>
    </div>
  );
};

export default NavBar;
