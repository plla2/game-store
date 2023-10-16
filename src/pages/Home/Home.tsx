import { useEffect, useState } from "react";
import { Game } from "../../types/Game.types";
import GameCard from "../../components/GameCard/GameCard";
import Button from "../../components/Button/Button";
import { RiArrowRightLine } from "@react-icons/all-files/ri/RiArrowRightLine";
import Transition from "../../components/Transition/Transition";
import { useNavigate } from "react-router-dom";
import Footer from "../../components/Footer/Footer";
import Loading from "../../components/Loading/Loading";

interface Props {
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

const Home = ({ loadGames }: Props) => {
  const [games, setGames] = useState<Game[]>();
  const navigate = useNavigate();
  const navigateToStore = () => navigate(`/games`);

  useEffect(() => {
    let interval: number | undefined;
    (async () => {
      const loadedGames = await loadGames();
      const games = getRandomGames(loadedGames, 4) as Game[];
      setGames(games);
      interval = setInterval(() => {
        setGames((games) => cycleArray(games as Game[]) as Game[]);
      }, cardDuration * 1000);
    })();
    return () => clearInterval(interval);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <Transition className="Home" direction="left">
        {games ? (
          <Transition className="Grid" direction="left">
            {games.map((game, index) => (
              <GameCard
                key={game.id}
                id={game.id}
                name={game.name}
                backgroundImage={game.background_image}
                duration={cardDuration}
                big={index === 0}
              />
            ))}
            <Button className="Store" handleClick={navigateToStore}>
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
