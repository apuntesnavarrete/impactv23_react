import { useParams } from "react-router-dom";
import getTournamentId from "../../functions/getTournamentId";
import { useEffect, useState } from "react";
import { getPlayersStadisticsByIdTournament } from "../../functions/getPlayersStatisticsByIdTournament";
import GoleoImg from "./goleoimg";
import { EstadisticasJugadorType } from "../../types/EstadisticasJugadorType";
import { TypeGoleador, TypeGoleadorArray } from "../../types/goleadores";


function Goleo(){
    const { torneo, liga} = useParams();
    const [datos, setDatos] = useState<EstadisticasJugadorType[]>([]);
    const [nameTorneo, setNameTorneo] = useState< string | undefined>();

   
    useEffect(() => {
        const fetchData = async () => {
          try {
            const idTorneo = await getTournamentId(liga, torneo);
            if (idTorneo !== null) {
              // Obtener las estadísticas de los jugadores por torneo usando el ID del torneo
              const playersTournament : EstadisticasJugadorType[] = await getPlayersStadisticsByIdTournament(idTorneo);

              console.log(playersTournament[0].matches.tournaments.idName)
              console.log(playersTournament)
              setDatos(playersTournament)
              setNameTorneo(playersTournament[0].matches.tournaments.idName)
             

            } else {
              console.error('No se pudo obtener el ID del torneo.');
            }
          } catch (error) {
            console.error('Error fetching data:', error);
          }
        };
    
        fetchData();
      }, [liga, torneo]);
    
      const registrosGoleo: EstadisticasJugadorType[] = datos.filter(registro => registro.annotations > 0);

      const goleadores: { [key: string]: TypeGoleador } = registrosGoleo.reduce((acumulador, registro) => {
        const nombreJugador = registro.participants.name;
        const jugadorId = registro.participants.id;
        const equipo = registro.teams.name;
        const equipoLogo = registro.teams.logo;

        if (!acumulador[nombreJugador]) {
          acumulador[nombreJugador] = { id: jugadorId, goles: 0, equipo: equipo ,equipoLogo:equipoLogo};
        }
      
        acumulador[nombreJugador].goles += registro.annotations;
      
        return acumulador;
      }, {} as { [key: string]: TypeGoleador});
    
      const goleadoresArray: TypeGoleadorArray[] = Object.keys(goleadores).map(nombreJugador => ({
        nombre: nombreJugador,
        id: goleadores[nombreJugador].id,
        goles: goleadores[nombreJugador].goles,
        equipo: goleadores[nombreJugador].equipo,
        equipoLogo: goleadores[nombreJugador].equipoLogo
    }));
    
      goleadoresArray.sort((a, b) => b.goles - a.goles);
    


    return(
<>

<p style={{ textAlign: 'center' }}> Liga {liga} Categoria {torneo}</p>

<h2>Tabla de Goleo .- Liga {liga} Categoria {torneo}</h2>



{goleadoresArray && <GoleoImg liga={liga} goleadores={goleadoresArray} torneo={nameTorneo} />}
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