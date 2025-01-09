import React, { useEffect, useState } from 'react';
import getGlobalTablaGeneral from '../../../functions/getGlobalTablaGeneral';
import { TablageneralGlobalType } from '../../../types/tablageneral';



const TablaGeneralHistoricaByTournament: React.FC = () => {
 
  const [clasificacion, setClasificacion] = useState<TablageneralGlobalType[]>([]);


  useEffect(() => {
    // Llamada a la función getTournamentId para obtener el ID del torneo
   
    
  
    // Realizar una llamada a la función getRapidFootballStandings solo si se ha obtenido el ID del torneo
      getGlobalTablaGeneral()
        .then((equiposConInfo) => {
            equiposConInfo.sort((b, a) => a.porcentual - b.porcentual);
            const equiposMasDe10Partidos = equiposConInfo.filter(equipo => equipo.partidosJugados >= 5);
//cambiar por generar botones dependiendo que quiera mostrar.
            setClasificacion(equiposMasDe10Partidos);
        })
        .catch((error) => {
          console.error('Error en la obtención de equipos con info:', error);
        });


  }, []); //


  return (
    <>
    <p>Tabla de Efectividad Multitorneo, Impacto Under</p>
    <table>
      <thead>
        <tr>
          <th>#</th>
          <th>IdEquipo</th>
          <th>Equipo</th>
          <th>Puntos</th>
          <th>PJ</th>
          <th>Porcentual</th>

        </tr>
      </thead>
      <tbody>
        {clasificacion.map((equipo, index) => (
          <tr key={equipo.equipo}>
           <td>{index + 1}</td>

            <td>{equipo.equipoId}</td>
            <td>{equipo.equipo}</td>
            <td>{equipo.puntos}</td>
            <td>{equipo.partidosJugados}</td>
            <td>{equipo.porcentual}</td>

          </tr>
        ))}
      </tbody>
    </table>
  </>
  );
};

export default TablaGeneralHistoricaByTournament;