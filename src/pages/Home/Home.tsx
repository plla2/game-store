import { useEffect, useState } from "react";
import { Game } from "../../types/Game.types";
import GameCard from "../../components/GameCard/GameCard";
import Button from "../../components/Button/Button";
import { RiArrowRightLine } from "react-icons/ri";
import Transition from "../../components/Transition/Transition";
import { useNavigate } from "react-router-dom";
import Footer from "../../components/Footer/Footer";

interface Props {
  games: Game[];
}

const cardDuration = 10;
const cycleArray = (array: Game[]) => {
  const newArr = [...array];
  newArr.push(newArr.shift() as Game);
  return newArr;
};

const getRandomGames = (games: Game[]): Game[] => {
  const randomGames = new Set();
  while (randomGames.size < 4) {
    const index = Math.floor(Math.random() * games.length);
    randomGames.add(games[index]);
  }
  return [...randomGames] as Game[];
};

const Home = ({ games }: Props) => {
  const [homeGames, setHomeGames] = useState(getRandomGames(games));
  const navigate = useNavigate();

  useEffect(() => {
    const interval = setInterval(() => {
      setHomeGames((games) => cycleArray(games));
    }, cardDuration * 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <>
      <Transition className="Home" direction="left">
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
        <Button className="Store" handleClick={() => navigate("/games")}>
          게임 더보기 <RiArrowRightLine />
        </Button>
      </Transition>
      <Footer />
    </>
  );
};

export default Home;
