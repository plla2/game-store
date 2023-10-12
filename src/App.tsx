import { Suspense, lazy, useState } from "react";
import Header from "./components/Header/Header";
import { Route, Routes, useLocation } from "react-router-dom";
import "./styles/App.scss";
import { gameList } from "./apis/gameList";
import Home from "./pages/Home/Home";
import Loading from "./components/Loading/Loading";
import { Game } from "./types/Game.types";
import { AnimatePresence } from "framer-motion";
import Cart from "./components/Cart/Cart";
import { getPrice } from "./utils/getPrice";

const GameList = lazy(() => import("./pages/GameList/GameList"));
const GameDetails = lazy(() => import("./pages/GameDetails/GameDetails"));

const App = () => {
  const [cartItems, setCartItems] = useState<Game[]>([]);
  const [games, setGames] = useState<Game[] | null>(null);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const location = useLocation();

  const loadGames = async (search = "") => {
    const response = await gameList({ page_size: 50, search });
    let { results } = response;
    results = results.filter((game) => game.ratings_count > (search ? 50 : 10));
    results.forEach((game) => (game.price = getPrice(game)));
    return results;
  };

  const addCartItem = (game: Game) => {
    setCartItems((cartItems) => [...cartItems, game]);
  };

  const removeCartItem = (id: number) => {
    setCartItems((cartItems) => cartItems.filter((game) => game.id !== id));
  };

  return (
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
        <Routes location={location} key={location.pathname}>
          <Route
            path="/"
            element={<Home setGames={setGames} loadGames={loadGames} />}
          />
          <Route path="games">
            <Route
              index
              element={
                <Suspense fallback={<Loading />}>
                  <GameList
                    games={games}
                    setGames={setGames}
                    loadGames={loadGames}
                    addCartItem={addCartItem}
                    cartItems={cartItems}
                  />
                </Suspense>
              }
            />
          </Route>
          <Route
            path="/games/:gameId"
            element={
              <Suspense fallback={<Loading />}>
                <GameDetails
                  games={games}
                  cartItems={cartItems}
                  addCartItem={addCartItem}
                />
              </Suspense>
            }
          />
        </Routes>
      </AnimatePresence>
    </div>
  );
};

export default App;
