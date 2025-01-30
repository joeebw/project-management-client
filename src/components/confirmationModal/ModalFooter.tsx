import { Button } from "@/components/ui/button";

const ModalFooter = ({
  onCancel,
  onConfirm,
  cancelLabel,
  confirmLabel,
}: {
  onCancel: () => void;
  onConfirm: () => void;
  cancelLabel?: string;
  confirmLabel?: string;
}) => (
  <div className="flex justify-end gap-2 mt-6">
    <Button variant="outline" onClick={onCancel}>
      {cancelLabel || "Cancel"}
    </Button>
    <Button
      onClick={onConfirm}
      className="text-white bg-red-600 hover:bg-red-700"
    >
      {confirmLabel || "Confirm"}
    </Button>
  </div>
);

export default ModalFooter;
