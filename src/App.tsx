import { useEffect, useState } from "react";
import Header from "./components/Header/Header";
import { Route, Routes } from "react-router-dom";
import "./styles/App.scss";
import { Temporal } from "temporal-polyfill";
import { gameList } from "./apis/gameList";
import Home from "./pages/Home/Home";
import Loading from "./components/Loading/Loading";

const App = () => {
  const [cartItem] = useState([]);
  const [games, setGames] = useState([]);

  useEffect(() => {
    const loadGames = async () => {
      const today = Temporal.Now.plainDateISO();
      const threeMonthAgo = today.subtract({ months: 3 });
      const response = await gameList({
        page_size: 50,
        dates: `${threeMonthAgo},${today}`,
      });
      setGames(response.results as []);
    };
    loadGames();
  }, []);

  return (
    <div className="App">
      <Header cartItem={cartItem} />
      <Routes>
        <Route
          path="/"
          element={games.length ? <Home games={games} /> : <Loading />}
        />
      </Routes>
    </div>
  );
};

export default App;
