import { MatchType } from "../types/partidoType";


  
  // Función para obtener una lista de equipos únicos a partir de un array de partidos
export const uniqueTeamIds = (matches: MatchType[]): number[] => {
  // Usamos un conjunto (Set) para almacenar los IDs de los equipos únicos
  const teamIdsSet = new Set<number>();

  // Iteramos sobre cada partido para agregar los IDs de los equipos al conjunto
  matches.forEach(match => {
    teamIdsSet.add(match.teamHome.id);
    teamIdsSet.add(match.teamAway.id);
  });

  // Convertimos los IDs del conjunto de nuevo a un array
  const uniqueTeamIds = Array.from(teamIdsSet);

  return uniqueTeamIds;
};