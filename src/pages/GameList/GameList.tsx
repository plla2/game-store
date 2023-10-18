/* eslint-disable react-hooks/exhaustive-deps */
import { Game } from "../../types/Game.types";
import { useEffect, useState } from "react";
import { useLocation, useSearchParams } from "react-router-dom";
import { useAnimation } from "framer-motion";
import Transition from "../../components/Transition/Transition";
import Loading from "../../components/Loading/Loading";
import Grid from "../../components/Grid/Grid";
import Navbar from "../../components/Navbar/Navbar";
import { useWindowWidth } from "@react-hook/window-size";

interface Props {
  loadGames: (search?: string) => Promise<Game[]>;
  addCartItem: (game: Game) => void;
  cartItems: Game[];
}
const minCardWidth = 330;

const GameList = ({ loadGames, addCartItem, cartItems }: Props) => {
  const [searchParams] = useSearchParams();
  const location = useLocation();
  const [scrollY, setScrollY] = useState(0);
  const [games, setGames] = useState<Game[] | null>(null);
  const [columns, setColumns] = useState(1);
  const windowWidth = useWindowWidth();
  const controls = useAnimation();

  useEffect(() => {
    setColumns(Math.floor(windowWidth / minCardWidth) || 1);
  }, [windowWidth]);

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
        games.length ? (
          <Grid
            games={games}
            addCartItem={addCartItem}
            cartItems={cartItems}
            columnsCount={columns}
          />
        ) : (
          <Transition className="NoGames">No games found.</Transition>
        )
      ) : (
        <Loading />
      )}
    </Transition>
  );
};

export default GameList;
