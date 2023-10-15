import { useNavigate } from "react-router-dom";
import Button from "../Button/Button";
import { IoGameController } from "@react-icons/all-files/io5/IoGameController";
import { IoCart } from "@react-icons/all-files/io5/IoCart";
import SearchBar from "../SearchBar/SearchBar";
import "../../styles/_header.scss";
import Transition from "../Transition/Transition";
import { Game } from "../../types/Game.types";
import { addScrollableSelector, disablePageScroll } from "scroll-lock";
import Headroom from "react-headroom";
import React from "react";

interface Props {
  cartItems: Game[];
  setIsCartOpen: (isCartOpen: boolean) => void;
}

const Header = React.memo(({ cartItems, setIsCartOpen }: Props) => {
  const navigate = useNavigate();
  const goHome = () => {
    navigate(`/`);
  };
  const openCart = () => {
    setIsCartOpen(true);
    addScrollableSelector(".Items");
    disablePageScroll();
  };
  return (
    <Headroom upTolerance={1}>
      <Transition className="Header" direction="down" distance={20}>
        <Button className="Logo" handleClick={goHome}>
          <IoGameController />
          GameBox
        </Button>
        <SearchBar />
        <Button className="Cart" handleClick={openCart}>
          <IoCart />
          Cart
          <div>{cartItems.length}</div>
        </Button>
      </Transition>
    </Headroom>
  );
});

export default Header;
