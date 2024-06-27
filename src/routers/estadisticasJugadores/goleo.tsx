import { useParams } from "react-router-dom";
import getTournamentId from "../../functions/getTournamentId";
import { useEffect, useState } from "react";
import { getPlayersStadisticsByIdTournament } from "../../functions/getPlayersStatisticsByIdTournament";

interface Registro {
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
    };
  }

function Goleo(){
    const { torneo, liga} = useParams();
    const [datos, setDatos] = useState<Registro[]>([]);

   
    useEffect(() => {
        const fetchData = async () => {
          try {
            const idTorneo = await getTournamentId(liga, torneo);
            console.log(idTorneo)
            if (idTorneo !== null) {
              // Obtener las estadísticas de los jugadores por torneo usando el ID del torneo
              const playersTournament = await getPlayersStadisticsByIdTournament(idTorneo);
              console.log('Anotadores del torneo', playersTournament);


              setDatos(playersTournament)

             

            } else {
              console.error('No se pudo obtener el ID del torneo.');
            }
          } catch (error) {
            console.error('Error fetching data:', error);
          }
        };
    
        fetchData();
      }, [liga, torneo]);
    
      const registrosGoleo: Registro[] = datos.filter(registro => registro.annotations > 0);

      const goleadores: { [key: string]: { id: number; goles: number; equipo: string } } = registrosGoleo.reduce((acumulador, registro) => {
        const nombreJugador = registro.participants.name;
        const jugadorId = registro.participants.id;
        const equipo = registro.teams.name;
      
        if (!acumulador[nombreJugador]) {
          acumulador[nombreJugador] = { id: jugadorId, goles: 0, equipo: equipo };
        }
      
        acumulador[nombreJugador].goles += registro.annotations;
      
        return acumulador;
      }, {} as { [key: string]: { id: number; goles: number; equipo: string } });
    
      const goleadoresArray = Object.keys(goleadores).map(nombreJugador => ({
        nombre: nombreJugador,
        id: goleadores[nombreJugador].id,
        goles: goleadores[nombreJugador].goles,
        equipo: goleadores[nombreJugador].equipo
      }));
    
      goleadoresArray.sort((a, b) => b.goles - a.goles);
    


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
            </tr>
          </thead>
          <tbody>
            {goleadoresArray.map((jugador, index) => (
              <tr key={index}>
                      <td>{index + 1}</td>
                 <td>{jugador.id}</td>
                <td>{jugador.nombre}</td>
                <td>{jugador.equipo}</td>
                <td>{jugador.goles}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </>
    )
}

export default Goleo