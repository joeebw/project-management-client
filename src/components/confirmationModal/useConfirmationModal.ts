import { useStore } from "@/state/useStore";
import { useEffect } from "react";

const useConfirmationModal = () => {
  const isOpen = useStore((state) => state.isConfirmationModal);
  const config = useStore((state) => state.configConfirmationModal);
  const close = useStore((state) => state.closeConfirmationModal);

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        close();
      }
    };

    document.addEventListener("keydown", handleEscape);
    return () => document.removeEventListener("keydown", handleEscape);
  }, [isOpen, close]);

  const handleConfirm = async () => {
    if (!config?.onConfirm) return;
    await config.onConfirm();
    close();
  };

  return { isOpen, config, close, handleConfirm };
};

export default useConfirmationModal;
