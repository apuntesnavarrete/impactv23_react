import React, { useEffect, useState } from 'react';
import { TablageneralGlobalType } from '../../types/tablageneral';

import getGlobalTablaGeneral from '../../functions/getGlobalTablaGeneral';
import getGlobalTablaGeneralByMounth from '../../functions/getGlobalTablageneralBymounth';
import { apiruta } from '../../config/apiruta';
import { MatchType } from '../../types/partidoType';

const TablaGeneralHistorica: React.FC = () => {
  const [clasificacion, setClasificacion] = useState<TablageneralGlobalType[]>([]);
  const [selectedMonth, setSelectedMonth] = useState<number>(); // Estado para almacenar el mes seleccionado

  useEffect(() => {
    // Llamada a la función getTournamentId para obtener el ID del torneo
  
    const fetchMatches = async () => {
      const responseMatches = await fetch(`${apiruta}/api/v1/matches`);
      if (!responseMatches.ok) {
        throw new Error('Error al obtener los datos de los partidos');
      }
      const dataMatches: MatchType[] = await responseMatches.json();
  
      // Realizar una llamada a la función getRapidFootballStandings solo si se ha obtenido el ID del torneo
      getGlobalTablaGeneral(dataMatches)
        .then((equiposConInfo) => {
          equiposConInfo.sort((b, a) => a.porcentual - b.porcentual);
          const equiposMasDe10Partidos = equiposConInfo.filter(equipo => equipo.partidosJugados >= 5);
          // Por puntos
console.log("Por puntos:");
console.log([...equiposConInfo].sort((a, b) => b.puntos - a.puntos));

// Por porcentual
console.log("Por porcentual (solo con 20 o más partidos jugados):");
const filtradosPorPartidos = equiposConInfo.filter(e => e.partidosJugados >= 20);
const ordenadosPorPorcentual = filtradosPorPartidos.sort((a, b) => b.porcentual - a.porcentual);
console.log(ordenadosPorPorcentual);
// Por partidos ganados
console.log("Por partidos ganados:");
console.log([...equiposConInfo].sort((a, b) => b.partidosGanados - a.partidosGanados));

// Por partidos jugados
console.log("Por partidos jugados:");
console.log([...equiposConInfo].sort((a, b) => b.partidosJugados - a.partidosJugados));
          setClasificacion(equiposMasDe10Partidos);
        })
        .catch(error => console.error(error));
    };
  
    fetchMatches().catch(error => console.error(error));
  }, []);




  const handleMonthChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedMonth = parseInt(event.target.value);
    setSelectedMonth(selectedMonth);

    // Llamada a getGlobalTablaGeneralByMounth con el mes seleccionado
    getGlobalTablaGeneralByMounth(selectedMonth)
      .then((equiposConInfo2) => {
        equiposConInfo2.sort((b, a) => a.porcentual - b.porcentual);
        const equiposMasDe10Partidos = equiposConInfo2.filter(equipo => equipo.partidosJugados >= 3);
        setClasificacion(equiposMasDe10Partidos);
      });
  };

  return (
    <>
      <div>
      <select value={selectedMonth} onChange={handleMonthChange}>
          <option value={1}>Enero</option>
          <option value={2}>Febrero</option>
          <option value={3}>Marzo</option>
          <option value={4}>Abril</option>
          <option value={5}>Mayo</option>
          <option value={6}>Junio</option>
          <option value={7}>Julio</option>
          <option value={8}>Agosto</option>
          <option value={9}>Septiembre</option>
          <option value={10}>Octubre</option>
          <option value={11}>Noviembre</option>
          <option value={12}>Diciembre</option>
        </select>
      </div>
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

export default TablaGeneralHistorica;