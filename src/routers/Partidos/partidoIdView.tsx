import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { EstadisticasJugadorType } from '../../types/EstadisticasJugadorType';
import { MatchType } from '../../types/partidoType';


function PartidoIdView(){
    const { idPartido} = useParams();
    const numeroIdPartido = parseInt(idPartido ?? "0", 10);
  
    const [jugadoresEquipoHome, setJugadoresEquipoHome] = useState<EstadisticasJugadorType[]>([]);
  const [jugadoresEquipoAway, setJugadoresEquipoAway] = useState<EstadisticasJugadorType[]>([]);
  const [partidoinfo, setpartidoinfo] = useState<MatchType>();


    console.log(numeroIdPartido)


    useEffect(() => {
        const fetchData = async () => {

               


          try {
            const response = await fetch('http://18.188.110.39:83/api/v1/PlayerStatistics');
            if (!response.ok) {
              throw new Error('Network response was not ok');
            }
    
            const data = await response.json();


           


            const filtrarPorIdTorneo = (partidos: any[], idPartido: number): any[] => {
                return partidos.filter((partido) => partido.matches.id === idPartido);
            };

    
            console.log('API Response:', data);

              // ID del torneo que deseas filtrar
              
              // Aplicar el filtro
              const partidosFiltrados = filtrarPorIdTorneo(data, numeroIdPartido);

              console.log('stadisticas filtrada', partidosFiltrados)


              const equiposHome = partidosFiltrados[0]?.matches.teamHome; // Se asume que todos los objetos en el array tienen la misma estructura
              const equiposAway = partidosFiltrados[0]?.matches.teamAway; // Se asume que todos los objetos en el array tienen la misma estructura
              
              // Imprimir en consola los valores
              console.log('Equipo Team Home:', equiposHome.id);
              console.log('Equipo Team Away:', equiposAway.id);

              const jugadoresEquipoHome = partidosFiltrados.filter(partido => partido.teams.id === equiposHome.id);
              const jugadoresEquipoAway = partidosFiltrados.filter(partido => partido.teams.id === equiposAway.id);

// Imprimir en consola los partidos filtrados
console.log('jugadores del equipo con ID', equiposHome.id, 'en teamHome:');
console.log(jugadoresEquipoHome)

console.log('jugadores del equipo con ID', equiposAway.id, 'en teamAway:');
console.log(jugadoresEquipoAway)

setJugadoresEquipoHome(jugadoresEquipoHome);
setJugadoresEquipoAway(jugadoresEquipoAway);


const infoPartido = await fetch(`http://18.188.110.39:83/api/v1/matches/${idPartido}`);
        
if (!infoPartido.ok) {
  throw new Error('Network response was not ok for segundaResponse');
}

const infoPartidoData = await infoPartido.json();
console.log(infoPartidoData)
setpartidoinfo(infoPartidoData[0])
          } catch (error) {
            console.error('Error fetching data:', error);
          }
        };
    


        
        fetchData();
      }, []);



    return(
        <>
                   
                    <p style={{ textAlign: 'center' }}> Marcador del partido ; {partidoinfo?.teamHome.name} {partidoinfo?.localgoals}-{partidoinfo?.visitangoals} {partidoinfo?.teamAway.name}</p>
     
        <div style={{ display: 'flex' }}>
        <table>

                <thead>
                    
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

            <table>
                <thead>
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
        </div>
        </>
    )
}

export default PartidoIdView