import { apiruta } from "../config/apiruta";
import { MatchType } from "../types/partidoType";
import { TablageneralType } from "../types/tablageneral";


async function getRapidFootballStandings(idTorneo: number): Promise<TablageneralType[]> {
    try {
      const responseMatches = await fetch(`${apiruta}/api/v1/matches`);
      if (!responseMatches.ok) {
        throw new Error('Error al obtener los datos de los partidos');
      }
      const dataMatches: MatchType[] = await responseMatches.json();
  
      const resultadosFiltrados = dataMatches.filter((item) => item.tournaments && item.tournaments.id === idTorneo);
  
      const puntosPorEquipo: { [equipo: string]: TablageneralType } = {};
  
      resultadosFiltrados.forEach((partido) => {
        const equipoLocal = partido.teamHome.name;
        const equipoVisitante = partido.teamAway.name;
        const equipoLocalId = partido.teamHome.id; // Nueva propiedad para el ID del equipo local
        const equipoVisitanteId = partido.teamAway.id; // Nueva propiedad para el ID del equipo visitante
        const equipoVisitanteEscudo = partido.teamAway.logo || `${apiruta}/default-logo.png`;; // Nueva propiedad para el ID del equipo visitante
        const localEscudo = partido.teamHome.logo || `${apiruta}/default-logo.png`; // Nueva propiedad para el ID del equipo visitante

        if (!puntosPorEquipo[equipoLocal]) {
          puntosPorEquipo[equipoLocal] = {logo:localEscudo, equipoId: equipoLocalId, equipo: equipoLocal, puntos: 0, goles: 0, golesRecibidos: 0, partidosJugados: 0, partidosGanados: 0, partidosGanadosDesempate: 0, partidosPerdidos: 0, partidosPerdidosDesempate: 0, partidosEmpatados: 0 };
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
          puntosPorEquipo[equipoVisitante] = {logo:equipoVisitanteEscudo, equipoId: equipoVisitanteId, equipo: equipoVisitante, puntos: 0, goles: 0, golesRecibidos: 0, partidosJugados: 0, partidosGanados: 0, partidosGanadosDesempate: 0, partidosPerdidos: 0, partidosPerdidosDesempate: 0, partidosEmpatados: 0 };
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

  
      const equiposConInfo: TablageneralType[] = Object.values(puntosPorEquipo);
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
  
      return equiposConInfo;
    } catch (error) {
      console.error('Error obteniendo los datos de los partidos:', error);
      throw error; // Propaga el error para que sea manejado por el código que llama a esta función
    }
  }

  export default getRapidFootballStandings