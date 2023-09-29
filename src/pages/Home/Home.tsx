import { useEffect, useState } from "react";
import { Game } from "../../types/Game.types";
import GameCard from "../../components/GameCard/GameCard";
import Button from "../../components/Button/Button";
import { RiArrowRightLine } from "react-icons/ri";
import Transition from "../../components/Transition/Transition";
import { Link } from "react-router-dom";

interface Props {
  games: Game[];
}

const cardDuration = 10;
const cycleArray = (array: Game[]) => {
  const newArr = [...array];
  newArr.push(newArr.shift() as Game);
  return newArr;
};

const Home = ({ games }: Props) => {
  const [homeGames, setHomeGames] = useState(games.slice(0, 4));

  useEffect(() => {
    const interval = setInterval(() => {
      setHomeGames((games) => cycleArray(games));
    }, cardDuration * 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <Transition className="Home">
      {homeGames.map((game, index) => (
        <GameCard
          key={game.id}
          id={game.id}
          name={game.name}
          backgroundImage={game.background_image}
          duration={cardDuration}
          big={index === 0}
        />
      ))}
      <Link to="games" className="Store">
        <Button>
          쇼핑하러 가기 <RiArrowRightLine />
        </Button>
      </Link>
    </Transition>
  );
};

export default Home;
