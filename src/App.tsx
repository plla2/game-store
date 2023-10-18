import { Suspense, lazy, useCallback, useState } from "react";
import Header from "./components/Header/Header";
import { Route, Routes } from "react-router-dom";
import "./styles/App.scss";
import { gameList } from "./apis/gameList";
import Home from "./pages/Home/Home";
import Loading from "./components/Loading/Loading";
import { Game } from "./types/Game.types";
import { AnimatePresence } from "framer-motion";
import Cart from "./components/Cart/Cart";
import { getPrice } from "./utils/getPrice";
import NotFound from "./pages/NotFound/NotFound";

const GameList = lazy(() => import("./pages/GameList/GameList"));
const GameDetails = lazy(() => import("./pages/GameDetails/GameDetails"));

const loadGames = async (search = "") => {
  const response = await gameList({ page_size: 50, search });
  let { results } = response;
  results = results.filter((game) => game.ratings_count > (search ? 50 : 10));
  results.forEach((game) => (game.price = getPrice(game)));
  return results;
};

const App = () => {
  const [cartItems, setCartItems] = useState<Game[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);

  const addCartItem = useCallback((game: Game) => {
    setCartItems((cartItems) => [...cartItems, game]);
  }, []);

  const removeCartItem = useCallback((id: number) => {
    setCartItems((cartItems) => cartItems.filter((game) => game.id !== id));
  }, []);

  return (
    <Suspense fallback={<Loading />}>
      <div className="App">
        <Header cartItems={cartItems} setIsCartOpen={setIsCartOpen} />
        <AnimatePresence mode="wait">
          {isCartOpen && (
            <Cart
              cartItems={cartItems}
              setIsCartOpen={setIsCartOpen}
              removeCartItem={removeCartItem}
            />
          )}
        </AnimatePresence>
        <AnimatePresence mode="wait">
          <Routes>
            <Route path="*" element={<NotFound />} />
            <Route path="/" element={<Home loadGames={loadGames} />} />
            <Route path="games">
              <Route
                index
                element={
                  <GameList
                    loadGames={loadGames}
                    addCartItem={addCartItem}
                    cartItems={cartItems}
                  />
                }
              />
            </Route>
            <Route
              path="/games/:gameId"
              element={
                <GameDetails cartItems={cartItems} addCartItem={addCartItem} />
              }
            />
          </Routes>
        </AnimatePresence>
      </div>
    </Suspense>
  );
};

export default App;
