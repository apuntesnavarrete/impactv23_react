import React, { useEffect, useRef, useState } from 'react';
import { useParams } from 'react-router-dom';
import { TablageneralType } from '../../types/tablageneral';
import getRapidFootballStandings from '../../functions/getRapidFootballStandings';
import getTournamentId from '../../functions/getTournamentId';
import { getTeamsTournaments } from '../../functions/getTeamsTournaments';
import TablaGeneralLayer from './tablageneralayer';
import ButtonCapture from '../../components/buttonCapture';

const TablaGeneral: React.FC = () => {
  const { liga, torneo } = useParams();
  const [idtorneo, setidtorneo] = useState<number | null>(null);
  const [clasificacion, setClasificacion] = useState<TablageneralType[]>([]);

  useEffect(() => {
    // Llamada a la función getTournamentId para obtener el ID del torneo
    getTournamentId(liga, torneo)
      .then((idtorneo) => {
        // Establecer el estado del ID del torneo
        setidtorneo(idtorneo);
        // Realizar una llamada a la función getRapidFootballStandings solo si se ha obtenido el ID del torneo
        if (idtorneo !== null) {
          getRapidFootballStandings(idtorneo)
            .then((equiposConInfo) => {
              getTeamsTournaments(idtorneo)
                .then((data)=>{
                  const equiposFiltrados = equiposConInfo.filter(equipo => data.some(item => item.teams?.id === equipo.equipoId));
                  setClasificacion(equiposFiltrados);
                })
              // Establecer el estado de la clasificación de equipos
              setClasificacion(equiposConInfo);
            })
            .catch((error) => {
              console.error('Error en la obtención de equipos con info:', error);
            });
        }
      });
  }, [liga, torneo, idtorneo]); //
  return (
    <>
      <div>
        <h2>Detalles del Torneo</h2>
        <p>Liga: {liga}</p>
        <p>Categoria: {torneo}</p>
        <p>idTorneo: {idtorneo}</p>
      </div>
      <p>Tabla General</p>

      <TablaGeneralLayer  clasificacion={clasificacion} liga={liga} torneo={torneo} typeTorneo="Tabla General"/>


      
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
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
};

export default TablaGeneral;







