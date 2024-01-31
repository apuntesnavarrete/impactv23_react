import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { TorneoType } from '../../types/torneotype';
import { TablageneralType } from '../../types/tablageneral';
import getRapidFootballStandings from '../Partidos/functions/getRapidFootballStandings';

const TablaGeneral: React.FC = () => {
  const { liga, torneo } = useParams();
  const [idtorneo, setidtorneo] = useState<number | null>(null);
  const [clasificacion, setClasificacion] = useState<TablageneralType[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const responseTorneos = await fetch('http://18.188.110.39:83/api/v1/tournaments');
        if (!responseTorneos.ok) {
          throw new Error('Error al obtener los datos de los torneos');
        }
        const dataTorneos: TorneoType[] = await responseTorneos.json();

        const resultadosFiltrados = dataTorneos.filter(
          (item) => item.leagues && item.leagues.Alias === liga?.toUpperCase() && item.categories.categorias === torneo
        );

        setidtorneo(resultadosFiltrados[0]?.id);
      } catch (error) {
        console.error('Error obteniendo los datos de los torneos:', error);
      }
    };

    fetchData();

    if (idtorneo !== null) {
      getRapidFootballStandings(idtorneo)
        .then((equiposConInfo) => {
          console.log('Equipos con Info:', equiposConInfo);
          setClasificacion(equiposConInfo);
        })
        .catch((error) => {
          console.error('Error en la obtención de equipos con info:', error);
        });
    }
  }, [liga, torneo, idtorneo]); // Agregué liga, torneo, e idtorneo como dependencias del useEffect

  return (
    <>
      <div>
        <h2>Detalles del Torneo</h2>
        <p>Liga: {liga}</p>
        <p>Categoria: {torneo}</p>
        <p>idTorneo: {idtorneo}</p>
      </div>
      <p>Tabla General</p>
      <table>
        <thead>
          <tr>
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
          {clasificacion.map((equipo) => (
            <tr key={equipo.equipo}>
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







