import { Game } from "../../types/Game.types";
import { AnimatePresence, motion } from "framer-motion";
import Button from "../Button/Button";
import { useState } from "react";
import Transition from "../Transition/Transition";
import { AiFillWindows } from "@react-icons/all-files/ai/AiFillWindows";
import { AiFillAndroid } from "@react-icons/all-files/ai/AiFillAndroid";
import { AiFillApple } from "@react-icons/all-files/ai/AiFillApple";
import { AiOutlinePlus } from "@react-icons/all-files/ai/AiOutlinePlus";
import { RiPlaystationFill } from "@react-icons/all-files/ri/RiPlaystationFill";
import { RiXboxFill } from "@react-icons/all-files/ri/RiXboxFill";
import { SiNintendo3Ds } from "@react-icons/all-files/si/SiNintendo3Ds";
import { RiCheckLine } from "@react-icons/all-files/ri/RiCheckLine";
import { SiLinux } from "@react-icons/all-files/si/SiLinux";
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
