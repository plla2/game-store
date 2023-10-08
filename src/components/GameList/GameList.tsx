import { motion } from "framer-motion";
import { Game } from "../../types/Game.types";
import Transition from "../Transition/Transition";
import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import Button from "../Button/Button";
import { RiArrowLeftLine } from "react-icons/ri";
import Loading from "../Loading/Loading";
import Grid from "../Grid/Grid";

interface Props {
  games: Game[];
  loadGames: (search: string) => Promise<Game[]>;
  addCartItem: (game: Game) => void;
  cartItems: Game[];
}

const GameList = ({ games, loadGames, addCartItem, cartItems }: Props) => {
  const [displayGames, setDisplayGames] = useState(games);
  const [searchParams] = useSearchParams();
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    setIsLoading(true);
  }, []);

  useEffect(() => {
    const searchParam = searchParams.get("search") || "";
    setIsLoading(true);
    if (searchParam) {
      (async () => {
        setDisplayGames(await loadGames(searchParam));
        setIsLoading(false);
      })();
    } else if (games.length) {
      setDisplayGames(games);
      setIsLoading(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [games, searchParams]);

  return (
    <Transition className="GameList" direction="right">
      <nav>
        {searchParams.get("search") && (
          <Transition direction="left">
            <Button className="Store" handleClick={() => navigate("/games")}>
              <RiArrowLeftLine /> Store
            </Button>
          </Transition>
        )}
        <motion.h2 layout>
          {searchParams.get("search") || "Best of All Time"}
        </motion.h2>
      </nav>
      {isLoading ? (
        <Loading />
      ) : (
        <Grid
          games={displayGames}
          addCartItem={addCartItem}
          cartItems={cartItems}
        />
      )}
    </Transition>
  );
};

export default GameList;
