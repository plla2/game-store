import { Link } from "react-router-dom";
import Button from "../Button/Button";
import { IoGameController, IoCart } from "react-icons/io5";
import SearchBar from "../SearchBar/SearchBar";

interface Props {
  cartItem: unknown[];
}

const Header = ({ cartItem }: Props) => {
  return (
    <header>
      <Link to="/">
        <Button className="Logo">
          <IoGameController />
          GameBox
        </Button>
      </Link>
      <SearchBar />
      <Button className="Cart">
        <IoCart />
        <span>{cartItem.length}</span>
      </Button>
    </header>
  );
};

export default Header;
