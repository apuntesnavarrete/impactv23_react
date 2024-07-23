import { useParams } from "react-router-dom";
import getTournamentId from "../../functions/getTournamentId";
import { useEffect, useState } from "react";
import { getPlayersStadisticsByIdTournament } from "../../functions/getPlayersStatisticsByIdTournament";
import GoleoImg from "./goleoimg";
import { EstadisticasJugadorType } from "../../types/EstadisticasJugadorType";
import { TypeGoleadorArray } from "../../types/goleadores";
import {  GetSumDataPlayerWithTeam } from "../../functions/getSumDataPlayerWithTeam";


function Goleobytournament(){
    const { torneo, liga} = useParams();
    const [datos, setDatos] = useState<TypeGoleadorArray[]>([]);
    const [nameTorneo, setNameTorneo] = useState< string | undefined>();

   
    useEffect(() => {
        const fetchData = async () => {
          try {
            const idTorneo = await getTournamentId(liga, torneo);
            if (idTorneo !== null) {
              // Obtener las estadísticas de los jugadores por torneo usando el ID del torneo
              const playersTournament : EstadisticasJugadorType[] = await getPlayersStadisticsByIdTournament(idTorneo);

          
              const goleadoresArray = GetSumDataPlayerWithTeam(playersTournament);


              setDatos(goleadoresArray)
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
  
      
      


    return(
<>

<p style={{ textAlign: 'center' }}> Liga {liga} Categoria {torneo}</p>

<h2>Tabla de Goleo .- Liga {liga} Categoria {torneo}</h2>



{datos && <GoleoImg order="goles" infoType="torneo" liga={liga} goleadores={datos} torneo={nameTorneo} tipoTorneo="Tabla de goleo" />}
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
            {datos.map((jugador, index) => (
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

export default Goleobytournament