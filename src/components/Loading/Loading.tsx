import { motion } from "framer-motion";
import { CircularProgress } from "react-cssfx-loading";

const Loading = () => {
  return (
    <motion.div
      className="Loading"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <CircularProgress height="100px" width="100px" color="#A084DC" />
    </motion.div>
  );
};

export default Loading;
