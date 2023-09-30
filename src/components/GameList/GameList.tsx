import { LayoutGroup } from "framer-motion";
import { Game } from "../../types/Game.types";
import Transition from "../Transition/Transition";
import GameListCard from "../GameListCard/GameListCard";
import { useWindowWidth } from "@react-hook/window-size";
import { useEffect, useState } from "react";

interface Props {
  games: Game[];
}

const GameList = ({ games }: Props) => {
  const windowWidth = useWindowWidth();
  const [columns, setColumns] = useState(0);
  const gamesPerColumns = Math.ceil(games.length / columns);

  useEffect(() => {
    setColumns(Math.floor(windowWidth / 330) || 1);
  }, [windowWidth]);

  return (
    <Transition className="GameList" direction="right">
      <h2>Best of All Time</h2>
      <div className="Grid">
        <LayoutGroup>
          {Array(columns)
            .fill(null)
            .map((_, index) => {
              const gamesToDisplay = [];
              for (let i = 0; i < gamesPerColumns; i++) {
                const gameIndex = i * columns + index;
                if (gameIndex < games.length) {
                  gamesToDisplay.push(games[gameIndex]);
                }
                console.log(gamesToDisplay);
              }
              return (
                <div key={`column-${index}`} className="Column">
                  {gamesToDisplay.map((game) => (
                    <GameListCard key={game.id} {...game} />
                  ))}
                </div>
              );
            })}
        </LayoutGroup>
      </div>
    </Transition>
  );
};

export default GameList;
