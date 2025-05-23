import { EstadisticasJugadorType } from "../types/EstadisticasJugadorType";
import { TypeGoleador, TypeGoleadorArray } from "../types/goleadores";


export function GetSumDataPlayerWithTeam(datos: EstadisticasJugadorType[]): TypeGoleadorArray[] {

  const goleadores: { [key: string]: TypeGoleadorArray } = datos.reduce((acumulador, registro) => {
    const nombreJugador = registro.participants.name;
    const jugadorId = registro.participants.id;
    const equipo = registro.teams.name;
    const equipoLogo = registro.teams.logo;

    // Clave única por jugador y equipo
    const clave = `${jugadorId}-${equipo}`;

    if (!acumulador[clave]) {
      acumulador[clave] = {
        id: jugadorId,
        goles: 0,
        asistencias: 0,
        equipo: equipo,
        equipoLogo: equipoLogo,
        nombre: nombreJugador, // Necesario para el array final
      };
    }

    acumulador[clave].goles += registro.annotations;
    acumulador[clave].asistencias += Number(registro.attendance);

    return acumulador;
  }, {} as { [key: string]: TypeGoleador & { nombre: string } });

  const goleadoresArray: TypeGoleadorArray[] = Object.values(goleadores).map((jugador) => ({
    nombre: jugador.nombre,
    id: jugador.id,
    goles: jugador.goles,
    asistencias: jugador.asistencias,
    equipo: jugador.equipo,
    equipoLogo: jugador.equipoLogo
  }));

  goleadoresArray.sort((a, b) => b.goles - a.goles);

  return goleadoresArray;
}