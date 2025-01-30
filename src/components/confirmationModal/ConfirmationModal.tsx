import Backdrop from "@/components/confirmationModal/Backdrop";
import ModalFooter from "@/components/confirmationModal/ModalFooter";
import ModalHeader from "@/components/confirmationModal/ModalHeader";
import useConfirmationModal from "@/components/confirmationModal/useConfirmationModal";
import { AnimatePresence, motion } from "motion/react";

const ConfirmationModal = () => {
  const { isOpen, config, close, handleConfirm } = useConfirmationModal();

  return (
    <AnimatePresence>
      {isOpen && config && (
        <>
          <Backdrop onClick={close} />
          <div className="fixed inset-0 z-50 flex items-center justify-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{
                opacity: 1,
                scale: 1,
                transition: {
                  type: "spring",
                  damping: 25,
                  stiffness: 300,
                },
              }}
              exit={{
                opacity: 0,
                scale: 0.95,
                transition: {
                  duration: 0.2,
                },
              }}
              className="w-full max-w-md bg-white rounded-lg shadow-lg"
            >
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="p-6"
              >
                <ModalHeader
                  title={config.title}
                  description={config.description}
                />
                <ModalFooter
                  onCancel={close}
                  onConfirm={handleConfirm}
                  cancelLabel={config.cancelLabel}
                  confirmLabel={config.confirmLabel}
                />
              </motion.div>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
};

export default ConfirmationModal;
