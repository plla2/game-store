import { motion } from "framer-motion";

interface Props {
  children: React.ReactNode;
  className?: string;
  direction?: "left" | "right" | "up" | "down" | "none";
  distance?: number;
  layout?: boolean;
  durationIn?: number;
  durationOut?: number;
}

const Transition = ({
  children,
  className,
  direction = "none",
  distance = 50,
  layout = false,
  durationIn,
  durationOut,
}: Props) => {
  const directions = {
    left: { x: -distance },
    right: { x: distance },
    up: { y: distance },
    down: { y: -distance },
    none: { x: 0, y: 0 },
  };
  const transitionIn = {
    type: "spring",
    duration: durationIn,
  };

  const animateConfig = {
    in: {
      opacity: 0,
      ...directions[direction],
    },
    animate: {
      opacity: 1,
      ...directions.none,
      transition: {
        x: transitionIn,
        y: transitionIn,
      },
    },
    out: {
      opacity: 0,
      ...directions[direction],
      transition: {
        type: "just",
        duration: durationOut,
      },
    },
  };

  return (
    <motion.div
      className={className}
      variants={animateConfig}
      initial="in"
      animate="animate"
      exit="out"
      layout={layout}
    >
      {children}
    </motion.div>
  );
};

export default Transition;
