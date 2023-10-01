import { motion } from "framer-motion";
import { Game } from "../../types/Game.types";
import Transition from "../Transition/Transition";
import { useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import Button from "../Button/Button";
import { RiArrowLeftLine } from "react-icons/ri";
import Loading from "../Loading/Loading";
import Grid from "../Grid/Grid";

interface Props {
  games: Game[];
  loadGames: (search: string) => Promise<Game[]>;
}

const GameList = ({ games, loadGames }: Props) => {
  const [displayGames, setDisplayGames] = useState(games);
  const [searchParams] = useSearchParams();
  const [isLoading, setIsLoading] = useState(false);

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
  }, [games, loadGames, searchParams]);

  return (
    <Transition className="GameList" direction="right">
      <nav>
        {searchParams.get("search") && (
          <Transition direction="left">
            <Link to="/games">
              <Button className="Store">
                <RiArrowLeftLine /> Store
              </Button>
            </Link>
          </Transition>
        )}
        <motion.h2 layout>
          {searchParams.get("search") || "Best of All Time"}
        </motion.h2>
      </nav>
      {isLoading ? <Loading /> : <Grid games={displayGames} />}
    </Transition>
  );
};

export default GameList;
