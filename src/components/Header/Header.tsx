import { Link } from "react-router-dom";
import Button from "../Button/Button";
import { IoGameController, IoCart } from "react-icons/io5";
import SearchBar from "../SearchBar/SearchBar";
import "../../styles/_header.scss";

interface Props {
  cartItem: unknown[];
}

const Header = ({ cartItem }: Props) => {
  return (
    <header className="Header">
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
    </header>
  );
};

export default Header;
