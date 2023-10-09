import { useNavigate } from "react-router-dom";
import Transition from "../Transition/Transition";
import Button from "../Button/Button";
import { RiArrowLeftLine } from "react-icons/ri";
import { motion } from "framer-motion";

interface Props {
  showStoreButton: boolean;
  title?: string;
}

const Navbar = ({ showStoreButton, title }: Props) => {
  const navigate = useNavigate();
  return (
    <nav className="NavBar">
      {showStoreButton && (
        <Transition direction="left">
          <Button className="Store" handleClick={() => navigate("/games")}>
            <RiArrowLeftLine /> Store
          </Button>
        </Transition>
      )}
      {title && <motion.h2 layout>{title}</motion.h2>}
    </nav>
  );
};

export default Navbar;
