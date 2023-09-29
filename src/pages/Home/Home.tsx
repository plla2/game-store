import { useEffect, useState } from "react";
import { Game } from "../../types/Game.types";
import { motion } from "framer-motion";
import GameCard from "../../components/GameCard/GameCard";
import Button from "../../components/Button/Button";
import { RiArrowRightLine } from "react-icons/ri";

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
    <motion.div
      className="Home"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
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
      <Button className="Store">
        쇼핑하러 가기 <RiArrowRightLine />
      </Button>
    </motion.div>
  );
};

export default Home;
