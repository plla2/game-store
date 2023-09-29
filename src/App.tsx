import { useEffect, useState } from "react";
import Header from "./components/Header/Header";
import { Route, Routes } from "react-router-dom";
import "./styles/App.scss";
import { gameList } from "./apis/gameList";
import Home from "./pages/Home/Home";
import Loading from "./components/Loading/Loading";

const App = () => {
  const [cartItem] = useState([]);
  const [games, setGames] = useState([]);

  const today = new Date();
  const year = today.getFullYear();
  const month = `0${1 + today.getMonth()}`.slice(-2);
  const day = `0${today.getDate()}`.slice(-2);
  const date = `${year}-${month}-${day}`;

  useEffect(() => {
    const loadGames = async () => {
      const response = await gameList({
        page_size: 50,
        dates: date,
      });
      setGames(response.results as []);
    };
    loadGames();
  }, [date]);

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
