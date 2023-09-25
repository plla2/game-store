import { Game } from "../types/Game.types";
import { get } from "./api";

interface Params {
  id: number;
}

const gameDetail = (params: Params): Promise<Game> => {
  return get<Game>(`games/${params.id}`);
};

export { gameDetail };
