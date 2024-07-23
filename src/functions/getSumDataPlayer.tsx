// src/functions/procesarGoleadoresDetallado.ts
import { EstadisticasJugadorType } from "../types/EstadisticasJugadorType";
import { TypeGoleadorDetallado } from "../types/goleadores";
//import { TypeGoleadorDetallado } from "../types/goleadores";

export function getSumDataPlayer(datos: EstadisticasJugadorType[] , golmin: number): TypeGoleadorDetallado[] {
 
    const partidosJugados: { [key: string]: { id: number, count: number } } = {};

    datos.forEach(registro => {
      const { id, name } = registro.participants;

      if (!partidosJugados[name]) {
        partidosJugados[name] = { id, count: 0 };
      }

      partidosJugados[name].count++;
    });
 
    const totalGoles: { [key: string]: number } = datos.reduce(
    (acumulador, registro) => {
      const { name } = registro.participants;

      if (!acumulador[name]) {
        acumulador[name] = 0;
      }

      acumulador[name] += registro.annotations;

      return acumulador;
    },
    {} as { [key: string]: number }
  );

  const goleadoresArray: TypeGoleadorDetallado[] = Object.keys(totalGoles)
    .filter(nombreJugador => partidosJugados[nombreJugador] && partidosJugados[nombreJugador].count > golmin)
    .map((nombreJugador) => {
      const { id } = partidosJugados[nombreJugador];
      const goles = totalGoles[nombreJugador];
      const partidos = partidosJugados[nombreJugador].count || 0;
      const promedio = partidos > 0 ? goles / partidos : 0;

      return {
        id,
        nombre: nombreJugador,
        goles,
        partidos,
        promedio,
      };
    });

  return goleadoresArray;
}
