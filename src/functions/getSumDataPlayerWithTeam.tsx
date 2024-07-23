import { EstadisticasJugadorType } from "../types/EstadisticasJugadorType";
import { TypeGoleador, TypeGoleadorArray } from "../types/goleadores";


export function GetSumDataPlayerWithTeam(datos: EstadisticasJugadorType[]): TypeGoleadorArray[] {

  const goleadores: { [key: string]: TypeGoleador } = datos.reduce((acumulador, registro) => {
    const nombreJugador = registro.participants.name;
    const jugadorId = registro.participants.id;
    const equipo = registro.teams.name;
    const equipoLogo = registro.teams.logo;

    if (!acumulador[nombreJugador]) {
        acumulador[nombreJugador] = { id: jugadorId, goles: 0, asistencias: 0, equipo: equipo, equipoLogo: equipoLogo };
    }

    acumulador[nombreJugador].goles += registro.annotations;
      acumulador[nombreJugador].asistencias += Number(registro.attendance);

    return acumulador;
  }, {} as { [key: string]: TypeGoleador });


  const goleadoresArray: TypeGoleadorArray[] = Object.keys(goleadores).map(nombreJugador => ({
    nombre: nombreJugador,
    id: goleadores[nombreJugador].id,
    goles: goleadores[nombreJugador].goles,
    asistencias: goleadores[nombreJugador].asistencias,
    equipo: goleadores[nombreJugador].equipo,
    equipoLogo: goleadores[nombreJugador].equipoLogo
  }));



  goleadoresArray.sort((a, b) => b.goles - a.goles);

  return goleadoresArray;
}