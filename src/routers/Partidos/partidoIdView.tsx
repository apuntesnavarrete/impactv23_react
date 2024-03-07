import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { EstadisticasJugadorType } from '../../types/EstadisticasJugadorType';
import { MatchType } from '../../types/partidoType';
import { getPlayersStadisticsByIdMatch } from './functions/getPlayersStatisticsByIdTournament';
import { apiruta } from '../../config/apiruta';
import './partidoResultImg.css'; // Importa el archivo de estilos
import useLigaInfo from '../../Use/useLigaInfo';


function PartidoIdView(){
    const { idPartido, liga, torneo} = useParams();
    const numeroIdPartido = parseInt(idPartido ?? "0", 10);
  
    const [jugadoresEquipoHome, setJugadoresEquipoHome] = useState<EstadisticasJugadorType[]>([]);
  const [jugadoresEquipoAway, setJugadoresEquipoAway] = useState<EstadisticasJugadorType[]>([]);
  const [partidoinfo, setpartidoinfo] = useState<MatchType>();
  const { claseCSS, logoLiga } = useLigaInfo(liga);


    console.log(numeroIdPartido)


    useEffect(() => {
        const fetchData = async () => {

               
         

            try {
                const partidosFiltrados = await getPlayersStadisticsByIdMatch(numeroIdPartido);

                const equiposHome = partidosFiltrados[0]?.matches.teamHome;
                const equiposAway = partidosFiltrados[0]?.matches.teamAway;

                console.log('Equipo Team Home:', equiposHome.id);
                console.log('Equipo Team Away:', equiposAway.id);

                const jugadoresEquipoHome = partidosFiltrados.filter(partido => partido.teams.id === equiposHome.id);
                const jugadoresEquipoAway = partidosFiltrados.filter(partido => partido.teams.id === equiposAway.id);

                console.log('jugadores del equipo con ID', equiposHome.id, 'en teamHome:');
                console.log(jugadoresEquipoHome);

                console.log('jugadores del equipo con ID', equiposAway.id, 'en teamAway:');
                console.log(jugadoresEquipoAway);

                setJugadoresEquipoHome(jugadoresEquipoHome);
                setJugadoresEquipoAway(jugadoresEquipoAway);

                const infoPartido = await fetch(`http://18.188.110.39:83/api/v1/matches/${idPartido}`);

                if (!infoPartido.ok) {
                    throw new Error('Network response was not ok for segundaResponse');
                }

                const infoPartidoData = await infoPartido.json();
                console.log(infoPartidoData);
                setpartidoinfo(infoPartidoData[0]);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };
    


        
        fetchData();
      }, [idPartido, numeroIdPartido]);



    return(
        <>
             <p style={{ textAlign: 'center' }}> Liga {liga} Categoria {torneo}</p>

                    <p style={{ textAlign: 'center' }}> Marcador del partido ; {partidoinfo?.teamHome.name} {partidoinfo?.localgoals}-{partidoinfo?.visitangoals} {partidoinfo?.teamAway.name}</p>
                    <p style={{ textAlign: 'center' }}> Toma de asistencia y Goles.</p>

        <div style={{ display: 'flex' }}>

        <table>
                <thead>
                <p style={{ textAlign: 'center' }}> Equipo {partidoinfo?.teamHome.name}</p>

                    <tr>
                        <th>ID</th>
                        <th>Nombre</th> 
                        <th>Anotaciones</th> 

                    </tr>
                </thead>
                <tbody>
                    {jugadoresEquipoHome.map((jugador, index) => (
                        <tr key={index}>
                            <td>{jugador.id}</td>
                            <td>{jugador.participants.name}</td> 
                            <td>{jugador.annotations}</td> {/* Agrega más propiedades según tus necesidades */}
                        </tr>
                    ))}
                </tbody>
            </table>

            {jugadoresEquipoAway.length === 0 ? (
    <p style={{ textAlign: 'center' }}>El equipo {partidoinfo?.teamAway.name} no presenta hoja de registros</p>
) : (
    <table>
        <thead>
        <p style={{ textAlign: 'center' }}> Equipo {partidoinfo?.teamAway.name}</p>

            <tr>
                <th>ID</th>
                <th>Nombre</th> 
                <th>Anotaciones</th> 
            </tr>
        </thead>
        <tbody>
            {jugadoresEquipoAway.map((jugador, index) => (
                <tr key={index}>
                    <td>{jugador.id}</td>
                    <td>{jugador.participants.name}</td> 
                    <td>{jugador.annotations}</td>
                </tr>
            ))}
        </tbody>
    </table>
)}
        </div>

        <div id="content_resul_players" className={`content_resul_players ${claseCSS}`}>
                <p className="fecha">{partidoinfo?.date}</p>
                <p className="Cat">{torneo}</p> 
                <p className="Jor">Jornada {partidoinfo?.matchday}</p>
                <div className="equipo_1">
                    <img className="equipos" src={`${apiruta}/public/teams/${partidoinfo?.teamHome.logo}`} alt="Foto del jugador" />
                </div>
                <p className="versus"></p>
                <div className="Equipo_2">
                <img className="equipos" src={`${apiruta}/public/teams/${partidoinfo?.teamAway.logo}`} alt="Foto del jugador" />
                </div>
                <p className="marcador">{partidoinfo?.localgoals} - {partidoinfo?.visitangoals}</p>
                <p className="Logo">
                    <img className="logo-img" src={`${apiruta}/public/teams/${logoLiga}`} alt="" />
                </p>
                <p className="liga">{liga}</p>
                <p className="titulo_2">Toma de Asistencia y Goles</p>

                <div className="Equipo_local">
    {jugadoresEquipoHome.map((jugador, index) => (
        <p key={index} className="jugadores_css">
            {jugador.participants.name}&#160;
            {jugador.annotations > 0 ? (
                <span className="span">{jugador.annotations}</span>
            ) : (
                <span className="span">&nbsp; </span> // Genera un espacio en blanco
            )}
        </p>
    ))}
</div>

            <div className="Equipo_visita">
                {jugadoresEquipoAway.map((jugador, index) => (
                  <p key={index} className="jugadores_css">

{jugador.annotations > 0 ? (
                      <span className="span">{jugador.annotations}</span>
                  ) : (
                      <span className="span"> &nbsp;</span> // Genera un espacio en blanco
                  )}

&#160; {jugador.participants.name}
                 
              </p>
                ))}
            </div>


            </div>

        </>
    )
}

export default PartidoIdView