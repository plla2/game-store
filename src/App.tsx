import { lazy, useEffect, useState } from "react";
import Header from "./components/Header/Header";
import { Route, Routes, useLocation } from "react-router-dom";
import "./styles/App.scss";
import { gameList } from "./apis/gameList";
import Home from "./pages/Home/Home";
import Loading from "./components/Loading/Loading";
import { Game } from "./types/Game.types";
// import GameList from "./components/GameList/GameList";
import { AnimatePresence } from "framer-motion";
import Cart from "./components/Cart/Cart";

const GameList = lazy(() => import("./components/GameList/GameList"));

const App = () => {
  const [cartItems, setCartItems] = useState<Game[]>([]);
  const [games, setGames] = useState<Game[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const location = useLocation();

  const loadGames = async (search?: string) => {
    const response = await gameList({ page_size: 50, search });
    let { results } = response;
    results = results.filter((game) => game.ratings_count > (search ? 50 : 10));
    const isIndie = (game: Game) => game.genres.find((g) => g.name === "Indie");
    results.forEach((game) => (game.price = isIndie(game) ? 19.99 : 49.99));
    return results;
  };

  const addCartItem = (game: Game) => {
    setCartItems((cartItems) => [...cartItems, game]);
  };

  const removeCartItem = (id: number) => {
    setCartItems((cartItems) => cartItems.filter((game) => game.id !== id));
  };

  useEffect(() => {
    (async () => {
      const results = await loadGames("");
      setGames(results);
    })();
  }, []);

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
            element={games.length ? <Home games={games} /> : <Loading />}
          />
          <Route path="games">
            <Route
              index
              element={
                <GameList
                  games={games}
                  loadGames={loadGames}
                  addCartItem={addCartItem}
                  cartItems={cartItems}
                />
              }
            />
          </Route>
        </Routes>
      </AnimatePresence>
    </div>
  );
};

export default App;
