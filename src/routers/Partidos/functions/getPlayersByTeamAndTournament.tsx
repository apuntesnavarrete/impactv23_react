import { Plantelestype } from "../../../types/plantelestype";

 const getPlayersByTeamAndTournament = async (id: number, tournamentId: number): Promise<Plantelestype[]> => {
  try {
    // Cambia la URL con la dirección de tu API
    const response = await fetch('http://18.188.110.39:83/api/v1/rosters');
    const jsonData: Plantelestype[] = await response.json();

    // Filtra el conjunto de datos por el ID proporcionado y el torneo proporcionado
    const objetosFiltrados = jsonData.filter(objeto => objeto.teams.id === id && objeto.tournaments.id === tournamentId);

    console.log(objetosFiltrados);
    
    return objetosFiltrados;
  } catch (error) {
    console.error('Error al obtener datos:', error);
    // En caso de error, puedes retornar un array vacío o manejar el error según tus necesidades.
    throw error;
  }
};

export default getPlayersByTeamAndTournament;
