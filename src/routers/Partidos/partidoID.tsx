
import React, { useState, ChangeEvent, FormEvent, useEffect } from 'react';
import getTeamIdsFromMatchId from '../../functions/getTeamIdsFromMatchId';
import getPlayersByTeamAndTournament from '../../functions/getPlayersByTeamAndTournament';
import { useParams } from 'react-router-dom';
import getTournamentId from '../../functions/getTournamentId';
import { SuccessMessage } from '../SuccesMessage';
import { apiruta } from '../../config/apiruta';
import JugadorForm from '../../components/jugadorForm';

interface JugadorData {
  annotations: number;
  attendance: boolean;
  matches: number,
  participants: number,
  teams: number,
  name: string
}

const PartidoID: React.FC = () => {
  const { idPartido , torneo, liga} = useParams();
  const numeroIdPartido = parseInt(idPartido ?? "0", 10);

  const token = localStorage.getItem('token');

  const [jugadores, setJugadores] = useState<JugadorData[]>([]);
  const [selectedTeam, setSelectedTeam] = useState('away');
  const [idTorneo, setIdTorneo] = useState<number | null>(null);
  const [showSuccess, setShowSuccess] = useState(false);


  getTournamentId(liga, torneo)
  .then((idTorneo: number | null) => {
    if (idTorneo !== null) {
      setIdTorneo(idTorneo);

    } else {
      console.error('No se pudo obtener el ID del torneo.');
    }
  });

  useEffect(() => {
    getTeamIdsFromMatchId(numeroIdPartido)
      .then((resultado) => {
        const teamAwayId = resultado?.teamAwayId || 0;
        const teamHomeId = resultado?.teamHomeId || 0;

        const promiseAway = getPlayersByTeamAndTournament(teamAwayId, idTorneo);
        const promiseHome = getPlayersByTeamAndTournament(teamHomeId, idTorneo);

        return Promise.all([promiseAway, promiseHome]);
      })
      .then(([equiposFiltradosAway, equiposFiltradosHome]) => {
       



        const selectedTeamData = selectedTeam === 'away' ? equiposFiltradosAway : equiposFiltradosHome;

        console.log('jugadores:' + selectedTeamData);


        const convertedArray = selectedTeamData.map(({ participants, teams }) => ({
          name: participants.name,
          participants: participants.id,
          teams: teams.id,
        }));
        


        const jugadoresjson = convertedArray.map((jugador,index) => ({
          name: convertedArray[index].name,

          annotations: 0,
          attendance: false,
          matches: numeroIdPartido,
          participants: convertedArray[index].participants,
          teams: convertedArray[index].teams, 
        }));
        //jugadores.sort((a, b) => a.participants. - b.participants.id);


        setJugadores(jugadoresjson); // Actualiza el estado con convertedArray

      })
      .catch((error) => {
        console.error('Error:', error);
      });
  }, [numeroIdPartido, selectedTeam, idTorneo]);

  
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

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const postData = jugadores.map(({ name, ...rest }) => rest);

    
    const filteredArray = postData.filter((jugador) => jugador.attendance);



    try {
      const response = await fetch(`${apiruta}/api/v1/PlayerStatistics`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,

          'Content-Type': 'application/json',
        },
        body: JSON.stringify(filteredArray),
      });

      if (response.ok) {
        console.log(response);
        setShowSuccess(true); // Mostrar el mensaje de éxito si la solicitud fue exitosa
        setTimeout(() => {
          setShowSuccess(false);
        }, 3000);

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
    {jugadores[0]?.teams}


    <form onSubmit={handleSubmit}>
      
      {jugadores.map((jugador, index) => (
        <JugadorForm
        key={index}
        jugador={jugador}
        index={index}
        handleInputChange={handleInputChange}
      />
      ))}
      <button type="submit">Registrar Partido</button>
    </form>


    {showSuccess && <SuccessMessage message="¡Creado con éxito!" />}

    </>
  );
};

export default PartidoID;



//antes 196 lineas