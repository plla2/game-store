import { LayoutGroup } from "framer-motion";
import { Game } from "../../types/Game.types";
import Transition from "../Transition/Transition";
import GameListCard from "../GameListCard/GameListCard";

interface Props {
  games: Game[];
}

const GameList = ({ games }: Props) => {
  return (
    <Transition className="GameList" direction="right">
      <h2>Best of All Time</h2>
      <div className="Grid">
        <LayoutGroup>
          <div className="Column">
            {games.map((game) => (
              <GameListCard key={game.id} {...game} />
            ))}
          </div>
        </LayoutGroup>
      </div>
    </Transition>
  );
};

export default GameList;
