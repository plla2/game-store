import { useNavigate } from "react-router-dom";
import Transition from "../Transition/Transition";
import Button from "../Button/Button";
import { RiArrowLeftLine } from "@react-icons/all-files/ri/RiArrowLeftLine";
import { motion } from "framer-motion";

interface Props {
  showStoreButton: boolean;
  title?: string;
}

const Navbar = ({ showStoreButton, title }: Props) => {
  const navigate = useNavigate();
  const goList = () => {
    navigate(`/games`);
  };
  return (
    <nav className="NavBar">
      {showStoreButton && (
        <Transition direction="left">
          <Button className="Store" handleClick={goList}>
            <RiArrowLeftLine /> Store
          </Button>
        </Transition>
      )}
      {title && <motion.h2 layout>{title}</motion.h2>}
    </nav>
  );
};

export default Navbar;
