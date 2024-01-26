import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { TorneoType } from '../../types/torneotype';
import { MatchType } from '../../types/partidoType';

interface EquipoConInfo {
  equipoId: number;
  equipo: string;
  puntos: number;
  goles: number;
  golesRecibidos: number;
  partidosJugados: number;
  partidosGanados: number;
  partidosPerdidos: number;
  partidosEmpatados: number;
  partidosPerdidosDesempate: number; 
  partidosGanadosDesempate: number; 

}

const TablaGeneral: React.FC = () => {
  const { liga, torneo } = useParams();
  const [idtorneo, setidtorneo] = useState<number | null>(null);
  const [clasificacion, setClasificacion] = useState<EquipoConInfo[]>([]);

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

      try {
        const responseMatches = await fetch('http://18.188.110.39:83/api/v1/matches');
        if (!responseMatches.ok) {
          throw new Error('Error al obtener los datos de los partidos');
        }
        const dataMatches: MatchType[] = await responseMatches.json();

        const resultadosFiltrados = dataMatches.filter((item) => item.tournaments && item.tournaments.id === idtorneo);

        const puntosPorEquipo: { [equipo: string]: EquipoConInfo } = {};

        resultadosFiltrados.forEach((partido) => {
          const equipoLocal = partido.teamHome.name;
          const equipoVisitante = partido.teamAway.name;
          const equipoLocalId = partido.teamHome.id; // Nueva propiedad para el ID del equipo local
          const equipoVisitanteId = partido.teamAway.id; // Nueva propiedad para el ID del equipo visitante

          if (!puntosPorEquipo[equipoLocal]) {
            puntosPorEquipo[equipoLocal] = { equipoId: equipoLocalId, equipo: equipoLocal, puntos: 0, goles: 0, golesRecibidos: 0, partidosJugados: 0, partidosGanados: 0, partidosGanadosDesempate: 0, partidosPerdidos: 0, partidosPerdidosDesempate: 0, partidosEmpatados: 0 };
          }
          puntosPorEquipo[equipoLocal].puntos += partido.pointsLocal;
          puntosPorEquipo[equipoLocal].goles += partido.localgoals;
          puntosPorEquipo[equipoLocal].golesRecibidos += partido.visitangoals;
          puntosPorEquipo[equipoLocal].partidosJugados += 1;

           // Verifica si el equipo local ganó el partido (3 puntos)
           if (partido.pointsLocal === 3) {
            puntosPorEquipo[equipoLocal].partidosGanados += 1;
          } else if (partido.pointsLocal === 2) {
            puntosPorEquipo[equipoLocal].partidosGanadosDesempate += 1;
          } else if (partido.pointsLocal === 1) {
            puntosPorEquipo[equipoLocal].partidosPerdidosDesempate += 1;
          } else {
            puntosPorEquipo[equipoLocal].partidosPerdidos += 1;
          }


          if (!puntosPorEquipo[equipoVisitante]) {
            puntosPorEquipo[equipoVisitante] = { equipoId: equipoVisitanteId, equipo: equipoVisitante, puntos: 0, goles: 0, golesRecibidos: 0, partidosJugados: 0, partidosGanados: 0, partidosGanadosDesempate: 0, partidosPerdidos: 0, partidosPerdidosDesempate: 0, partidosEmpatados: 0 };
          }
          puntosPorEquipo[equipoVisitante].puntos += partido.pointsVisitan;
          puntosPorEquipo[equipoVisitante].goles += partido.visitangoals;
          puntosPorEquipo[equipoVisitante].golesRecibidos += partido.localgoals;
          puntosPorEquipo[equipoVisitante].partidosJugados += 1;

         // Verifica el resultado del partido visitante
    if (partido.pointsVisitan === 3) {
      puntosPorEquipo[equipoVisitante].partidosGanados += 1;
    } else if (partido.pointsVisitan === 2) {
      puntosPorEquipo[equipoVisitante].partidosGanadosDesempate += 1;
    } else if (partido.pointsVisitan === 1) {
      puntosPorEquipo[equipoVisitante].partidosPerdidosDesempate += 1;
    } else {
      puntosPorEquipo[equipoVisitante].partidosPerdidos += 1;
    }
        });

       


        const equiposConInfo: EquipoConInfo[] = Object.values(puntosPorEquipo);
        equiposConInfo.sort((a, b) => {
          // Ordenar por puntos de forma descendente
          if (b.puntos !== a.puntos) {
            return b.puntos - a.puntos;
          }
        
          // En caso de empate en puntos, ordenar por diferencia de goles (goles a favor - goles en contra)
          const diferenciaGolesA = a.goles - a.golesRecibidos;
          const diferenciaGolesB = b.goles - b.golesRecibidos;
        
          return diferenciaGolesB - diferenciaGolesA;
        });
        setClasificacion(equiposConInfo);
      } catch (error) {
        console.error('Error obteniendo los datos de los partidos:', error);
      }
    };

    fetchData();
  }, [liga, torneo, idtorneo]);

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
              <td>{ equipo.goles - equipo.golesRecibidos}</td>
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






