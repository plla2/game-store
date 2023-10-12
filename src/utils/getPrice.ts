import { Game } from "../types/Game.types";

const getPrice = (game: Game) => {
  const isIndie = !!game.genres.find((g) => g.name === "Indie");
  const minPrice = 2;
  const releaseYear = new Date(game.released).getFullYear();
  const currentYear = new Date().getFullYear();
  const yearAgo = currentYear - releaseYear;
  let discountPerYear = isIndie ? 0.3 : 0.375;
  let newPrice = isIndie ? 200 : 300;
  for (let i = 0; i < yearAgo; i++) {
    newPrice *= 1 - discountPerYear;
    discountPerYear -= 0.02;
  }
  newPrice = Math.ceil(newPrice);
  newPrice = newPrice < minPrice ? minPrice : newPrice;
  return newPrice - 0.01;
};

export { getPrice };
