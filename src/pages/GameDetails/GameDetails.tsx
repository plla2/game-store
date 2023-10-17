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
import { RiAddLine } from "@react-icons/all-files/ri/RiAddLine";
import { RiCheckLine } from "@react-icons/all-files/ri/RiCheckLine";
import Button from "../../components/Button/Button";
import { getPrice } from "../../utils/getPrice";

interface Props {
  cartItems: Game[];
  addCartItem: (game: Game) => void;
}

const GameDetails = ({ cartItems, addCartItem }: Props) => {
  const params = useParams();
  const id = Number(params.gameId);
  const [game, setGame] = useState<Game>();

  useEffect(() => {
    (async () => {
      const [game, screenshots] = await Promise.all([
        gameDetail({ id }),
        gameScreenShot({ id }),
      ]);
      const short_screenshots = [
        { id: -1, image: game.background_image },
        ...screenshots.results,
      ];
      const price = getPrice(game);
      setGame({ ...game, short_screenshots, price });
    })();
  }, [id]);

  return (
    <div>
      <Transition className="GameDetails" direction="left">
        <Navbar title={game?.name} showStoreButton />
        {game ? (
          <Transition className="Grid" direction="down">
            <Carousel duration={6}>
              {game.short_screenshots.map((shot) => (
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
        ) : (
          <Loading />
        )}
      </Transition>
    </div>
  );
};
export default GameDetails;
