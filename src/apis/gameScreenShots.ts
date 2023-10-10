import { ResponseSchema, get } from "./api";

interface Screenshot {
  id: number;
  image: string;
}

interface Params {
  id: number;
}

const gameScreenShot = (
  params: Params
): Promise<ResponseSchema<Screenshot>> => {
  return get(`games/${params.id}/screenshots`);
};

export { gameScreenShot };
