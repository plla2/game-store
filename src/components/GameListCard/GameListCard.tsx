import { Game } from "../../types/Game.types";
import { AnimatePresence, motion } from "framer-motion";
import Button from "../Button/Button";
import { useState } from "react";
import Transition from "../Transition/Transition";
import {
  AiFillWindows,
  AiFillAndroid,
  AiFillApple,
  AiOutlinePlus,
} from "react-icons/ai";
import { RiCheckLine, RiPlaystationFill, RiXboxFill } from "react-icons/ri";
import { SiLinux, SiNintendo3Ds } from "react-icons/si";
import { useNavigate } from "react-router-dom";

interface Props {
  game: Game;
  addCartItem: (game: Game) => void;
  cartItems: Game[];
}
const GameListCard = ({ game, addCartItem, cartItems }: Props) => {
  const {
    price,
    name,
    parent_platforms,
    genres,
    released,
    background_image,
    id,
  } = game;
  const platformsIcon: Record<string, React.ReactNode> = {
    pc: <AiFillWindows />,
    android: <AiFillAndroid />,
    mac: <AiFillApple />,
    linux: <SiLinux />,
    xbox: <RiXboxFill />,
    playstation: <RiPlaystationFill />,
    nintendo: <SiNintendo3Ds />,
  };
  const [isHovered, setIsHovered] = useState(false);
  const genresList = genres.map(({ name }) => name).join(", ");
  const navigate = useNavigate();
  return (
    <div className="GameCard">
      <motion.div
        className="Image"
        style={{ backgroundImage: `url(${background_image})` }}
        whileHover={{ height: 180 }}
        onClick={() => navigate(`/games/${id}`)}
      />
      <motion.div
        className="Info"
        whileHover={{ height: 180 }}
        onHoverStart={() => setIsHovered(true)}
        onHoverEnd={() => setIsHovered(false)}
      >
        <div className="Price">
          {cartItems.find((item) => item.id === id) ? (
            <Transition className="Added">
              Cart Added <RiCheckLine />
            </Transition>
          ) : (
            <Button
              className="CartButton"
              handleClick={() => addCartItem(game)}
            >
              Add to Cart <AiOutlinePlus />
            </Button>
          )}
          $ {price}
        </div>
        <Button className="Name" handleClick={() => navigate(`/games/${id}`)}>
          {name}
        </Button>
        <AnimatePresence>
          {isHovered && (
            <Transition className="Details">
              <div className="Platform">
                {parent_platforms.map(({ platform }) => (
                  <div key={platform.id} title={platform.name}>
                    {platformsIcon[platform.slug]}
                  </div>
                ))}
              </div>
              <div className="Released">출시일 : {released}</div>
              <div className="Genres">장르 : {genresList}</div>
            </Transition>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
};

export default GameListCard;
