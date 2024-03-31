import React, { useEffect, useState } from 'react';
import { TablageneralGlobalType } from '../../types/tablageneral';

import getGlobalTablaGeneral from '../Partidos/functions/getGlobalTablaGeneral';

const TablaGeneralHistorica: React.FC = () => {
  const [clasificacion, setClasificacion] = useState<TablageneralGlobalType[]>([]);

  useEffect(() => {
    // Llamada a la función getTournamentId para obtener el ID del torneo
   

    // Realizar una llamada a la función getRapidFootballStandings solo si se ha obtenido el ID del torneo
      getGlobalTablaGeneral()
        .then((equiposConInfo) => {
            console.log(equiposConInfo)
            equiposConInfo.sort((b, a) => a.porcentual - b.porcentual);
            const equiposMasDe10Partidos = equiposConInfo.filter(equipo => equipo.partidosJugados > 5);
//cambiar por generar botones dependiendo que quiera mostrar.
            setClasificacion(equiposMasDe10Partidos);
        })
        .catch((error) => {
          console.error('Error en la obtención de equipos con info:', error);
        });


  }, []); //
  return (
    <>
      <div>
     
      </div>
      <p>Tabla General</p>
      <table>
        <thead>
          <tr>
            <th>#</th>
            <th>IdEquipo</th>
            <th>Equipo</th>
            <th>Puntos</th>
            <th>GF</th>
            <th>GC</th>
            <th>DF</th>
            <th>PJ</th>
            <th>PG</th>
            <th>PP</th>
            <th>PGD</th>
            <th>PPD</th>
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
              <td>{equipo.goles}</td>
              <td>{equipo.golesRecibidos}</td>
              <td>{equipo.goles - equipo.golesRecibidos}</td>
              <td>{equipo.partidosJugados}</td>
              <td>{equipo.partidosGanados}</td>
              <td>{equipo.partidosPerdidos}</td>
              <td>{equipo.partidosGanadosDesempate}</td>
              <td>{equipo.partidosPerdidosDesempate}</td>
              <td>{equipo.porcentual}</td>

            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
};

export default TablaGeneralHistorica;