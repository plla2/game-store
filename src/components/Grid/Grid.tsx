/* eslint-disable react-refresh/only-export-components */
import React from "react";
import { Game } from "../../types/Game.types";
import Transition from "../Transition/Transition";
import GameListCard from "../GameListCard/GameListCard";

interface Props {
  games: Game[];
  addCartItem: (game: Game) => void;
  cartItems: Game[];
  columnsCount: number;
}

const Grid = React.memo(
  ({ games, addCartItem, cartItems, columnsCount }: Props) => {
    const gamesPerColumns = Math.ceil(games.length / columnsCount);
    const columns = Array(columnsCount)
      .fill(null)
      .map((_, index) => {
        const gamesToDisplay = [];
        for (let i = 0; i < gamesPerColumns; i++) {
          const gameIndex = i * columnsCount + index;
          if (gameIndex < games.length) {
            gamesToDisplay.push(games[gameIndex]);
          }
        }
        return gamesToDisplay;
      });

    return (
      <Transition className="Grid" direction="right">
        <>
          {columns.map((column, index) => (
            <div key={`column-${index}`} className="Column">
              {column.map((game) => (
                <GameListCard
                  key={game.id}
                  game={game}
                  cartItems={cartItems}
                  addCartItem={addCartItem}
                />
              ))}
            </div>
          ))}
        </>
      </Transition>
    );
  }
);

export default React.memo(Grid);
