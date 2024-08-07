import { apiruta } from "../config/apiruta";
import { Plantelestype } from "../types/plantelestype";

 const getPlayersByTeamAndTournament = async (id: number, tournamentId: number | null ): Promise<Plantelestype[]> => {
  try {
    // Cambia la URL con la dirección de tu API
    const response = await fetch(`${apiruta}/api/v1/rosters`);
    const jsonData: Plantelestype[] = await response.json();

    // Filtra el conjunto de datos por el ID proporcionado y el torneo proporcionado
    const objetosFiltrados = jsonData.filter(objeto => objeto.teams.id === id && objeto.tournaments.id === tournamentId);

    objetosFiltrados.sort((a, b) => a.participants.id - b.participants.id);

    
    return objetosFiltrados;
  } catch (error) {
    console.error('Error al obtener datos:', error);
    // En caso de error, puedes retornar un array vacío o manejar el error según tus necesidades.
    throw error;
  }
};



export default getPlayersByTeamAndTournament;
