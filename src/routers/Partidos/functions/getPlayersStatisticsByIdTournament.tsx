export const getPlayersStadisticsByIdMatch = async (idMatch: number): Promise<any[]> => {
    try {
        const response = await fetch('http://18.188.110.39:83/api/v1/PlayerStatistics');
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const data = await response.json();
        return data.filter((playerStatistic: any) => playerStatistic.matches.id === idMatch);
    } catch (error) {
        console.error('Error fetching data:', error);
        return [];
    }
};

export const getPlayersStadisticsByIdTournament = async (idTournament: number): Promise<any[]> => {
    try {
        const response = await fetch('http://18.188.110.39:83/api/v1/PlayerStatistics');
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const data = await response.json();
        return data.filter((playerStatistic: any) => playerStatistic.matches.tournaments.id === idTournament);
    } catch (error) {
        console.error('Error fetching data:', error);
        return [];
    }
};

//aun en pruebas
export const getMatchByIdMatch = async (idMatch: number): Promise<any[]> => {
    try {
        const infoPartido = await fetch(`http://18.188.110.39:83/api/v1/matches/${idMatch}`);

        if (!infoPartido.ok) {
            throw new Error('Network response was not ok for segundaResponse');
        }

        const infoPartidoData = await infoPartido.json();
        return infoPartidoData;
    } catch (error) {
        throw new Error('Error al obtener la información del partido: ' + error);
    }
};