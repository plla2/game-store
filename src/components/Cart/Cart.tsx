import { Game } from "../../types/Game.types";

interface Props {
  cartItems: Game[];
  setIsCartOpen: (cartOpen: boolean) => void;
  removeCartItem: (id: number) => void;
}

const Cart = ({ cartItems, setIsCartOpen, removeCartItem }: Props) => {
  return <div>Cart</div>;
};

export default Cart;
