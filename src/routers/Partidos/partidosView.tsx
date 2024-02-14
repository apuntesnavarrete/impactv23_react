import { NavLink, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { TorneoType } from '../../types/torneotype';
import { MatchType } from '../../types/partidoType';



function PartidosView(){
    const { liga, torneo } = useParams();
    const [idtorneo, setidtorneo] = useState<number | null>(null);
    const [partidos, setpartidos] = useState<MatchType[]>([]);

    useEffect(() => {
        // Función para realizar la solicitud fetch
        const fetchData = async () => {
          try {
            // Realizar la solicitud fetch
            const response = await fetch('http://18.188.110.39:83/api/v1/tournaments');
         




            // Verificar si la respuesta es exitosa (código de estado 200)
            if (!response.ok) {
              throw new Error('Error al obtener los datos');
            }
    
            // Convertir la respuesta a formato JSON
            const data: TorneoType[] = await response.json();
            const resultadosFiltrados = data.filter(item => item.leagues && item.leagues.Alias === liga?.toUpperCase() && item.categories.categorias.toUpperCase() === torneo?.toUpperCase() );

         const RESULTIRDENADOS =  resultadosFiltrados.sort((b, a) => a.idName.localeCompare(b.idName));


    /*    const resultadosFiltrados = data.filter(item => 
          item.leagues && 
          item.leagues.Alias === (liga?.toUpperCase()) &&
          item.leagues. === torneo
        );  
      */  
        console.log(RESULTIRDENADOS)

            console.log()
            // Actualizar el estado con los datos obtenidos
            setidtorneo(RESULTIRDENADOS[0].id)
          } catch (error) {
            console.error('Error:');
          }

          try {
            const response = await fetch('http://18.188.110.39:83/api/v1/matches');
            const data: MatchType[] = await response.json();
            console.log("informacion de partidos")

            console.log(data)

            const resultadosFiltrados = data.filter(item => item.tournaments && item.tournaments.id === idtorneo );
            const RESULTIRDENADOS = resultadosFiltrados.sort((a, b) => b.matchday - a.matchday);

            console.log(RESULTIRDENADOS)

            setpartidos(RESULTIRDENADOS)
            if (!response.ok) {
                throw new Error('Error al obtener los datos');
              }
          } catch (error) {
            console.error('Error:');

          }

        };
    
        // Llamar a la función para realizar la solicitud fetch
        fetchData();
      }, [liga,torneo,idtorneo]); 



 

  

    return(

        <>
        <div>
      <h2>Detalles del Torneo</h2>
      <p>Liga: {liga}</p>
      <p>Categoria: {torneo}</p>
      <p>idTorneo: {idtorneo}</p>
      {/* El resto de tu lógica para mostrar detalles del torneo */}
      </div>
        <p>Tabla resultados</p>

        <table>
        <thead>
          <tr>
          <th>Jornada</th>

             <th>Id Partido</th>

            <th>Pts Local</th>
            <th>Equipo Local</th>
            <th>Goles Local</th>
            <th>Goles Visitante</th>
            <th>Equipo Visitante</th>
            <th>Puntos Visitante</th>
            <th>Fecha</th>
            <th>Agregar</th>
            <th>Ver</th>
            <th>Img</th>

            {/* Agrega más encabezados según la estructura de tus datos */}
          </tr>
        </thead>
        <tbody>
          {partidos.map((partidos) => (
            <tr key={partidos.id}>
                            <td>{partidos.matchday}</td>

              <td>{partidos.id}</td>

              <td>{partidos.pointsLocal}</td>
              <td>{partidos.teamHome.name}</td>
              <td>{partidos.localgoals}</td>
              <td>{partidos.visitangoals}</td>
              <td>{partidos.teamAway.name}</td>
              <td>{partidos.pointsVisitan}</td>
              <td>{partidos.date}</td>
              <td>  
              <NavLink to={`/${liga}/${torneo}/partidos/${partidos.id}`}>
              id {partidos.id} 
          </NavLink>
   </td>

   <td>  
              <NavLink to={`/${liga}/${torneo}/partidos/view/${partidos.id}`}>
              id {partidos.id} 
          </NavLink>
   </td>

   <td>  
              <NavLink to={`/${liga}/${torneo}/partidos/img/${partidos.id}`}>
              id {partidos.id} 
          </NavLink>
   </td>


              {/* Renderiza más celdas según la estructura de tus datos */}
            </tr>
          ))}
        </tbody>
      </table>
      </>
 )
    }   

export default PartidosView