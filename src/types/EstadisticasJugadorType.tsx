import { EquiposType } from "./equipostype";
import { Jugadorestype } from "./jugadores";
import { MatchType } from "./partidoType";

// Interfaz base
export interface EstadisticasJugadorBase {
  id: number;
  annotations: number;
  attendance: boolean;
  matches: MatchType;
}

// Interfaz extiende la interfaz base
export interface EstadisticasJugadorType extends EstadisticasJugadorBase {
  participants: Jugadorestype;
  teams: EquiposType;
}

// Nueva interfaz extiende la interfaz base y permite múltiples jugadores
export interface EstadisticasJugadorTypeNuevo extends EstadisticasJugadorBase {
  participants: {
    [playerId: string]: {
      id: number;
      name: string;
      birthDate: string;
      createdAt: string;
      annotations: number;
      attendance: boolean;
    };
  };
  teams: EquiposType;
}
