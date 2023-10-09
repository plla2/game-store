/* eslint-disable react-hooks/exhaustive-deps */
import { Game } from "../../types/Game.types";
import Transition from "../Transition/Transition";
import { useEffect } from "react";
import { useLocation, useSearchParams } from "react-router-dom";
import Loading from "../Loading/Loading";
import Grid from "../Grid/Grid";
import Navbar from "../Navbar/Navbar";

interface Props {
  games: Game[] | null;
  setGames: (games: Game[] | null) => void;
  loadGames: (search?: string) => Promise<Game[]>;
  addCartItem: (game: Game) => void;
  cartItems: Game[];
}

const GameList = ({
  games,
  loadGames,
  addCartItem,
  cartItems,
  setGames,
}: Props) => {
  const [searchParams] = useSearchParams();
  const location = useLocation();

  useEffect(() => {
    if (location.pathname === "/games") {
      setGames(null);
      if (location.search) {
        (async () =>
          setGames(await loadGames(searchParams.get("search") || "")))();
      } else {
        (async () => setGames(await loadGames()))();
      }
    }
  }, [searchParams, location]);

  return (
    <Transition className="GameList" direction="right">
      <Navbar
        showStoreButton={!!location.search}
        title={searchParams.get("search") || "Best of All Time"}
      />
      {games ? (
        <Grid games={games} addCartItem={addCartItem} cartItems={cartItems} />
      ) : (
        <Loading />
      )}
    </Transition>
  );
};

export default GameList;
