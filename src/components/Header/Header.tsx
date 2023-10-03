import { Link } from "react-router-dom";
import Button from "../Button/Button";
import { IoGameController, IoCart } from "react-icons/io5";
import SearchBar from "../SearchBar/SearchBar";
import "../../styles/_header.scss";
import Transition from "../Transition/Transition";
import { Game } from "../../types/Game.types";
import { addScrollableSelector, disablePageScroll } from "scroll-lock";

interface Props {
  cartItems: Game[];
  setIsCartOpen: (isCartOpen: boolean) => void;
}

const Header = ({ cartItems, setIsCartOpen }: Props) => {
  return (
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
        <span>{cartItems.length}</span>
      </Button>
    </Transition>
  );
};

export default Header;
