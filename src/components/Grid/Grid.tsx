/* eslint-disable react-refresh/only-export-components */
import React, { useEffect, useState } from "react";
import { Game } from "../../types/Game.types";
import { useWindowWidth } from "@react-hook/window-size";
import Transition from "../Transition/Transition";
import GameListCard from "../GameListCard/GameListCard";

interface Props {
  games: Game[];
  addCartItem: (game: Game) => void;
  cartItems: Game[];
}

const minCardWidth = 330;

const Grid = React.memo(({ games, addCartItem, cartItems }: Props) => {
  const [columns, setColumns] = useState(1);
  const windowWidth = useWindowWidth();
  const gamesPerColumns = Math.ceil(games.length / columns);

  useEffect(() => {
    setColumns(Math.floor(windowWidth / minCardWidth) || 1);
  }, [windowWidth]);

  return (
    <Transition className="Grid" direction="right">
      {Array(columns)
        .fill(null)
        .map((_, index) => {
          const gamesToDisplay = [];
          for (let i = 0; i < gamesPerColumns; i++) {
            const gameIndex = i * columns + index;
            if (gameIndex < games.length) {
              gamesToDisplay.push(games[gameIndex]);
            }
          }
          return (
            <div key={`column-${index}`} className="Column">
              {gamesToDisplay.map((game) => (
                <GameListCard
                  key={game.id}
                  game={game}
                  addCartItem={addCartItem}
                  cartItems={cartItems}
                />
              ))}
            </div>
          );
        })}
    </Transition>
  );
});

export default React.memo(Grid);
