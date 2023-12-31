import { AnimatePresence, motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

interface Props {
  id: number;
  name: string;
  backgroundImage: string;
  duration: number;
  big: boolean;
}

const GameCard = ({ id, name, backgroundImage, duration, big }: Props) => {
  const navigate = useNavigate();
  const goDetails = () => {
    navigate(`/games/${id}`);
  };
  return (
    <motion.div
      layoutId={`${id}`}
      className={`GameCard ${big ? "Big" : ""}`}
      animate={{ borderRadius: "15px" }}
      whileHover={{ scale: big ? 1 : 1.025 }}
      whileTap={{ scale: 0.975 }}
      transition={{
        layout: { type: "spring", stiffness: 30 },
        scale: { duration: 0.15 },
      }}
      style={{ backgroundImage: `url(${backgroundImage})` }}
      onClick={goDetails}
    >
      <div className="Overlay">
        <AnimatePresence>
          <motion.h3 initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            {name}
          </motion.h3>
          {big && (
            <motion.div
              key={`progress-${id}`}
              className="ProgressBar"
              initial={{ width: 0 }}
              animate={{ width: "100%", transition: { duration } }}
              exit={{ opacity: 0 }}
            />
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
};

export default GameCard;
