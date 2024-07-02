import { Game } from "../types/game";

export const parseGamesRoll= (input: string, date: string): Game[] => {
    const lines = input.split(' ').filter(line => line.trim() !== '');
    const games: Game[] = [];
  
    for (let i = 0; i < lines.length; i += 4) {
      if (i + 3 < lines.length) {
        const gameTime = lines[i];
        const homeTeam = lines[i + 1];
        const awayTeam = lines[i + 2];
        const category = lines[i + 3];
        games.push({
          gameTime: gameTime.trim(),
          homeTeam: homeTeam.trim(),
          awayTeam: awayTeam.trim(),
          category: category.trim(),
          date: date.trim(), // Añadimos la fecha aquí
        });
      }
    }
  
    return games;
  };