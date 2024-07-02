import { useParams } from "react-router-dom";
import useFetch from "../../Use/UseFetch";
import { apiruta } from "../../config/apiruta";
import { getTeamsTournamentsByLeague } from "../../functions/getTeamsTournamentsByLeague";
import { EquiposByTournamentType, EquiposType } from "../../types/equipostype";
import { useState, useEffect, useMemo, useRef } from "react";
import { cleanInputRoll } from "../../functions/cleanInputRoll";
import { parseGamesRoll } from "../../functions/parseGamesRoll";
import { convertTeams } from "../../functions/convertTeams";


const RollView = () => {
  const [teamsTournament, setTeamsTournament] = useState<Partial<EquiposType>[]>([]);
  const { liga } = useParams();
  const { data, loading, error } = useFetch<EquiposByTournamentType[]>(`${apiruta}/api/v1/teams-tournament`);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const [date, setDate] = useState<string>(() => {
    const today = new Date();
    return today.toISOString().split('T')[0]; // Formato yyyy-MM-dd
  });
    const [dayOfWeek, setDayOfWeek] = useState('');

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
  const handleButtonClick = () => {
    if (textareaRef.current) {
      const inputValue = textareaRef.current.value;

     const rollclean = cleanInputRoll(inputValue)

     const parsedGames = parseGamesRoll(rollclean, date); // Pasamos la fecha aquí

     let gameConvert = convertTeams(teamsTournament,parsedGames)
      // Aquí puedes poner la lógica que deseas ejecutar
      console.log('team convertidos', gameConvert);

    }
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  //este puedo hacerlo un hook para futuras implementaciones
  const handleDateChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const daysOfWeek = ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'];

    const selectedDate = new Date(event.target.value);
    const formattedDate = `${String(selectedDate.getDate()).padStart(2, '0')}/${String(selectedDate.getMonth() + 1).padStart(2, '0')}/${selectedDate.getFullYear()}`;
    console.log(formattedDate);
    const day = daysOfWeek[selectedDate.getDay() + 1];

    setDate(event.target.value); // Actualizar el estado con el valor en formato yyyy-MM-dd
    setDayOfWeek(day);
  };

  return (
    <div>
       <label htmlFor="date">Date:</label>
       <input type="date" value={date} onChange={handleDateChange} />
      <p>Fecha seleccionada: {date}</p>
      <p>Día de la semana: {dayOfWeek}</p>
              <p>Texto de prueba</p>
        <textarea ref={textareaRef} rows={10} cols={50} />
        <button onClick={handleButtonClick}>Ejecutar</button>   
        
         
    </div>
  );
}

export default RollView;