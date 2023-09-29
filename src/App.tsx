import { useEffect, useState } from "react";
import Header from "./components/Header/Header";
import { Route, Routes, useLocation } from "react-router-dom";
import "./styles/App.scss";
import { gameList } from "./apis/gameList";
import Home from "./pages/Home/Home";
import Loading from "./components/Loading/Loading";
import { Game } from "./types/Game.types";
import GameList from "./components/GameList/GameList";
import { AnimatePresence } from "framer-motion";

const App = () => {
  const [cartItem] = useState([]);
  const [games, setGames] = useState<Game[]>([]);
  const location = useLocation();

  useEffect(() => {
    const loadGames = async () => {
      const today = new Date();
      const year = today.getFullYear();
      const month = `0${1 + today.getMonth()}`.slice(-2);
      const day = `0${today.getDate()}`.slice(-2);
      const date = `${year}-${month}-${day}`;

      const response = await gameList({
        page_size: 50,
        dates: date,
      });
      console.log(response);
      const loadedGames = response.results;
      loadedGames.forEach((game) => {
        game.price = game.genres.find((genre) => genre.name === "Indie")
          ? 26000
          : 80000;
      });
      setGames(loadedGames);
    };
    loadGames();
  }, []);

  return (
    <div className="App">
      <Header cartItem={cartItem} />
      <AnimatePresence mode="wait">
        <Routes location={location} key={location.pathname}>
          <Route
            path="/"
            element={games.length ? <Home games={games} /> : <Loading />}
          />
          <Route path="games">
            <Route
              index
              element={games.length ? <GameList games={games} /> : <Loading />}
            />
          </Route>
        </Routes>
      </AnimatePresence>
    </div>
  );
};

export default App;
