import { Game } from "../types/Game.types";
import { ResponseSchema, get } from "./api";

interface Params {
  page?: number;
  page_size?: number;
  search?: string;
  dates?: string;
  ordering?: string;
}

const gameList = (params?: Params): Promise<ResponseSchema<Game>> => {
  return get<ResponseSchema<Game>>("games", params as Record<string, string>);
};

export { gameList };
