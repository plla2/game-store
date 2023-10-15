import { RiArrowRightLine } from "react-icons/ri";
import { Game } from "../../types/Game.types";
import Button from "../Button/Button";
import CartCard from "../CartCard/CartCard";
import Transition from "../Transition/Transition";
import { enablePageScroll } from "scroll-lock";
import { AnimatePresence, motion } from "framer-motion";
import { useMemo } from "react";

interface Props {
  cartItems: Game[];
  setIsCartOpen: (cartOpen: boolean) => void;
  removeCartItem: (id: number) => void;
}

const Cart = ({ cartItems, setIsCartOpen, removeCartItem }: Props) => {
  const totalPrice = useMemo(() => {
    return cartItems.reduce((acc, item) => acc + item.price, 0).toFixed(2);
  }, [cartItems]);

  const clearCart = () => {
    cartItems.forEach((item) => removeCartItem(item.id));
  };

  let gamesCount;
  if (cartItems.length >= 1) {
    gamesCount = `${cartItems.length} games`;
  } else {
    gamesCount = `No games added`;
  }

  return (
    <>
      <Transition className="Background">
        <div
          onClick={() => {
            setIsCartOpen(false);
            enablePageScroll();
          }}
        />
      </Transition>
      <motion.div
        className="CartModal"
        initial={{ opacity: 0, x: "100%" }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: "100%", transition: { duration: 0.25 } }}
        transition={{ type: "spring", duration: 0.5 }}
      >
        <div className="CartHeader">
          <h3>{gamesCount}</h3>
          {cartItems.length > 0 && (
            <Button handleClick={clearCart}>Clear</Button>
          )}
        </div>
        <div className="Items">
          <AnimatePresence>
            {cartItems.map((cart) => (
              <CartCard
                key={cart.id}
                cart={cart}
                removeCartItem={removeCartItem}
              />
            ))}
          </AnimatePresence>
        </div>
        <div className="Checkout">
          <div>Total: ${totalPrice}</div>
          <Button>
            Checkout <RiArrowRightLine />
          </Button>
        </div>
      </motion.div>
    </>
  );
};

export default Cart;
