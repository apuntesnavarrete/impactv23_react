import { apiruta } from "../../../config/apiruta";
import { EquiposByTournamentType } from "../../../types/equipostype";

export const getTeamsTournaments = async (idTorneo : number | null) => {
    try {

        const response = await fetch(`${apiruta}/api/v1/teams-tournament`);
        if (!response.ok) {
            throw new Error('La solicitud no pudo ser completada');
        }
        const result: EquiposByTournamentType[] = await response.json();

        if (idTorneo !== null) {
            const teamsFilterbyId = result.filter((item) => item.tournaments?.id === idTorneo);
            return teamsFilterbyId;
        } else {
            console.error('No se pudo obtener el ID del torneo.');
            return [];
        }
    } catch (error) {
        console.error('Error fetching data:', error);
        throw new Error('Ocurrió un error al cargar los datos');
    }
};