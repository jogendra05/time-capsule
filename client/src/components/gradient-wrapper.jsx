import { motion } from "framer-motion";
import PropTypes from 'prop-types';
import { cn } from "@/lib/utils";

export function GradientWrapper({ children, className }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className={cn(
        "relative overflow-hidden rounded-lg",
        "before:absolute before:inset-0 before:bg-gradient-to-br before:from-purple-500/20 before:to-blue-500/20 before:backdrop-blur-xl",
        "after:absolute after:inset-0 after:bg-white/40 after:backdrop-blur-sm",
        className
      )}
    >
      <div className="relative z-10">{children}</div>
    </motion.div>
  );
}

GradientWrapper.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
};
