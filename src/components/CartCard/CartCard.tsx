import { AiOutlineClose } from "react-icons/ai";
import { Game } from "../../types/Game.types";
import Button from "../Button/Button";
import Transition from "../Transition/Transition";
import { useNavigate } from "react-router-dom";

interface Props {
  cart: Game;
  removeCartItem: (id: number) => void;
}
const CartCard = ({ cart, removeCartItem }: Props) => {
  const navigate = useNavigate();
  const goGame = () => {
    navigate(`/games/${cart.id}`);
  };
  return (
    <Transition className="Item" layout direction="right" durationOut={0.15}>
      <Button handleClick={() => goGame()}>{cart.name}</Button>
      <p>{`$ ${cart.price}`}</p>
      <Button
        className="Remove"
        title="Remove"
        handleClick={() => removeCartItem(cart.id)}
      >
        <AiOutlineClose />
      </Button>
    </Transition>
  );
};

export default CartCard;
