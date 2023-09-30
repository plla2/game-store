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
import { RiPlaystationFill, RiXboxFill } from "react-icons/ri";
import { SiLinux, SiNintendo3Ds } from "react-icons/si";

const GameListCard = (game: Game) => {
  const { price, name, parent_platforms, genres, released, background_image } =
    game;
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

  return (
    <div className="GameCard">
      <motion.div
        className="Image"
        style={{ backgroundImage: `url(${background_image})` }}
        whileHover={{ height: 180 }}
      />
      <motion.div
        className="Info"
        whileHover={{ height: 180 }}
        onHoverStart={() => setIsHovered(true)}
        onHoverEnd={() => setIsHovered(false)}
      >
        <div className="Price">
          <Button className="CartButton">
            Add to Cart <AiOutlinePlus />
          </Button>
          $ {price}
        </div>
        <Button className="Name">{name}</Button>
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
