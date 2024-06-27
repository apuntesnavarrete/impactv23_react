import { useParams } from "react-router-dom";
import getTournamentId from "../../functions/getTournamentId";
import { useEffect, useState } from "react";
import { getPlayersStadisticsByIdTournament } from "../../functions/getPlayersStatisticsByIdTournament";
import getPlayersTournament from "../../functions/getPlayersByTournament";
import { Plantelestype } from "../../types/plantelestype";

interface Registro {
    [x: string]: any;
    id: number;
    annotations: number;
    matches: {
      id: number;
      date: string;
    };
    participants: {
      id: number;
      name: string;
    };
    teams: {
      name: string;
      id:number;
    };
  }

function Asistencia(){
    const { torneo, liga} = useParams();
    const [datos, setDatos] = useState<Registro[]>([]);
    const [plantelesJugadores, setplantelesJugadores] = useState<Plantelestype[]>([]);

   
    useEffect(() => {
        const fetchData = async () => {
          try {
            const idTorneo = await getTournamentId(liga, torneo);
            console.log(idTorneo)
            if (idTorneo !== null) {
              // Obtener las estadísticas de los jugadores por torneo usando el ID del torneo
              const playersTournament = await getPlayersStadisticsByIdTournament(idTorneo);
              const playersRosters = await getPlayersTournament(idTorneo);

              console.log(playersRosters)
              setDatos(playersTournament)
              setplantelesJugadores(playersRosters)
             

            } else {
              console.error('No se pudo obtener el ID del torneo.');
            }
          } catch (error) {
            console.error('Error fetching data:', error);
          }
        };
    
        fetchData();
      }, [liga, torneo]);
    
//      const registrosGoleo: Registro[] = datos.filter(registro => registro.annotations > 0);
const goleadores: { [key: string]: { id: number; goles: number; asistencias: number; equipo: string; equipoId: number } } = datos.reduce((acumulador, registro) => {
  const nombreJugador = registro.participants.name;
  const jugadorId = registro.participants.id;
  const equipo = registro.teams.name;
  const equipoId = registro.teams.id; // Aquí agregamos el ID del equipo

  // Sumar 1 al contador de asistencias si la asistencia es true
  const asistencias = registro.attendance ? 1 : 0;

  // Construir una clave única para cada jugador, basada en su ID y el ID del equipo
  const clave = `${jugadorId}-${equipo}`;

  // Verificar si ya existe un registro para este jugador y equipo en el acumulador
  if (!acumulador[clave]) {
      // Si no existe, crear un nuevo registro
      acumulador[clave] = { id: jugadorId, goles: 0, asistencias: 0, equipo: equipo, equipoId: equipoId }; // Agregamos equipoId aquí
  }

  // Incrementar el contador de goles y asistencias para este jugador y equipo
  acumulador[clave].goles += registro.annotations;
  acumulador[clave].asistencias += asistencias;

  return acumulador;
}, {} as { [key: string]: { id: number; goles: number; asistencias: number; equipo: string; equipoId: number } });

      const goleadoresArray = Object.keys(goleadores).map(nombreJugador => ({
        nombre: nombreJugador,
        id: goleadores[nombreJugador].id,
        goles: goleadores[nombreJugador].goles,
        asistencias: goleadores[nombreJugador].asistencias, // Agregar el campo de asistencias
       idequipo: goleadores[nombreJugador].equipoId,

        equipo: goleadores[nombreJugador].equipo
      }));

    let nuevoarray = [  {
        "id": 55,
        "dorsal": "22",
        "typeParticipant": "Jugador",
        "createdAt": "2024-02-01T04:54:41.326Z",
        "updatedAt": "2024-04-06T03:57:53.208Z",
        "tournaments": {
          "id": 1,
          "idName": "ED-LIBRE-24A",
          "description": "Prueba inical",
          "date_fundation": "14-0",
          "createdAt": "2024-01-14T08:23:35.499Z",
          "updatedAt": "2024-01-14T08:24:55.257Z"
        },
        "participants": {
          "id": 821,
          "name": "JosÃ© Miguel Orozco JimÃ©nez ",
          "birthDate": "",
          "Curp": "",
          "Photo": "821.jpg",
          "Email": null,
          "sex": null,
          "createdAt": "2024-01-13T01:44:32.642Z",
          "updatedAt": "2024-01-13T01:56:31.694Z"
        },
        "teams": {
          "id": 87,
          "name": "River_Lb",
          "logo": "riverplate.png",
          "Date": "0000-00-00",
          "createdAt": "2024-01-13T09:19:45.988Z",
          "updatedAt": "2024-01-13T09:24:57.610Z"
        }
      }]

      const infoParticipantes = plantelesJugadores.map(objeto => ({
        participanteId: objeto.participants.id,
        equipoId: objeto.teams.id,
        equipoNombre: objeto.teams.name

      }));
      

      
      console.log(infoParticipantes)
      goleadoresArray.sort((a, b) => b.id - a.id);
      console.log(goleadoresArray)


      const goleadoresFiltrados = goleadoresArray.filter(jugador => {
        return infoParticipantes.some(item => {
            return item.participanteId === jugador.id && item.equipoId === jugador.idequipo;
        });
    });
    

    goleadoresFiltrados.sort((a, b) => {
      if (b.idequipo === a.idequipo) {
          return a.id - b.id; // Ordenar por ID del jugador si los IDs del equipo son iguales
      }
      return b.idequipo - a.idequipo; // Ordenar por ID del equipo
  });    


    return(
<>

<p style={{ textAlign: 'center' }}> Liga {liga} Categoria {torneo}</p>

<h2>Tabla de Goleo .- Liga {liga} Categoria {torneo}</h2>


        <table>
          <thead>
            <tr>
            <th>#</th>

                <th>Id Jugador</th>

                  <th>Jugador</th>

              <th>Equipo</th>
              <th>Goles</th>
              <th>Asistencias</th>

            </tr>
          </thead>
          <tbody>
            {goleadoresFiltrados.map((jugador, index) => (
              <tr key={index}>
                      <td>{index + 1}</td>
                 <td>{jugador.id}</td>
                <td>{jugador.nombre}</td>
                <td>{jugador.equipo}</td>
                <td>{jugador.goles}</td>
                <td>{jugador.asistencias}</td>

              </tr>
            ))}
          </tbody>
        </table>
      </>
    )
}

export default Asistencia