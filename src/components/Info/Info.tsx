import { Game } from "../../types/Game.types";
import Transition from "../Transition/Transition";

interface Props {
  game: Game;
}

const Info = ({ game }: Props) => {
  return (
    <Transition className="Info">
      <div className="About">
        <h4>About</h4>
        <p>{game.description_raw}</p>
      </div>
      <div className="MoreInfo">
        <a href={game.website} target="_blank" rel="noreferrer">
          {game.name} 홈페이지 가기
        </a>
        <p>Released: {new Date(game.released).toLocaleDateString()}</p>
        <p>
          Platforms:{" "}
          {game.platforms.map((platform) => platform.platform.name).join(", ")}
        </p>
        <p>Genres: {game.genres.map((genre) => genre.name).join(", ")}</p>
      </div>
    </Transition>
  );
};

export default Info;
