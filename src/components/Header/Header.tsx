import { Link } from "react-router-dom";
import Button from "../Button/Button";
import { IoGameController, IoCart } from "react-icons/io5";
import SearchBar from "../SearchBar/SearchBar";
import "../../styles/_header.scss";
import Transition from "../Transition/Transition";
import { Game } from "../../types/Game.types";
import { addScrollableSelector, disablePageScroll } from "scroll-lock";
import AnimatedNumber from "react-animated-numbers";
import Headroom from "react-headroom";

interface Props {
  cartItems: Game[];
  setIsCartOpen: (isCartOpen: boolean) => void;
}

const Header = ({ cartItems, setIsCartOpen }: Props) => {
  return (
    <Headroom upTolerance={1}>
      <Transition className="Header" direction="down" distance={20}>
        <Link to="/">
          <Button className="Logo">
            <IoGameController />
            GameBox
          </Button>
        </Link>
        <SearchBar />
        <Button
          className="Cart"
          handleClick={() => {
            setIsCartOpen(true);
            addScrollableSelector(".Items");
            disablePageScroll();
          }}
        >
          <IoCart />
          Cart
          <div>
            <AnimatedNumber animateToNumber={cartItems.length} />
          </div>
        </Button>
      </Transition>
    </Headroom>
  );
};

export default Header;
