import { motion } from "motion/react";

const Backdrop = ({ onClick }: { onClick: () => void }) => (
  <motion.div
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    exit={{ opacity: 0 }}
    className="fixed inset-0 z-50 bg-black/30"
    onClick={onClick}
  />
);

export default Backdrop;
