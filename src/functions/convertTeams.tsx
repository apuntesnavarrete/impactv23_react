import Fuse from "fuse.js";
import { Game } from "../types/game";
import { EquiposType } from "../types/equipostype";
const options = {
    keys: ['name'], // Campo donde se realizará la búsqueda
    threshold: 0.3 // Ajusta este valor según el nivel de precisión que necesites
  };

 export const convertTeams = (teamsTournament: Partial<EquiposType>[], games: Game[]) => {
    const fuse = new Fuse(teamsTournament, options);
  
    // Crea una nueva copia del array de juegos
    const updatedGames = games.map(game => {
      const resultsAway = fuse.search(game.awayTeam);
      const resultsHome = fuse.search(game.homeTeam);
  
      // Si hay resultados, actualiza los nombres de los equipos con sus logos
      return {
        ...game,
        awayTeam: resultsAway.length > 0 ? resultsAway[0].item.logo : game.awayTeam,
        homeTeam: resultsHome.length > 0 ? resultsHome[0].item.logo : game.homeTeam,
      };
    });
  return updatedGames
    // Actualiza el estado con la nueva copia del array
  };