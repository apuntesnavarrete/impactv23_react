import { useParams } from "react-router-dom";
import useFetch from "../../Use/UseFetch";
import { apiruta } from "../../config/apiruta";
import { getTeamsTournamentsByLeague } from "../../functions/getTeamsTournamentsByLeague";
import { EquiposByTournamentType, EquiposType } from "../../types/equipostype";
import { useState, useEffect, useMemo, useRef } from "react";
import { cleanInputRoll } from "../../functions/cleanInputRoll";
import { parseGamesRoll } from "../../functions/parseGamesRoll";
import { convertTeams } from "../../functions/convertTeams";
import { Game } from "../../types/game";
import './rollview.css'
import RollLayer from "./rolllayer";
import ButtonCapture from "../../components/buttonCapture";
import useTodayDate from "../../Use/useTodayDay";
import { EditDate } from "../../components/editDate";
import { RollInput } from "./rollInput";



const RollView = () => {
  
  const [toogleRoll, SetToogleRoll] = useState(false)
  const [toogleFecha, SetToogleFecha] = useState(false)

  const [teamsTournament, setTeamsTournament] = useState<Partial<EquiposType>[]>([]);
  const { liga } = useParams();
  const { data, loading, error } = useFetch<EquiposByTournamentType[]>(`${apiruta}/api/v1/teams-tournament`);
  //const textareaRef = useRef<HTMLTextAreaElement>(null);
  
  const { date, dayOfWeek, handleDateChange } = useTodayDate();

  const [gamesFinal, SetGamesFinal] = useState<Game[]>([]);
  const rollLayerRef = useRef<HTMLDivElement>(null);

  console.log("RollView render");

  const filteredTeams = useMemo(() => {
    if (data) {
      return getTeamsTournamentsByLeague(data, liga);
    }
    return [];
  }, [data, liga]);

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
  }, [filteredTeams]);

  const handleRollConversion = (convertedGames: Game[]) => {
    SetGamesFinal(convertedGames);
    SetToogleRoll(true);
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;
/*
  const ConvertRoll = () => {
    if (textareaRef.current) {
      const inputValue = textareaRef.current.value;
      const rollclean = cleanInputRoll(inputValue);
      const parsedGames = parseGamesRoll(rollclean);
      const gameConvert = convertTeams(teamsTournament, parsedGames);
      SetGamesFinal(gameConvert);
      console.log(gamesFinal);
      SetToogleRoll(true)
    }
  };
*/
  const EditarFecha = () =>{
    SetToogleFecha(true)
  }
  return (
    <div className="ConvertRoll">
      {toogleFecha && <EditDate date={date} handleDateChange={handleDateChange} />
    }
      
      <RollInput onRollConvert={handleRollConversion} teamsTournament={teamsTournament} />

      
      {toogleRoll && <div>
        <button onClick={EditarFecha}>Editar Fecha</button>
        <ButtonCapture captureRef={rollLayerRef} /> 

        <RollLayer ref={rollLayerRef} gamesFinal={gamesFinal} dayOfWeek={dayOfWeek} date={date}  liga={liga} />
      </div> }
    </div>
  );
}

export default RollView;

