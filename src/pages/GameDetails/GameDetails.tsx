/* eslint-disable react-hooks/exhaustive-deps */
import { useParams } from "react-router-dom";
import { Game } from "../../types/Game.types";
import Transition from "../../components/Transition/Transition";
import Navbar from "../../components/Navbar/Navbar";
import { useEffect, useState } from "react";
import Loading from "../../components/Loading/Loading";
import { gameScreenShot } from "../../apis/gameScreenShots";
import { gameDetail } from "../../apis/gameDetail";
import Carousel from "../../components/Carousel/Carousel";
import Info from "../../components/Info/Info";
import { RiAddLine, RiCheckLine } from "react-icons/ri";
import Button from "../../components/Button/Button";

interface Props {
  games: Game[] | null;
  cartItems: Game[];
  addCartItem: (game: Game) => void;
}

const GameDetails = ({ games, cartItems, addCartItem }: Props) => {
  const params = useParams();
  const id = Number(params.gameId);
  const [game, setGame] = useState<Game>();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadDetails = async () => {
      const res = await gameDetail({ id });
      setGame((game) => ({ ...game, ...res }));
    };
    const loadScreenshots = async () => {
      const res = await gameScreenShot({ id });
      const short_screenshots = res.results;
      setGame((game) => ({ ...game, short_screenshots } as Game));
    };
    loadDetails();
    if (games) {
      const game = games.find((game) => game.id === id);
      game ? setGame((g) => ({ ...g, ...game })) : loadScreenshots();
    } else {
      loadScreenshots();
    }
    setIsLoading(false);
  }, []);

  return (
    <div>
      <Transition className="GameDetails" direction="left">
        <Navbar title={game?.name} showStoreButton />
        {isLoading ? (
          <Loading />
        ) : (
          game && (
            <Transition className="Grid" direction="down">
              <Carousel duration={6}>
                {game?.short_screenshots.map((shot) => (
                  <div className="Image" key={`img-${shot.id}`}>
                    <img
                      className="BackgroundImage"
                      src={shot.image}
                      alt="screenshot"
                    />
                  </div>
                ))}
              </Carousel>
              <Info game={game} />
              <div className="Price">
                ${game.price}
                {cartItems.find((item) => item.id === id) ? (
                  <Transition className="Added">
                    Added <RiCheckLine />
                  </Transition>
                ) : (
                  <Button handleClick={() => addCartItem(game)}>
                    Add to cart <RiAddLine />
                  </Button>
                )}
              </div>
            </Transition>
          )
        )}
      </Transition>
    </div>
  );
};

export default GameDetails;
