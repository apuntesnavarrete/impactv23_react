// src/components/PartidoForm.tsx
import React, { useState, ChangeEvent, FormEvent, useEffect } from 'react';
import getTeamIdsFromMatchId from '../../functions/getTeamIdsFromMatchId';
import getPlayersByTeamAndTournament from '../../functions/getPlayersByTeamAndTournament';

interface JugadorData {
  annotations: number;
  attendance: boolean;
  matches: number,
  participants: number,
  teams: number,
  name: string
}






// eslint-disable-next-line @typescript-eslint/no-unused-vars


const Pruebas: React.FC = () => {
  const [jugadores, setJugadores] = useState<JugadorData[]>([]);
  const [selectedTeam, setSelectedTeam] = useState('away');

  const numeroIdPartido = 31

  useEffect(() => {
    getTeamIdsFromMatchId(numeroIdPartido)
      .then((resultado) => {
        const teamAwayId = resultado?.teamAwayId || 0;
        const teamHomeId = resultado?.teamHomeId || 0;

        const promiseAway = getPlayersByTeamAndTournament(teamAwayId, 1);
        const promiseHome = getPlayersByTeamAndTournament(teamHomeId, 1);

        return Promise.all([promiseAway, promiseHome]);
      })
      .then(([equiposFiltradosAway, equiposFiltradosHome]) => {
        console.log('Equipos filtrados para teamAwayId:', equiposFiltradosAway);
        console.log('Equipos filtrados para teamHomeId:', equiposFiltradosHome);
        const selectedTeamData = selectedTeam === 'away' ? equiposFiltradosAway : equiposFiltradosHome;

        const convertedArray = selectedTeamData.map(({ participants, teams }) => ({
          name: participants.name,
          participants: participants.id,
          teams: teams.id,
        }));
        
        const jugadoresjson = convertedArray.map((jugador,index) => ({
          name: convertedArray[index].name,

          annotations: 0,
          attendance: false,
          matches: 22,
          participants: convertedArray[index].participants,
          teams: convertedArray[index].teams, 
        }));
        console.log(convertedArray);
        setJugadores(jugadoresjson); // Actualiza el estado con convertedArray

      })
      .catch((error) => {
        console.error('Error:', error);
      });
  }, [numeroIdPartido, selectedTeam]);

  
  const handleInputChange = (e: ChangeEvent<HTMLInputElement>, index: number) => {
    const { name, value, type, checked } = e.target;
  
    setJugadores((prevJugadores) => {
      const newJugadores = [...prevJugadores];
  
      // Si el tipo es checkbox, utiliza el valor booleano checked
      const inputValue = type === 'checkbox' ? checked : value;
  
      newJugadores[index] = { ...newJugadores[index], [name]: inputValue };
      return newJugadores;
    });
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    console.log('ver datos:', jugadores);

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const postData = jugadores.map(({ name, ...rest }) => rest);
    console.log('ver postData:', postData);
    const filteredArray = postData.filter((jugador) => jugador.attendance);
    console.log('filtrado true:', filteredArray);



    try {
      const response = await fetch(`http://localhost:4000/api/v1/PlayerStatistics`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(filteredArray),
      });

      if (response.ok) {
        console.log(response);
      } else {
        // Manejar respuesta de error
      }
    } catch (error) {
      console.error('Error submitting form:', error);
    }
  }

  const handleToggleCheckboxes = () => {
    setJugadores((prevJugadores) => {
      const newJugadores = prevJugadores.map((jugador) => ({
        ...jugador,
        attendance: !jugador.attendance,
      }));
      return newJugadores;
    });
  };

  return (
<>
    <button onClick={() => setSelectedTeam('away')}>Usar equiposFiltradosAway</button>
    <button onClick={() => setSelectedTeam('home')}>Usar equiposFiltradosHome</button>
    <button onClick={handleToggleCheckboxes}>Toggle Todos</button>

    <form onSubmit={handleSubmit}>
      {jugadores.map((jugador, index) => (
        <div key={index}>
         
      <p>Jugador ;{jugadores[index].name} Id.- {jugadores[index].participants}  </p>
         
          <label>
            Goles:
            <input
              type="number"
              name="annotations"
              value={jugador.annotations}
              onChange={(e) => handleInputChange(e, index)}
            />
          </label>
          <label>
  Asistencias:
  <input
    type="checkbox"
    name="attendance"
    checked={jugador.attendance}
    onChange={(e) => handleInputChange(e, index)}
  />
</label>
        </div>
      ))}
      <button type="submit">Registrar Partido</button>
    </form>
    </>
  );
};

export default Pruebas;