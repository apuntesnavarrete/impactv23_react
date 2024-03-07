import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { getMatchesbyleagueandTournament } from "../../Use/getmatchesbyleagueandtournament";
import { uniqueTeamIds } from "../../Use/uniqueTeams";
import { ExtendedMatchType } from "../../types/partidoType";

interface Props {
  matches: ExtendedMatchType[];
  filterTeamIds: number[];
}

const MatchTable: React.FC<Props> = ({ matches, filterTeamIds }) => {

    const sortedMatches = matches.slice().sort((a, b) => {
        return new Date(b.date).getTime() - new Date(a.date).getTime();
      });

      const filteredMatches = sortedMatches.filter(match =>
        filterTeamIds.includes(match.teamHome.id) || filterTeamIds.includes(match.teamAway.id)
      );

   

  return (
    <table>
      <thead>
        <tr>
          <th>ID</th>
          <th>Fecha</th>
          <th>Jornada</th>
          <th>Local</th>
          <th>Visitante</th>
          <th>Veces Jugadas</th>

        </tr>
      </thead>
      <tbody>
        {filteredMatches.map((match) => (
          <tr key={match.id}>
            <td>{match.id}</td>
            <td>{match.date}</td>
            <td>{match.matchday}</td>
            <td>{match.teamHome.name}</td>
            <td>{match.teamAway.name}</td>
            <td>{match.timesPlayed}</td> {/* Nuevo campo para contar las veces que los equipos se han enfrentado */}

          </tr>
        ))}
      </tbody>
    </table>
  );
};

const Roll = () => {
  const [partidos, setPartidos] = useState<ExtendedMatchType[]>([]);
  const [equiposIds, setEquiposIds] = useState<number[]>([]);

  const { liga, torneo } = useParams();

  const fetchMatches = async () => {
    try {
      const matches = await getMatchesbyleagueandTournament(liga, torneo);
      console.log("Partidos obtenidos:", matches);
      const teamIds = uniqueTeamIds(matches);
      setEquiposIds(teamIds);
      // Calcular el campo timesPlayed para cada partido
      const matchesWithTimesPlayed = matches.map(match => {
        const homeTeamId = match.teamHome.id;
        const awayTeamId = match.teamAway.id;
        const timesPlayed = matches.filter(m =>
          (m.teamHome.id === homeTeamId && m.teamAway.id === awayTeamId) ||
          (m.teamHome.id === awayTeamId && m.teamAway.id === homeTeamId)
        ).length;
        return { ...match, timesPlayed };
      });
      setPartidos(matchesWithTimesPlayed);
    } catch (error) {
      console.error("Error al obtener los partidos:", error);
    }
  };

  useEffect(() => {
    fetchMatches();
  }, [liga, torneo]);

  return (
    <>
      <div>
        <h1>Tabla de Partidos</h1>
        {equiposIds.map(teamId => (
          <div key={teamId}>
            <h2>Equipo ID: {teamId}</h2>
            <MatchTable matches={partidos} filterTeamIds={[teamId]} />
          </div>
        ))}
      </div>
    </>
  );
};

export default Roll;