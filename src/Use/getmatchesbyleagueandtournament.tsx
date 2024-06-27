import { apiruta } from "../config/apiruta";
import { MatchType } from "../types/partidoType";
import { TorneoType } from "../types/torneotype";

export const getMatchesbyleagueandTournament = async (
    liga: string | null | undefined,
    torneo: string | null | undefined,
): Promise<MatchType[]> => {
    try {
        const responseTournaments = await fetch(`${apiruta}/api/v1/tournaments`);
        if (!responseTournaments.ok) {
            throw new Error('Error al obtener los datos de los torneos. Estado: ' + responseTournaments.status);
        }
        const dataTournaments: TorneoType[] = await responseTournaments.json();

const resultadosFiltrados = dataTournaments.filter(item => item.leagues && item.leagues.Alias === liga?.toUpperCase() && item.categories.categorias.toUpperCase() === torneo?.toUpperCase() );
const RESULTIRDENADOS =  resultadosFiltrados.sort((b, a) => a.idName.localeCompare(b.idName));

const torneoSeleccionado = RESULTIRDENADOS[0]

        if (!torneoSeleccionado) {
            throw new Error('No se encontró el torneo especificado.');
        }

        const idtorneo = torneoSeleccionado.id;

        const responseMatches = await fetch(`${apiruta}/api/v1/matches`);
        if (!responseMatches.ok) {
            throw new Error('Error al obtener los datos de los partidos. Estado: ' + responseMatches.status);
        }
        const dataMatches: MatchType[] = await responseMatches.json();

        const partidosOrdenados = dataMatches
            .filter(item => item.tournaments?.id === idtorneo)
            .sort((a, b) => b.matchday - a.matchday);

        return partidosOrdenados;
    } catch (error) {
        console.error('Error en fetchData:', error);
        throw error;
    }
};