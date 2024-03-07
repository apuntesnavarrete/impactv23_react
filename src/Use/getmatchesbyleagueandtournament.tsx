import { MatchType } from "../types/partidoType";
import { TorneoType } from "../types/torneotype";

export const getMatchesbyleagueandTournament = async (
    liga: string | null | undefined,
    torneo: string | null | undefined,
): Promise<MatchType[]> => {
    try {
        const responseTournaments = await fetch('http://18.188.110.39:83/api/v1/tournaments');
        if (!responseTournaments.ok) {
            throw new Error('Error al obtener los datos de los torneos. Estado: ' + responseTournaments.status);
        }
        const dataTournaments: TorneoType[] = await responseTournaments.json();

        const torneoSeleccionado = dataTournaments.find(item => 
            item.leagues?.Alias?.toUpperCase() === (liga || "")?.toUpperCase() &&
            item.categories.categorias.toUpperCase() === (torneo || "")?.toUpperCase()
        );

        if (!torneoSeleccionado) {
            throw new Error('No se encontró el torneo especificado.');
        }

        const idtorneo = torneoSeleccionado.id;

        const responseMatches = await fetch('http://18.188.110.39:83/api/v1/matches');
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