import Fuse from "fuse.js";
import { Game } from "../types/game";
import { EquiposType } from "../types/equipostype";

const options = {
  keys: ['name'],
  threshold: 0.3,
};

export const convertTeams = (
  teamsTournament: Partial<EquiposType>[],
  games: Game[]
): Game[] => {
  const fuse = new Fuse(teamsTournament, options);

  // Crea una nueva copia del array de juegos
  const updatedGames = games.map(game => {
    const resultsAway = fuse.search(game.awayTeam);
    const resultsHome = fuse.search(game.homeTeam);

    // Asegúrate de que awayTeam y homeTeam siempre sean string
    const awayTeamLogo = resultsAway.length > 0 ? resultsAway[0].item.logo ?? '' : game.awayTeam;
    const homeTeamLogo = resultsHome.length > 0 ? resultsHome[0].item.logo ?? '' : game.homeTeam;

    return {
      ...game,
      awayTeam: awayTeamLogo || game.awayTeam || '',
      homeTeam: homeTeamLogo || game.homeTeam || '',
    };
  });

  return updatedGames;
};
