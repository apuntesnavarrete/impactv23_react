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


