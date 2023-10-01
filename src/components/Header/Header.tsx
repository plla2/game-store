import { Link } from "react-router-dom";
import Button from "../Button/Button";
import { IoGameController, IoCart } from "react-icons/io5";
import SearchBar from "../SearchBar/SearchBar";
import "../../styles/_header.scss";
import Transition from "../Transition/Transition";
import { Game } from "../../types/Game.types";

interface Props {
  cartItem: Game[];
}

const Header = ({ cartItem }: Props) => {
  return (
    <Transition className="Header" direction="down" distance={20}>
      <Link to="/">
        <Button className="Logo">
          <IoGameController />
          GameBox
        </Button>
      </Link>
      <SearchBar />
      <Button className="Cart">
        <IoCart />
        Cart
        <span>{cartItem.length}</span>
      </Button>
    </Transition>
  );
};

export default Header;
