/* eslint-disable react-hooks/exhaustive-deps */
import { Game } from "../../types/Game.types";
import { useEffect, useState } from "react";
import { useLocation, useSearchParams } from "react-router-dom";
import { useAnimation } from "framer-motion";
import Transition from "../../components/Transition/Transition";
import Loading from "../../components/Loading/Loading";
import Grid from "../../components/Grid/Grid";
import Navbar from "../../components/Navbar/Navbar";

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
  const [scrollY, setScrollY] = useState(0);
  const controls = useAnimation();

  useEffect(() => {
    if (location.pathname === "/games") {
      setGames(null);
      const scrollToTop = async () => {
        await controls.start({ opacity: 0 });
        window.scrollTo(0, 0);
        setScrollY(0);
        await controls.start({ opacity: 1 });
      };
      if (location.search) {
        scrollToTop();
        (async () =>
          setGames(await loadGames(searchParams.get("search") || "")))();
      } else {
        window.scrollTo(0, scrollY);
        (async () => setGames(await loadGames()))();
      }
    }
  }, [searchParams]);

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
