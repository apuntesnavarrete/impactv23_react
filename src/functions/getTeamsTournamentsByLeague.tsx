import { EquiposByTournamentType } from "../types/equipostype";

export function getTeamsTournamentsByLeague(data: EquiposByTournamentType[], league: string = "Pro"): EquiposByTournamentType[] {
  return data.filter((item) => 
    item.tournaments !== null && item.tournaments.idName.startsWith(league)
  );
}