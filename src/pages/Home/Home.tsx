import { useEffect, useState } from "react";
import { Game } from "../../types/Game.types";
import GameCard from "../../components/GameCard/GameCard";
import Button from "../../components/Button/Button";
import { RiArrowRightLine } from "react-icons/ri";
import Transition from "../../components/Transition/Transition";
import { useNavigate } from "react-router-dom";
import Footer from "../../components/Footer/Footer";
import Loading from "../../components/Loading/Loading";

interface Props {
  setGames: (games: Game[]) => void;
  loadGames: (value?: string) => Promise<Game[]>;
}

const cardDuration = 10;
const cycleArray = (array: unknown[]) => {
  const newArr = [...array];
  newArr.push(newArr.shift());
  return newArr;
};

const getRandomGames = (games: unknown[], length: number) => {
  const randomGames = new Set();
  while (randomGames.size < length) {
    const index = Math.floor(Math.random() * games.length);
    randomGames.add(games[index]);
  }
  return [...randomGames];
};

const Home = ({ setGames, loadGames }: Props) => {
  const [homeGames, setHomeGames] = useState<Game[]>();
  const navigate = useNavigate();

  useEffect(() => {
    let interval: number | undefined;
    (async () => {
      const loadedGames = await loadGames();
      const homeGames = getRandomGames(loadedGames, 4) as Game[];
      setGames(loadedGames);
      setHomeGames(homeGames);
      interval = setInterval(() => {
        setHomeGames((games) => cycleArray(games as Game[]) as Game[]);
      }, cardDuration * 1000);
    })();
    return () => clearInterval(interval);
  }, []);

  return (
    <>
      <Transition className="Home" direction="left">
        {homeGames ? (
          <Transition className="Grid" direction="left">
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
        ) : (
          <Loading />
        )}
        <Footer />
      </Transition>
    </>
  );
};

export default Home;
