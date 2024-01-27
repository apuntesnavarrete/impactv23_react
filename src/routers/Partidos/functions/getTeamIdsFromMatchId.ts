import { MatchType } from "../../../types/partidoType";
import TeamIds from "../../../types/teamsid";



const getTeamIdsFromMatchId = async (numeroIdPartido: number): Promise<TeamIds | null> => {
  try {
    // Realizar la consulta a la API
    const response = await fetch('http://18.188.110.39:83/api/v1/matches');
    
    // Verificar si la solicitud fue exitosa
    if (!response.ok) {
      throw new Error('Error al obtener los datos');
    }
    
    // Convertir la respuesta a formato JSON
    const data: MatchType[] = await response.json();
    
    // Actualizar el estado con los datos de la API
    const objetoEncontrado: MatchType | undefined = data.find(objeto => objeto.id === numeroIdPartido);
    if (objetoEncontrado) {
      const teamAwayId: number | null = objetoEncontrado.teamAway?.id ?? null;
      const teamHomeId: number | null = objetoEncontrado.teamHome?.id ?? null;

      return { teamAwayId, teamHomeId };
    } else {
      return null;
    }
  } catch (error) {
    console.error('Error:', error);
    return null;
  }
};

export default getTeamIdsFromMatchId;

