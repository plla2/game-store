/* eslint-disable react-refresh/only-export-components */
import { useNavigate } from "react-router-dom";
import Button from "../Button/Button";
import { IoGameController, IoCart } from "react-icons/io5";
import SearchBar from "../SearchBar/SearchBar";
import "../../styles/_header.scss";
import Transition from "../Transition/Transition";
import { Game } from "../../types/Game.types";
import { addScrollableSelector, disablePageScroll } from "scroll-lock";
import Headroom from "react-headroom";
import React, { memo } from "react";

interface Props {
  cartItems: Game[];
  setIsCartOpen: (isCartOpen: boolean) => void;
}

const Header = memo(({ cartItems, setIsCartOpen }: Props) => {
  const navigate = useNavigate();
  return (
    <Headroom upTolerance={1}>
      <Transition className="Header" direction="down" distance={20}>
        <Button className="Logo" handleClick={() => navigate("/")}>
          <IoGameController />
          GameBox
        </Button>
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
          <div>{cartItems.length}</div>
        </Button>
      </Transition>
    </Headroom>
  );
});

export default React.memo(Header);
