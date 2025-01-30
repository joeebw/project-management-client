import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { useStore } from "@/state/useStore";

const ConfirmationModal = () => {
  const isConfirmationModal = useStore((state) => state.isConfirmationModal);
  const configConfirmationModal = useStore(
    (state) => state.configConfirmationModal
  );
  const closeConfirmationModal = useStore(
    (state) => state.closeConfirmationModal
  );

  if (!configConfirmationModal) return null;

  const handleConfirm = async () => {
    await configConfirmationModal.onConfirm();
    closeConfirmationModal();
  };

  return (
    <AlertDialog
      open={isConfirmationModal}
      onOpenChange={closeConfirmationModal}
    >
      <AlertDialogContent className="sm:max-w-md">
        <AlertDialogHeader>
          <AlertDialogTitle className="text-lg font-semibold">
            {configConfirmationModal.title}
          </AlertDialogTitle>
          <AlertDialogDescription className="text-sm text-gray-500">
            {configConfirmationModal.description}
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter className="flex gap-2">
          <AlertDialogCancel className="mt-0">
            {configConfirmationModal.cancelLabel || "Cancel"}
          </AlertDialogCancel>
          <AlertDialogAction
            onClick={handleConfirm}
            className="bg-red-600 hover:bg-red-700"
          >
            {configConfirmationModal.confirmLabel || "Confirm"}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default ConfirmationModal;
