import { useParams } from "react-router-dom";
import useFetch from "../../Use/UseFetch";
import { apiruta } from "../../config/apiruta";
import { getTeamsTournamentsByLeague } from "../../functions/getTeamsTournamentsByLeague";
import { EquiposByTournamentType, EquiposType } from "../../types/equipostype";
import { useState, useEffect, useCallback, useMemo } from "react";

const RollView = () => {
  const [input, setInput] = useState('');
  const [teamsTournament, setTeamsTournament] = useState<Partial<EquiposType>[]>([]);
  const { liga } = useParams();
  const { data, loading, error } = useFetch<EquiposByTournamentType[]>(`${apiruta}/api/v1/teams-tournament`);

  //se jecuta 3 veces
  console.log("RollView render");

  // Utilizamos useMemo para memoizar los equipos filtrados
  const filteredTeams = useMemo(() => {
    if (data) {
      return getTeamsTournamentsByLeague(data, liga);
    }
    return [];
  }, [data, liga]); // Dependencias correctas

  // useEffect ahora depende de filteredTeams
  useEffect(() => {
    if (filteredTeams.length > 0) {
      const teamInfo = filteredTeams.map((item) => ({
        id: item.teams.id,
        name: item.teams.name,
        logo: item.teams.logo,
        participants: item.teams.participants,
      }));
      setTeamsTournament(teamInfo);
    }
  }, [filteredTeams]); // Dependencias correctas

  // Utilizamos useCallback para memoizar handleInputChange
  const handleInputChange = useCallback((event: React.ChangeEvent<HTMLTextAreaElement>) => {
    console.log("handleInputChange render");
    setInput(event.target.value);
    console.log(event.target.value)
    console.log(teamsTournament)
  }, [teamsTournament]); // Dependencias correctas

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div>
      <textarea value={input} onChange={handleInputChange} rows={10} cols={50} />
    </div>
  );
}

export default RollView;