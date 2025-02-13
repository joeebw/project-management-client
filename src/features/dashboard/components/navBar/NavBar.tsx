import { Button } from "@/components/ui/button";
import ProjectSearchInput from "@/features/dashboard/components/navBar/ProjectSearchInput";
import { removeTokens } from "@/lib/auth";
import { useStore } from "@/state/useStore";
import { useNavigate } from "react-router";

interface NavBarProps {
  onMenuClick: () => void;
}

const NavBar = ({ onMenuClick }: NavBarProps) => {
  const navigate = useNavigate();
  const resetAuthStore = useStore((state) => state.resetAuthStore);
  const resetProjectStore = useStore((state) => state.resetProjectStore);

  const handleSignOut = () => {
    removeTokens();
    resetAuthStore();
    resetProjectStore();
    navigate("/", { replace: true });
  };

  return (
    <div className="flex justify-between items-center text-white bg-primary min-h-[3.9rem] px-10">
      <button
        onClick={onMenuClick}
        className="mr-4 xl:hidden"
        aria-label="Toggle menu"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="w-6 h-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M4 6h16M4 12h16M4 18h16"
          />
        </svg>
      </button>

      <ProjectSearchInput />

      <Button variant="secondary" onClick={handleSignOut}>
        Sign out
      </Button>
    </div>
  );
};

export default NavBar;
