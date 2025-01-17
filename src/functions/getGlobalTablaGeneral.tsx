import { apiruta } from "../config/apiruta";
import { MatchType } from "../types/partidoType";
import { TablageneralGlobalType } from "../types/tablageneral";

async function getGlobalTablaGeneral(dataMatches: MatchType[]): Promise<TablageneralGlobalType[]> {
    const puntosPorEquipo: { [equipo: string]: TablageneralGlobalType } = {};

    dataMatches.forEach((partido) => {
        const equipoLocal = partido.teamHome.name;
        const equipoVisitante = partido.teamAway.name;
        const equipoLocalId = partido.teamHome.id;
        const equipoVisitanteId = partido.teamAway.id;
        const equipoLocalEscudo = partido.teamHome.logo || `${apiruta}/default-logo.png`;
        const equipoVisitanteEscudo = partido.teamAway.logo || `${apiruta}/default-logo.png`;

        if (!puntosPorEquipo[equipoLocal]) {
            puntosPorEquipo[equipoLocal] = { equipoId: equipoLocalId, equipo: equipoLocal, logo: equipoLocalEscudo, puntos: 0, goles: 0, golesRecibidos: 0, partidosJugados: 0, partidosGanados: 0, partidosGanadosDesempate: 0, partidosPerdidos: 0, partidosPerdidosDesempate: 0, partidosEmpatados: 0, porcentual: 0 };
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
            puntosPorEquipo[equipoVisitante] = { equipoId: equipoVisitanteId, equipo: equipoVisitante, logo: equipoVisitanteEscudo, puntos: 0, goles: 0, golesRecibidos: 0, partidosJugados: 0, partidosGanados: 0, partidosGanadosDesempate: 0, partidosPerdidos: 0, partidosPerdidosDesempate: 0, partidosEmpatados: 0, porcentual: 0 };
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

    // Calcular el porcentaje de puntos obtenidos sobre partidos jugados
    Object.values(puntosPorEquipo).forEach((equipo) => {
        const porcentaje = (equipo.puntos / equipo.partidosJugados);
        equipo.porcentual = parseFloat(porcentaje.toFixed(2)); // Limitar a 2 decimales
    });

    const equiposConInfo: TablageneralGlobalType[] = Object.values(puntosPorEquipo);
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
}

export default getGlobalTablaGeneral;